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

  // 重複除去: 同じISBNまたは同じタイトル+著者の本を除去
  const uniqueBooks = books.filter((book, index, self) => {
    return index === self.findIndex(b => 
      (b.isbn && book.isbn && b.isbn === book.isbn) || 
      (b.title === book.title && b.author === book.author)
    );
  });

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
          {error && (
            <div className={`${error.isNoResults ? 'bg-blue-50 border border-blue-200' : 'bg-red-50 border border-red-200'} rounded-md p-4 mb-4`}>
              <div className="flex">
                <div className="flex-shrink-0">
                  {error.isNoResults ? (
                    <svg className="h-5 w-5 text-blue-400" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                    </svg>
                  ) : (
                    <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                    </svg>
                  )}
                </div>
                <div className="ml-3">
                  <h3 className={`text-sm font-medium ${error.isNoResults ? 'text-blue-800' : 'text-red-800'}`}>
                    {error.isNoResults ? '検索結果' : '検索エラー'}
                  </h3>
                  <div className={`mt-2 text-sm ${error.isNoResults ? 'text-blue-700' : 'text-red-700'}`}>
                    <p>{error.message}</p>
                  </div>
                </div>
              </div>
            </div>
          )}
          {!loading && !error && uniqueBooks.length === 0 && (
            <p className="text-sm text-gray-600 text-center mb-3">
              お探しの書籍が見つからない場合は、ISBN（13桁）での検索をお試しください。
            </p>
          )}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {uniqueBooks.map(book => (
              <div 
                key={`${book.id}_${book.isbn || book.title}`} 
                className="border p-2 rounded flex flex-col justify-between cursor-pointer hover:shadow-lg transition-shadow"
                onClick={() => handleSelect(book)}
              >
                <BookCard id={book.id} title={book.title} author={book.author} isbn={book.isbn} userCoverImage={book.userCoverImage} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookSearchModal;
