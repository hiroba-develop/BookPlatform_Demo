import { useState, useCallback } from 'react';
import axios from 'axios';
import type { Book } from '../types';

export type SearchType = 'keyword' | 'isbn';

type KeywordQuery = {
  title?: string;
  author?: string;
  publisher?: string;
};

// ISBN10をISBN13に変換する関数
const convertIsbn10To13 = (isbn10: string): string => {
  if (isbn10.length !== 10) return isbn10;
  const isbn = '978' + isbn10.slice(0, 9);
  let sum = 0;
  for (let i = 0; i < 12; i++) {
    const digit = parseInt(isbn[i]);
    sum += i % 2 === 0 ? digit : digit * 3;
  }
  const checkDigit = (10 - (sum % 10)) % 10;
  return isbn + checkDigit;
};


const useBookSearch = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const parseSruResponse = useCallback((
    xmlDoc: Document,
    searchType: SearchType,
    query: string | KeywordQuery
  ): Book[] => {
    const DC_NS = 'http://purl.org/dc/elements/1.1/';
    const DCTERMS_NS = 'http://purl.org/dc/terms/';
    const RDF_NS = 'http://www.w3.org/1999/02/22-rdf-syntax-ns#';
    const SRW_NS = 'http://www.loc.gov/zing/srw/';
		const SRW_DC_NS = 'info:srw/schema/1/dc-v1.1';

    const mapRecordToBook = (container: Element) => {
      const getNode = (ns: string, tag: string) => container.getElementsByTagNameNS(ns, tag)[0]?.textContent || '';
      
      const title = (getNode(DC_NS, 'title') || '').replace(/\s+/g, ' ').trim();
      const author = getNode(DC_NS, 'creator');
      const publisher = getNode(DC_NS, 'publisher');
      const pubDate = getNode(DCTERMS_NS, 'issued') || getNode(DC_NS, 'date');
      const description = getNode(DC_NS, 'description') || '概要なし';

      const extractIsbnFromContainer = (root: Element): string => {
        const typed = root.getElementsByTagNameNS(DCTERMS_NS, 'identifier');
        for (const id of Array.from(typed)) {
          const dtype = id.getAttributeNS(RDF_NS, 'datatype');
          if (dtype && dtype.includes('ISBN')) {
            const raw = (id.textContent || '').trim();
            if (raw) return raw;
          }
        }
        const dcIds = root.getElementsByTagNameNS(DC_NS, 'identifier');
        for (const id of Array.from(dcIds)) {
          const raw = (id.textContent || '').trim();
          if (!raw) continue;
          const found = raw.replace(/[\s\u3000]/g, '');
          const m13 = found.replace(/[\-‐‑‒–—―ー]/g, '').match(/97[89]\d{10}/);
          if (m13) return m13[0];
          const m10 = found.replace(/[\-‐‑‒–—―ー]/g, '').match(/\d{9}[\dXx]/);
          if (m10) return m10[0];
        }
        const descs = root.getElementsByTagNameNS(DC_NS, 'description');
        for (const d of Array.from(descs)) {
          const text = (d.textContent || '').replace(/[\-‐‑‒–—―ー]/g, '');
          const m13 = text.match(/97[89]\d{10}/);
          if (m13) return m13[0];
          const m10 = text.match(/\b\d{9}[\dXx]\b/);
          if (m10) return m10[0];
        }
        return '';
      };

      let isbn = extractIsbnFromContainer(container);
      let cleanIsbn = '';

      if (searchType === 'isbn' && typeof query === 'string') {
        cleanIsbn = (query || '').replace(/-/g, '');
      } else {
        cleanIsbn = (isbn || '').replace(/-/g, '');
      }
      
      if (cleanIsbn.length === 10) {
        cleanIsbn = convertIsbn10To13(cleanIsbn);
      }
      
      const imageUrl = cleanIsbn ? `https://ndlsearch.ndl.go.jp/thumbnail/${cleanIsbn}.jpg` : 'https://dummyimage.com/150x220/e0e0e0/aaa.png&text=No+Image';
      const link = '';
      const bookId = cleanIsbn || title;

      return { id: bookId, isbn: cleanIsbn, title, author, publisher, pubDate, imageUrl, description, link } as Book;
    };

    let records = Array.from(xmlDoc.getElementsByTagNameNS(SRW_NS, 'record'));
    if (records.length > 0) {
        return records.map(mapRecordToBook).filter(b => b.title);
    }
    
    // Fallback for srw_dc:dc containers
    let dcContainers = Array.from(xmlDoc.getElementsByTagNameNS(SRW_DC_NS, 'dc'));
    if (dcContainers.length > 0) {
        return dcContainers.map(mapRecordToBook).filter(b => b.title);
    }
    
    return [];
  }, []);

  const executeSearch = useCallback(async (
    cql: string, 
    searchType: SearchType, 
    originalQuery: string | KeywordQuery
  ): Promise<Book[]> => {
    const baseParams = {
      operation: 'searchRetrieve',
      version: '1.2',
      recordSchema: 'dcndl',
      onlyBib: 'true',
      recordPacking: 'xml',
      maximumRecords: 10, // 件数を減らして確実性を向上
    };
    
    const parser = new DOMParser();
    const SRW_NS = 'http://www.loc.gov/zing/srw/';
    const DIAG_NS = 'http://www.loc.gov/zing/srw/diagnostic/';

    const requestWithQuery = async (queryCql: string, schema: string = 'dcndl'): Promise<Document> => {
      // 環境判定をより確実に行う
      const isProduction = window.location.hostname.includes('github.io') || 
                          window.location.hostname.includes('netlify.app') ||
                          window.location.hostname.includes('vercel.app') ||
                          (window.location.hostname !== 'localhost' && window.location.hostname !== '127.0.0.1' && !window.location.hostname.includes('192.168.'));
      
      if (isProduction) {
        // 本番環境では複数のCORSプロキシを順次試行
        const targetUrl = 'https://ndlsearch.ndl.go.jp/api/sru';
        const corsProxies = [
          `https://cors-anywhere.herokuapp.com/${targetUrl}`,
          `https://thingproxy.freeboard.io/fetch/${targetUrl}`,
          `https://corsproxy.io/?${encodeURIComponent(targetUrl)}`,
          `https://api.allorigins.win/raw?url=${encodeURIComponent(targetUrl)}`,
          `https://cors.bridged.cc/?${encodeURIComponent(targetUrl)}`
        ];
        
        let lastError;
        for (const proxyUrl of corsProxies) {
          try {
            const requestParams = { ...baseParams, query: queryCql, recordSchema: schema };
            console.log('Trying proxy:', proxyUrl);
            console.log('Request params:', requestParams);
            
            const res = await axios.get(proxyUrl, { 
              params: requestParams, 
              responseType: 'text',
              timeout: 8000,
              headers: {
                'Accept': 'application/xml, text/xml, */*'
              },
              withCredentials: false
            });
            
            console.log('Success with proxy:', proxyUrl);
            console.log('Response status:', res.status);
            console.log('Response data length:', res.data.length);
            
            const xmlDoc = parser.parseFromString(res.data, 'text/xml');
            console.log('Parsed XML document:', xmlDoc);
            return xmlDoc;
          } catch (error) {
            console.log('Failed with proxy:', proxyUrl, error instanceof Error ? error.message : 'Unknown error');
            if (axios.isAxiosError(error)) {
              console.log('Axios error details:', {
                status: error.response?.status,
                statusText: error.response?.statusText,
                data: error.response?.data
              });
            }
            lastError = error;
            continue;
          }
        }
        
        if (lastError) {
          throw lastError;
        }
        
        // すべてのCORSプロキシが失敗した場合、直接APIを試行（CORSエラーが発生する可能性があるが、一部のブラウザでは動作する場合がある）
        console.log('All CORS proxies failed, trying direct API call...');
        try {
          const res = await axios.get(targetUrl, { 
            params: { ...baseParams, query: queryCql, recordSchema: schema }, 
            responseType: 'text',
            timeout: 10000,
            headers: {
              'Accept': 'application/xml, text/xml, */*'
            },
            withCredentials: false
          });
          console.log('Direct API call successful');
          return parser.parseFromString(res.data, 'text/xml');
        } catch (directError) {
          console.log('Direct API call also failed:', directError);
          throw new Error('All CORS proxies and direct API call failed');
        }
      } else {
        // 開発環境ではプロキシを使用
        const baseUrl = '/api/api/sru';
        const res = await axios.get(baseUrl, { 
          params: { ...baseParams, query: queryCql, recordSchema: schema }, 
          responseType: 'text' 
        });
        return parser.parseFromString(res.data, 'text/xml');
      }
    };
    
    const hasDiagnostics = (doc: Document) => doc.getElementsByTagNameNS(SRW_NS, 'diagnostics').length > 0;
    const countRecords = (doc: Document) => parseInt(doc.getElementsByTagNameNS(SRW_NS, 'numberOfRecords')[0]?.textContent || '0', 10);

    let xmlDoc = await requestWithQuery(cql);
    let lastQueryCql = cql;

    // Fallback logic for diagnostics or zero results
    if (hasDiagnostics(xmlDoc) || countRecords(xmlDoc) === 0) {
      const details = xmlDoc.getElementsByTagNameNS(DIAG_NS, 'details')[0]?.textContent;
      console.warn(`[SRU] Initial query failed or returned 0 results. Details: ${details || 'N/A'}. Starting fallbacks.`);

      const fallbacks = searchType === 'isbn' && typeof originalQuery === 'string'
        ? [
            `isbn="${originalQuery}"`,
            `title="${originalQuery}"`,
            `creator="${originalQuery}"`
          ]
        : typeof originalQuery === 'object' && originalQuery.title
        ? [
            `title="${originalQuery.title}"`,
            `creator="${originalQuery.author || ''}"`,
            `publisher="${originalQuery.publisher || ''}"`
          ]
        : [];
      
      for (const fallbackCql of fallbacks) {
        try {
          const candDoc = await requestWithQuery(fallbackCql);
          if (!hasDiagnostics(candDoc) && countRecords(candDoc) > 0) {
            xmlDoc = candDoc;
            lastQueryCql = fallbackCql;
            console.debug(`[SRU] Fallback successful with query: ${fallbackCql}`);
            break;
          }
        } catch (error) {
          console.debug(`[SRU] Fallback query failed: ${fallbackCql}`, error);
          continue;
        }
      }
    }
    
    // If we still have an error, return empty
    if (hasDiagnostics(xmlDoc)) {
      const details = xmlDoc.getElementsByTagNameNS(DIAG_NS, 'details')[0]?.textContent;
      console.error(`[SRU] All queries failed. Details: ${details || 'Unknown error'}`);
      setError(`検索に失敗しました。しばらく待ってから再試行してください。`);
      return [];
    }

    // If we finally got results, try to get the richer schema if we aren't already using it
    if (countRecords(xmlDoc) > 0 && xmlDoc.documentElement.getAttribute('recordSchema') !== 'dcndl') {
        try {
            const dcndlDoc = await requestWithQuery(lastQueryCql, 'dcndl');
            if (!hasDiagnostics(dcndlDoc) && countRecords(dcndlDoc) > 0) {
                xmlDoc = dcndlDoc;
            }
        } catch (_) { /* Skip if it fails */ }
    }

    return parseSruResponse(xmlDoc, searchType, originalQuery);

  }, [parseSruResponse]);

  const searchBooks = useCallback(async (query: string | KeywordQuery, searchType: SearchType = 'keyword') => {
    if (!query || (typeof query === 'object' && !query.title && !query.author && !query.publisher)) {
      setBooks([]);
      return;
    }

    setLoading(true);
    setError(null);
    setBooks([]);

    try {
      let finalBooks: Book[] = [];

      if (searchType === 'keyword' && typeof query === 'object') {
        const { title, author, publisher } = query;

        // より基本的な検索クエリを使用
        let cql = '';
        if (title) {
          // タイトルのみで検索（最も基本的な方法）
          cql = `title="${title}"`;
        } else if (author) {
          // 著者のみで検索
          cql = `creator="${author}"`;
        } else if (publisher) {
          // 出版社のみで検索
          cql = `publisher="${publisher}"`;
        } else {
          // フォールバック
          cql = `title="book"`;
        }
        
        console.log('Search query:', { title, author, publisher, cql });
        
        if (cql) {
          finalBooks = await executeSearch(cql, searchType, query);
        }

        // Enforce strict author filtering on client side
        if (author) {
          const normalize = (s: string) => (s || '').toLowerCase().replace(/[\s\u3000,，、・\[\](){}『』「」]/g, '');
          const tokens = author.split(/[\s\u3000,，、・]+/).filter(Boolean).map(normalize);
          finalBooks = finalBooks.filter(b => {
            const normAuthor = normalize(b.author);
            return tokens.every(t => normAuthor.includes(t));
          });
        }

      } else if (searchType === 'isbn' && typeof query === 'string') {
        const cql = `isbn="${query}"`;
        console.log('ISBN search query:', { query, cql });
        finalBooks = await executeSearch(cql, searchType, query);
      }

      const bookGroups = new Map<string, Book[]>();
      for (const book of finalBooks) {
        // Normalize title: take content before the first slash, trim whitespace.
        const normalizedTitle = (book.title || '').split('/')[0].trim();
        // Normalize author: remove all whitespace and common separators.
        const normalizedAuthor = (book.author || '').replace(/[\s,;著編訳]/g, '');

        const key = `${normalizedTitle}|${normalizedAuthor}`;
        if (!bookGroups.has(key)) {
          bookGroups.set(key, []);
        }
        bookGroups.get(key)!.push(book);
      }

      const uniqueBooks: Book[] = [];
      for (const group of bookGroups.values()) {
        // Prioritize the entry with an ISBN, otherwise take the first one.
        const bestBook = group.find(b => b.isbn) || group[0];
        uniqueBooks.push(bestBook);
      }
      
      if (uniqueBooks.length === 0) {
        setError('該当する書籍が見つかりませんでした。');
      }
      setBooks(uniqueBooks);

    } catch (err) {
      console.error('Search error:', err);
      if (axios.isAxiosError(err)) {
        console.error('Axios error details:', {
          status: err.response?.status,
          statusText: err.response?.statusText,
          data: err.response?.data
        });
        
        if (err.code === 'ERR_BLOCKED_BY_CLIENT' || err.message.includes('CORS')) {
          setError('検索サービスにアクセスできません。ブラウザの設定を確認するか、しばらく待ってから再試行してください。');
        } else if (err.response?.status === 404) {
          setError('検索サービスが見つかりません。しばらく待ってから再試行してください。');
        } else if (err.response?.status && err.response.status >= 500) {
          setError('検索サービスでエラーが発生しました。しばらく待ってから再試行してください。');
        } else {
          setError('書籍の検索中にエラーが発生しました。しばらく待ってから再試行してください。');
        }
      } else {
        setError('書籍の検索中にエラーが発生しました。しばらく待ってから再試行してください。');
      }
    } finally {
      setLoading(false);
    }
  }, [executeSearch]);

  return { books, loading, error, searchBooks };
};

export default useBookSearch;
