import React, { useState, useEffect } from 'react';
import { useUsers } from '../hooks/useUsers';
import { UserBook, Bookshelf } from '../types';
import { Link } from 'react-router-dom';
import { MockUser } from '../data/mockUsers';
import { useAuth } from '../contexts/AuthContext';
import { useBookshelf } from '../contexts/BookshelfContext';

interface Match {
  type: 'title' | 'author' | 'tag' | 'summary' | 'knowledge' | 'knowledgeTag';
  snippet?: string;
}

interface SearchResult {
  book: UserBook;
  user: MockUser;
  shelfId: string;
  categoryId: string;
  matches: Match[];
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

const Search: React.FC = () => {
  const { users: otherUsers } = useUsers();
  const { user: currentUser } = useAuth();
  const { bookshelves: myBookshelves, tsundokuBooks: myTsundokuBooks } = useBookshelf();
  
  const [query, setQuery] = useState('');
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);

  useEffect(() => {
    const search = () => {
      if (!query.trim()) {
        setSearchResults([]);
        return;
      }
      
      const lowerCaseQuery = query.toLowerCase();
      const resultsMap = new Map<string, SearchResult>();

      const findMatches = (book: UserBook) => {
        const matches: Match[] = [];
        if (book.title.toLowerCase().includes(lowerCaseQuery)) { matches.push({ type: 'title' }); }
        if (book.author.toLowerCase().includes(lowerCaseQuery)) { matches.push({ type: 'author' }); }
        if (book.userSummary && book.userSummary.toLowerCase().includes(lowerCaseQuery)) { matches.push({ type: 'summary', snippet: createSnippet(book.userSummary, query) }); }
        if (book.userTags?.some(tag => tag.name.toLowerCase().includes(lowerCaseQuery))) { matches.push({ type: 'tag' }); }
        if (book.knowledgeTank && book.knowledgeTank.toLowerCase().includes(lowerCaseQuery)) { matches.push({ type: 'knowledge', snippet: createSnippet(book.knowledgeTank, query) }); }
        if (book.knowledgeTankTags?.some(tag => tag.name.toLowerCase().includes(lowerCaseQuery))) { matches.push({ type: 'knowledgeTag' }); }
        return matches;
      };
      
      // 他のユーザーの本を検索
      otherUsers.forEach(user => {
        user.bookshelves.forEach(shelf => {
          shelf.categories.forEach(category => {
            category.books.forEach(book => {
              const matches = findMatches(book);
              if (matches.length > 0) {
                resultsMap.set(book.id, { book, user, shelfId: shelf.id, categoryId: category.id, matches });
              }
            });
          });
        });
        if (user.tsundoku) {
          user.tsundoku.forEach(book => {
            if (resultsMap.has(book.id)) return;
            const matches = findMatches(book);
            if (matches.length > 0) {
              resultsMap.set(book.id, { book, user, shelfId: 'tsundoku', categoryId: 'tsundoku', matches });
            }
          });
        }
      });

      // ログインユーザーの本を検索
      if (currentUser) {
        const meAsUser: MockUser = {
          id: currentUser.id,
          name: currentUser.name,
          avatarUrl: 'https://dummyimage.com/100x100/e0e0e0/aaa.png&text=Me',
          bio: '',
          stats: { posts: 0, followers: 0, following: 0, likes: 0 },
          bookshelves: myBookshelves,
          tsundoku: myTsundokuBooks
        };

        myBookshelves.forEach(shelf => {
          shelf.categories.forEach(category => {
            category.books.forEach(book => {
              if (resultsMap.has(book.id)) return;
              const matches = findMatches(book);
              if (matches.length > 0) {
                resultsMap.set(book.id, { book, user: meAsUser, shelfId: shelf.id, categoryId: category.id, matches });
              }
            });
          });
        });

        myTsundokuBooks.forEach(book => {
          if (resultsMap.has(book.id)) return;
          const matches = findMatches(book);
          if (matches.length > 0) {
            resultsMap.set(book.id, { book, user: meAsUser, shelfId: 'tsundoku', categoryId: 'tsundoku', matches });
          }
        });
      }

      setSearchResults(Array.from(resultsMap.values()));
    };
    
    const handler = setTimeout(() => {
      search();
    }, 300);

    return () => {
      clearTimeout(handler);
    };
  }, [query, otherUsers, currentUser, myBookshelves, myTsundokuBooks]);

