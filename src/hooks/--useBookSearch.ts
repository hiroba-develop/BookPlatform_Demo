import { useState, useCallback } from 'react';
import axios from 'axios';
import type { Book } from '../types';

export type SearchType = 'keyword' | 'isbn';

type KeywordQuery = {
  title?: string;
  author?: string;
  publisher?: string;
};

const useBookSearch = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const executeNdlSearch = useCallback(async (cql: string): Promise<Document> => {
    const params = {
      operation: 'searchRetrieve',
      version: '1.2',
      recordSchema: 'dcndl',
      recordPacking: 'xml',
      maximumRecords: 50, // Increase records to filter client-side
      query: cql,
    };
    const { data } = await axios.get('/api/api/sru', { params, responseType: 'text' });
    return new DOMParser().parseFromString(data, 'text/xml');
  }, []);

  const parseNdlResponse = useCallback((xmlDoc: Document): Book[] => {
    const records = Array.from(xmlDoc.getElementsByTagNameNS('http://www.loc.gov/zing/srw/', 'record'));
    
    const mapRecordToBook = (record: Element): Book | null => {
      const data = record.getElementsByTagName('recordData')[0];
      if (!data) return null;

      const dc = data.firstElementChild; // dcndl:dc
      if (!dc) return null;

      const getText = (ns: string, tag: string) => dc.getElementsByTagNameNS(ns, tag)[0]?.textContent || '';
      
      const title = getText('http://purl.org/dc/elements/1.1/', 'title');
      if (!title) return null;

      const isbnNodes = dc.getElementsByTagNameNS('http://purl.org/dc/terms/', 'identifier');
      let isbn = '';
      for (const node of Array.from(isbnNodes)) {
        if (node.getAttribute('rdf:datatype')?.includes('ISBN')) {
          isbn = node.textContent?.replace(/-/g, '') || '';
          break;
        }
      }
      
      return {
        id: isbn || title,
        isbn,
        title,
        author: getText('http://purl.org/dc/elements/1.1/', 'creator'),
        publisher: getText('http://purl.org/dc/elements/1.1/', 'publisher'),
        pubDate: getText('http://purl.org/dc/terms/', 'issued'),
        description: getText('http://purl.org/dc/elements/1.1/', 'description'),
        imageUrl: isbn ? `https://ndlsearch.ndl.go.jp/thumbnail/${isbn}.jpg` : undefined,
        link: '',
      };
    };

    return records.map(mapRecordToBook).filter((b): b is Book => b !== null);
  }, []);

  const searchBooks = useCallback(async (query: KeywordQuery | string, searchType: SearchType = 'keyword') => {
    setLoading(true);
    setError(null);
    setBooks([]);

    try {
      let finalBooks: Book[] = [];

      if (searchType === 'keyword' && typeof query === 'object') {
        const { title, author } = query;

        if (title) {
          const cleanedTitle = title.trim();
          let baseTitle = cleanedTitle;
          let volumeQuery: string | null = null;
          
          const titleMatch = cleanedTitle.match(/^(.*?)([\s\u3000]*)(\d+)$/);
          if (titleMatch && titleMatch[1]) {
              baseTitle = titleMatch[1].trim();
              volumeQuery = titleMatch[3];
          } else if (titleMatch && !titleMatch[1] && titleMatch[3]) {
              baseTitle = titleMatch[3];
              volumeQuery = null;
          }

          const searchTitle = baseTitle || title;
          const titleCql = `title any "${searchTitle}"`;
          let booksFromApiSearch = await executeNdlSearch(titleCql);

          const normalizeForFilter = (str: string) => str.toLowerCase().replace(/[\s\u3000]/g, '');
          const normalizedSearchTitle = normalizeForFilter(searchTitle);

          let filteredBooks = parseNdlResponse(booksFromApiSearch);
          
          if (volumeQuery) {
            filteredBooks = filteredBooks.filter(book => {
              if (!book.title) return false;
              const volumeRegex = new RegExp(`[\\s/,(第.]?${volumeQuery}(?!\\d)`);
              return volumeRegex.test(book.title);
            });
          }
          
          if (author) {
            const normalizedAuthorQuery = author.replace(/[\s,;著編訳\[\]]/g, '').toLowerCase();
            finalBooks = filteredBooks.filter(book => {
              if (!book.author) return false;
              const normalizedBookAuthor = book.author.replace(/[\s,;著編訳\[\]]/g, '').toLowerCase();
              return normalizedBookAuthor.includes(normalizedAuthorQuery);
            });
          } else {
            finalBooks = filteredBooks;
          }
        } else if (author) {
          const authorCql = `creator any "${author}"`;
          finalBooks = await executeNdlSearch(authorCql);
        }
      } else if (searchType === 'isbn' && typeof query === 'string') {
        const cql = `isbn="${query}"`;
        const xmlDoc = await executeNdlSearch(cql);
        finalBooks = parseNdlResponse(xmlDoc);
      }

      const uniqueBooks = Array.from(new Map(finalBooks.map(b => [b.title, b])).values());
      
      if (uniqueBooks.length === 0) {
        setError('該当する書籍が見つかりませんでした。');
      }
      setBooks(uniqueBooks);

    } catch (err) {
      console.error('Book search failed:', err);
      setError('検索中にエラーが発生しました。');
    } finally {
      setLoading(false);
    }
  }, [executeNdlSearch, parseNdlResponse]);

  return { books, loading, error, searchBooks };
};

export default useBookSearch;
