import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import type { Book } from '../types';

const useNewArrivals = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(1);

  const fetchNewArrivals = useCallback(async (pageNum: number, append: boolean) => {
    if (pageNum === 1 && !append) {
      setLoading(true);
    }
    setError(null);

    const itemsPerPage = 10;

    try {
      const response = await axios.get('/api/api/opensearch', {
        params: {
          cnt: itemsPerPage,
          page: pageNum,
          dpid: "iss-ndl-opac",
          sort: "issued_date.desc", // Sort by publication date descending
        },
      });

      const parser = new DOMParser();
      const xmlDoc = parser.parseFromString(response.data, 'text/xml');
      
      const parserError = xmlDoc.querySelector('parsererror');
      if (parserError) {
        throw new Error('XML parsing error');
      }

      const items = xmlDoc.getElementsByTagName('item');
      const channel = xmlDoc.querySelector('channel');
      const totalResultsText = channel?.querySelector('openSearch\\:totalResults')?.textContent || '0';
      const totalResults = parseInt(totalResultsText, 10);

      if (items.length === 0 && pageNum === 1) {
        setError("書籍が見つかりませんでした。");
        setBooks([]);
      }

      const foundBooks: Book[] = Array.from(items).map(item => {
        const title = item.getElementsByTagName('title')[0]?.textContent || 'タイトル不明';
        const author = item.getElementsByTagName('author')[0]?.textContent || '著者不明';
        const publisher = item.getElementsByTagName('dc:publisher')[0]?.textContent || '出版社不明';
        const pubDate = item.getElementsByTagName('pubDate')[0]?.textContent || '出版日不明';
        const link = item.getElementsByTagName('link')[0]?.textContent || '';
        const description = item.getElementsByTagName('description')[0]?.textContent || '概要なし';
        
        const identifiers = item.getElementsByTagName('dc:identifier');
        let isbn = '';
        for (let i = 0; i < identifiers.length; i++) {
          if (identifiers[i].getAttribute('xsi:type') === 'dcndl:ISBN') {
            isbn = identifiers[i].textContent || '';
            break;
          }
        }
        
        const imageUrl = isbn 
          ? `https://ndlsearch.ndl.go.jp/thumbnail/${isbn}.jpg` 
          : 'https://dummyimage.com/150x220/e0e0e0/aaa.png&text=No+Image';
        
        const guid = item.getElementsByTagName('guid')[0]?.textContent || '';
        let bookId = isbn;
        if (!bookId && guid.includes('/books/')) {
          bookId = guid.substring(guid.lastIndexOf('/') + 1);
        }

        return {
          id: bookId || guid,
          isbn: isbn,
          title,
          author,
          publisher,
          pubDate,
          imageUrl,
          description,
          link,
        };
      });

      setBooks(prevBooks => append ? [...prevBooks, ...foundBooks] : foundBooks);
      setPage(pageNum);
      setHasMore(totalResults > pageNum * itemsPerPage);

    } catch (err) {
      setError('新着書籍の取得中にエラーが発生しました。');
      console.error('Error fetching new arrivals:', err);
      if (pageNum === 1) {
        setBooks([]);
      }
    } finally {
      if (pageNum === 1) {
        setLoading(false);
      }
    }
  }, []);

  const loadMore = () => {
    if (!loading && hasMore) {
      fetchNewArrivals(page + 1, true);
    }
  };

  useEffect(() => {
    fetchNewArrivals(1, false);
  }, [fetchNewArrivals]);

  return { books, loading, error, hasMore, loadMore };
};

export default useNewArrivals;
