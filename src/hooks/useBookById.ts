import { useState, useEffect } from 'react';
import axios from 'axios';
import type { Book } from '../types';

const useBookById = (id: string | undefined) => {
  const [book, setBook] = useState<Book | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBook = async () => {
      let bookId = id;
      if (bookId && (bookId.startsWith('http') || bookId.startsWith('https:'))) {
        const decodedId = decodeURIComponent(bookId).replace(/^https:\//, 'https://');
        if (decodedId.includes('/books/')) {
          bookId = decodedId.substring(decodedId.lastIndexOf('/') + 1);
        }
      }

      if (!bookId) {
        setBook(null);
        return;
      }
      setLoading(true);
      setError(null);

      try {
        const params: { [key: string]: string | number } = {
          dpid: "iss-ndl-opac",
        };

        if (bookId.startsWith('R')) {
          params.bibid = bookId;
        } else {
          params.isbn = bookId;
        }

        const response = await axios.get('/api/api/opensearch', { params });

        const parser = new DOMParser();
        const xmlDoc = parser.parseFromString(response.data, "text/xml");
        const items = xmlDoc.getElementsByTagName('item');
        
        if (items.length > 0) {
          const item = items[0];
          const title = item.getElementsByTagName('title')[0]?.textContent || 'タイトル不明';
          const author = item.getElementsByTagName('author')[0]?.textContent || '著者不明';
          const publisher = item.getElementsByTagName('dc:publisher')[0]?.textContent || '出版社不明';
          const pubDate = item.getElementsByTagName('pubDate')[0]?.textContent || '出版日不明';
          const link = item.getElementsByTagName('link')[0]?.textContent || '';
          const description = item.getElementsByTagName('description')[0]?.textContent || '概要なし';
          
          const guid = item.getElementsByTagName('guid')[0]?.textContent || '';
          const identifiers = item.getElementsByTagName('dc:identifier');
          let isbn = '';
          for (let i = 0; i < identifiers.length; i++) {
            if (identifiers[i].getAttribute('xsi:type') === 'dcndl:ISBN') {
              isbn = identifiers[i].textContent || '';
              break;
            }
          }
          
          let imageUrl = 'https://dummyimage.com/300x450/e0e0e0/aaa.png&text=No+Image';
          const imgUrlNode = item.querySelector('seeAlso[type="image/jpeg"]');
          if (imgUrlNode) {
            imageUrl = imgUrlNode.textContent || imageUrl;
          } else if (isbn) {
            imageUrl = `https://ndlsearch.ndl.go.jp/thumbnail/${isbn}.jpg`;
          }

          const foundBook: Book = {
            id: isbn || bookId,
            isbn: isbn,
            title,
            author,
            publisher,
            pubDate,
            imageUrl,
            description,
            link,
          };
          setBook(foundBook);
        } else {
          setError('書籍が見つかりませんでした。');
        }
      } catch (err) {
        setError('書籍情報の取得中にエラーが発生しました。');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchBook();
  }, [id]);

  return { book, loading, error };
};

export default useBookById;
