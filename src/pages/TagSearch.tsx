import React, { useState, useMemo } from 'react';
import { useBookshelf } from '../contexts/BookshelfContext';
import { UserBook } from '../types';
import { Link } from 'react-router-dom';

interface SearchResult {
  book: UserBook;
  shelfId: string;
  categoryId: string;
  matchType: 'title' | 'author' | 'tag' | 'knowledge';
  snippet?: string;
}

const Highlight: React.FC<{ text: string; highlight: string }> = ({ text, highlight }) => {
  if (!highlight.trim()) {
    return <span>{text}</span>;
  }
  const regex = new RegExp(`(${highlight})`, 'gi');
  const parts = text.split(regex);

  return (
    <span>
      {parts.map((part, i) =>
        regex.test(part) ? (
          <mark key={i} className="bg-yellow-200">
            {part}
          </mark>
        ) : (
          <span key={i}>{part}</span>
        )
      )}
    </span>
  );
};

const TagSearch: React.FC = () => {
  const [query, setQuery] = useState('');
  const { bookshelves } = useBookshelf();
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) {
      setSearchResults([]);
      return;
    }

    const lowerCaseQuery = query.toLowerCase();
    const results: SearchResult[] = [];

    bookshelves.forEach(shelf => {
      shelf.categories.forEach(category => {
        category.books.forEach(book => {
          // Title match
          if (book.title.toLowerCase().includes(lowerCaseQuery)) {
            results.push({ book, shelfId: shelf.id, categoryId: category.id, matchType: 'title' });
          }
          // Author match
          if (book.author.toLowerCase().includes(lowerCaseQuery)) {
            results.push({ book, shelfId: shelf.id, categoryId: category.id, matchType: 'author' });
          }
          // Tag match
          if (book.userTags?.some(tag => tag.name.toLowerCase().includes(lowerCaseQuery))) {
            results.push({ book, shelfId: shelf.id, categoryId: category.id, matchType: 'tag' });
          }
          // Knowledge Tank match
          if (book.knowledgeTank?.toLowerCase().includes(lowerCaseQuery)) {
            const tank = book.knowledgeTank;
            const index = tank.toLowerCase().indexOf(lowerCaseQuery);
            const start = Math.max(0, index - 30);
            const end = Math.min(tank.length, index + lowerCaseQuery.length + 30);
            const snippet = `...${tank.substring(start, end)}...`;
            results.push({ book, shelfId: shelf.id, categoryId: category.id, matchType: 'knowledge', snippet });
          }
        });
      });
    });

    setSearchResults(results);
  };

  return (
    <div className="container mx-auto">
      <h1 className="text-3xl font-bold mb-2">
        タグ検索: <span className="text-accent">#{tag}</span>
      </h1>
      <div className="max-w-2xl mx-auto mb-8">
        <form onSubmit={handleSearch} className="relative">
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="タイトル, 著者, タグ, ナレッジ..."
            className="w-full p-4 pl-10 text-lg border-2 border-accent rounded-full focus:outline-none focus:border-sub-1"
          />
          <svg className="w-6 h-6 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
          <button type="submit" className="absolute right-2.5 top-1/2 transform -translate-y-1/2 bg-accent text-white font-bold py-2 px-6 rounded-full hover:bg-opacity-80">
            検索
          </button>
        </form>
      </div>

      <div>
        {searchResults.length > 0 ? (
          <div className="space-y-6">
            <p className="text-lg font-semibold">{searchResults.length}件の検索結果</p>
            {searchResults.map((result, index) => (
              <div key={`${result.book.id}-${index}`} className="bg-white p-6 rounded-lg shadow border border-gray-200">
                <Link to={`/book/${result.book.id}`} className="text-xl font-bold text-primary hover:underline">
                  <Highlight text={result.book.title} highlight={query} />
                </Link>
                <p className="text-md text-gray-700">
                  著者: <Highlight text={result.book.author} highlight={query} />
                </p>
                <div className="mt-2 text-sm text-gray-600">
                  {result.matchType === 'tag' && (
                    <p>
                      タグに一致: 
                      {result.book.userTags?.map(t => (
                        <span key={t.id} className="ml-2 inline-block bg-green-100 text-green-800 px-2 py-0.5 rounded-full">
                          <Highlight text={`#${t.name}`} highlight={query} />
                        </span>
                      ))}
                    </p>
                  )}
                  {result.matchType === 'knowledge' && result.snippet && (
                    <div className="bg-gray-50 p-3 mt-2 rounded">
                      <p className="font-semibold text-gray-800">ナレッジタンクに一致:</p>
                      <blockquote className="border-l-4 border-gray-300 pl-4 italic text-gray-600">
                        <Highlight text={result.snippet} highlight={query} />
                      </blockquote>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-500">{query ? '検索結果が見つかりませんでした。' : '検索を開始してください。'}</p>
        )}
      </div>
    </div>
  );
};

export default TagSearch;
