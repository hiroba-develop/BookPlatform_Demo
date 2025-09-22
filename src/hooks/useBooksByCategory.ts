import { useState, useEffect } from 'react';
import axios from 'axios';
import { googleBooksApi } from '../api/googleBooks';
import type { Book } from '../types';

const useBooksByCategory = (ndc: string | null) => {
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBooks = async () => {
      if (!ndc) {
        setBooks([]);
        return;
      }
      setLoading(true);
      setError(null);
      try {
        const response = await axios.get('/api/api/opensearch', {
          params: {
            ndc: ndc,
            cnt: 10, // 取得件数
            dpid: "iss-ndl-opac",
          },
        });

        const parser = new DOMParser();
        const xmlDoc = parser.parseFromString(response.data, "text/xml");
        const items = xmlDoc.getElementsByTagName('item');
        
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
          
          const imageUrl = isbn ? `https://ndlsearch.ndl.go.jp/thumbnail/${isbn}.jpg` : 'https://dummyimage.com/150x220/e0e0e0/aaa.png&text=No+Image';
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

        setBooks(foundBooks);
      } catch (err) {
        setError('書籍の検索中にエラーが発生しました。');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchBooks();
  }, [ndc]);

  return { books, loading, error };
};

export default useBooksByCategory;
