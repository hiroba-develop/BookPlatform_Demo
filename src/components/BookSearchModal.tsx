import React, { useState, useEffect } from 'react';
import type { Book } from '../types';
import useBookSearch, { type SearchType } from '../hooks/useBookSearch';
import BookCard from './BookCard';

interface BookSearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectBook: (book: Book) => void;
  initialQuery: string;
}

const BookSearchModal: React.FC<BookSearchModalProps> = ({ isOpen, onClose, onSelectBook, initialQuery }) => {
  const [searchType, setSearchType] = useState<SearchType>('keyword');
  const [titleQuery, setTitleQuery] = useState('');
  const [authorQuery, setAuthorQuery] = useState('');
  const [publisherQuery, setPublisherQuery] = useState('');
  const [isbnQuery, setIsbnQuery] = useState('');
  const { books, loading, error, searchBooks } = useBookSearch();

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      setTitleQuery(initialQuery);
      setAuthorQuery('');
      setPublisherQuery('');
      setIsbnQuery('');
      setSearchType('keyword');
      if (initialQuery.trim()) {
        searchBooks({ title: initialQuery.trim() }, 'keyword');
      }
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, initialQuery, searchBooks]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchType === 'keyword') {
      const keywordSearchQuery = {
        title: titleQuery.trim(),
        author: authorQuery.trim(),
        publisher: publisherQuery.trim(),
      };
      if (Object.values(keywordSearchQuery).some(val => val !== '')) {
        searchBooks(keywordSearchQuery, 'keyword');
      }
    } else if (searchType === 'isbn' && isbnQuery.trim()) {
      searchBooks(isbnQuery, 'isbn');
    }
  };

  const handleSelect = (book: Book) => {
    onSelectBook(book);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 z-[60] flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg shadow-2xl w-full max-w-3xl h-[90vh] flex flex-col">
        <div className="flex justify-between items-center mb-4 flex-shrink-0">
          <h2 className="text-xl font-bold">書籍を検索</h2>
          <button onClick={onClose} className="text-2xl text-gray-500 hover:text-gray-800">&times;</button>
        </div>
        
        <form onSubmit={handleSearch} className="flex flex-col gap-2 mb-4 flex-shrink-0">
          <div className="flex border-b">
            <button
              className={`px-4 py-2 text-sm ${searchType === 'keyword' ? 'border-b-2 border-primary text-primary font-semibold' : 'text-gray-500'}`}
              onClick={() => setSearchType('keyword')}
            >
              タイトル・著者名
            </button>
            <button
              className={`px-4 py-2 text-sm ${searchType === 'isbn' ? 'border-b-2 border-primary text-primary font-semibold' : 'text-gray-500'}`}
              onClick={() => setSearchType('isbn')}
            >
              ISBN
            </button>
          </div>

          <div className="pt-2">
            {searchType === 'keyword' ? (
              <div className='grid grid-cols-1 md:grid-cols-2 gap-2'>
                <input
                  type="text"
                  value={titleQuery}
                  onChange={(e) => setTitleQuery(e.target.value)}
                  placeholder="タイトル"
                  className="w-full p-2 border rounded"
                />
                <input
                  type="text"
                  value={authorQuery}
                  onChange={(e) => setAuthorQuery(e.target.value)}
                  placeholder="著者名"
                  className="w-full p-2 border rounded"
                />
                <input
                  type="text"
                  value={publisherQuery}
                  onChange={(e) => setPublisherQuery(e.target.value)}
                  placeholder="出版社"
                  className="w-full p-2 border rounded"
                />
                <div className="flex justify-end">
                  <button type="submit" className="bg-primary text-white px-6 py-2 rounded" disabled={loading}>
                    {loading ? '検索中...' : '検索'}
                  </button>
                </div>
                <div className="md:col-span-2">
                  <p className="text-xs text-gray-500">
                    お探しの書籍が見つからない場合は、ISBN（13桁）での検索をお試しください。
                  </p>
                </div>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <input type="text" value={isbnQuery} onChange={(e) => setIsbnQuery(e.target.value)} placeholder="ISBN（ハイフンなし）を入力..." className="flex-grow p-2 border rounded" />
                <button type="submit" className="bg-primary text-white px-6 py-2 rounded flex-shrink-0" disabled={loading}>
                  {loading ? '検索中...' : '検索'}
                </button>
              </div>
            )}
          </div>
        </form>

        <div className="overflow-y-auto flex-grow">
          {error && <p className="text-red-500">{error}</p>}
          {!loading && !error && books.length === 0 && (
            <p className="text-sm text-gray-600 text-center mb-3">
              お探しの書籍が見つからない場合は、ISBN（13桁）での検索をお試しください。
            </p>
          )}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {books.map(book => (
              <div 
                key={book.id} 
                className="border p-2 rounded flex flex-col justify-between cursor-pointer hover:shadow-lg transition-shadow"
                onClick={() => handleSelect(book)}
              >
                <BookCard id={book.id} title={book.title} author={book.author} isbn={book.isbn} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookSearchModal;
