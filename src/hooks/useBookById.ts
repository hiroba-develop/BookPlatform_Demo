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

        // 環境判定をより確実に行う
        const isProduction = window.location.hostname.includes('github.io') || 
                            window.location.hostname.includes('netlify.app') ||
                            window.location.hostname.includes('vercel.app') ||
                            (window.location.hostname !== 'localhost' && window.location.hostname !== '127.0.0.1' && !window.location.hostname.includes('192.168.'));
        
        let baseUrl;
        if (isProduction) {
          // 本番環境では確実に動作するCORSプロキシを使用
          const targetUrl = 'https://ndlsearch.ndl.go.jp/api/opensearch';
          baseUrl = `https://api.allorigins.win/raw?url=${encodeURIComponent(targetUrl)}`;
        } else {
          // 開発環境ではプロキシを使用
          baseUrl = '/api/api/opensearch';
        }
        
        const response = await axios.get(baseUrl, { 
          params,
          timeout: 10000,
          headers: {
            'Accept': 'application/xml, text/xml, */*',
            'User-Agent': 'BookPlatform/1.0'
          },
          withCredentials: false // CORS問題を回避
        });

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
          
          // const guid = item.getElementsByTagName('guid')[0]?.textContent || '';
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