  const createSnippet = (text: string, query: string) => {
    const lowerCaseText = text.toLowerCase();
    const lowerCaseQuery = query.toLowerCase();
    const index = lowerCaseText.indexOf(lowerCaseQuery);
    if (index === -1) return '';
    const start = Math.max(0, index - 30);
    const end = Math.min(text.length, index + query.length + 30);
    return `...${text.substring(start, end)}...`;
  }

  return (
    <div className="container mx-auto">
      <h1 className="text-3xl font-bold mb-6">書籍検索</h1>
      
      <div className="relative mb-6 max-w-xl mx-auto">
        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="タイトル, 著者, タグ, ナレッジ..."
          className="w-full p-3 pl-10 text-md border-2 border-gray-300 rounded-full focus:outline-none focus:border-primary"
          autoFocus
        />
        <svg className="w-6 h-6 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
      </div>

      <div className="max-w-2xl mx-auto">
        {searchResults.length > 0 ? (
          <div className="space-y-4">
            <p className="text-md font-semibold">{searchResults.length}件の検索結果</p>
            {searchResults.map((result, index) => (
              <div key={`${result.book.id}-${index}`} className="bg-gray-50 p-4 rounded-md">
                <div className="flex justify-between items-start">
                  <div>
                      <Link to={`/users/${result.user.id}`} className="text-lg font-bold text-primary hover:underline">
                          <Highlight text={result.book.title} highlight={query} />
                      </Link>
                      <p className="text-sm text-gray-600">
                          著者: <Highlight text={result.book.author} highlight={query} />
                      </p>
                  </div>
                  <Link to={`/users/${result.user.id}`} className="flex items-center space-x-2 flex-shrink-0 ml-4">
                      <img src={result.user.avatarUrl} alt={result.user.name} className="w-8 h-8 rounded-full" />
                      <span className="text-sm font-medium text-gray-700">{result.user.name}</span>
                  </Link>
                </div>

                <div className="mt-2 text-xs text-gray-500 space-y-2">
                  {result.matches.map((match, matchIndex) => (
                    <div key={matchIndex}>
                      {match.type === 'tag' && (
                        <p>
                          タグに一致: 
                          {result.book.userTags?.filter(t => t.name.toLowerCase().includes(query.toLowerCase())).map(t => (
                            <span key={t.id} className="ml-1 inline-block bg-green-100 text-green-800 px-2 py-0.5 rounded-full">
                              <Highlight text={`#${t.name}`} highlight={query} />
                            </span>
                          ))}
                        </p>
                      )}
                      {match.type === 'knowledgeTag' && (
                        <p>
                          ナレッジタグに一致: 
                          {result.book.knowledgeTankTags?.filter(t => t.name.toLowerCase().includes(query.toLowerCase())).map(t => (
                            <span key={t.id} className="ml-1 inline-block bg-blue-100 text-blue-800 px-2 py-0.5 rounded-full">
                              <Highlight text={`#${t.name}`} highlight={query} />
                            </span>
                          ))}
                        </p>
                      )}
                      {(match.type === 'summary' || match.type === 'knowledge') && match.snippet && (
                        <div className="bg-gray-100 p-2 mt-1 rounded">
                          <p className="font-semibold text-gray-700">
                            {match.type === 'summary' ? 'サマリーに一致:' : 'ナレッジタンクに一致:'}
                          </p>
                          <blockquote className="border-l-4 border-gray-300 pl-2 italic text-gray-600 text-xs">
                            <Highlight text={match.snippet} highlight={query} />
                          </blockquote>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-500 pt-10">{query ? '検索結果が見つかりませんでした。' : '検索を開始してください。'}</p>
        )}
      </div>
    </div>
  );
};

export default Search;
