import React, { useState, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { mockUsers } from '../data/mockUsers';
import BookCard from '../components/BookCard';
import BookDetailModal from '../components/BookDetailModal';
import { UserBook } from '../types';
import UserProfileHeader from '../components/UserProfileHeader';

const UserProfile: React.FC = () => {
  const { userId } = useParams<{ userId: string }>();
  const user = mockUsers.find(u => u.id === userId);
  const [activeTabId, setActiveTabId] = useState<string | null>(null);
  const [selectedBook, setSelectedBook] = useState<UserBook | null>(null);

  const bookshelves = user?.bookshelves || [];

  const activeBookshelf = useMemo(() => {
    if (activeTabId) return bookshelves.find(shelf => shelf.id === activeTabId);
    if (bookshelves.length > 0) return bookshelves[0];
    return null;
  }, [activeTabId, bookshelves]);

  const handleBookClick = (book: UserBook) => {
    setSelectedBook(book);
  };

  if (!user) {
    return <div className="text-center p-8">ユーザーが見つかりませんでした。</div>;
  }

  return (
    <>
      <BookDetailModal 
        isOpen={!!selectedBook}
        onClose={() => setSelectedBook(null)}
        book={selectedBook}
      />
      <div className="container mx-auto bg-background min-h-screen">
        <UserProfileHeader user={user} />

        {bookshelves.length === 0 ? (
          <div className="text-center py-16 px-6 bg-white rounded-lg shadow">
              <h2 className="mt-4 text-2xl font-bold text-gray-800">このユーザーはまだ本棚を作成していません</h2>
              <p className="mt-2 text-md text-gray-500">他のユーザーを探してみましょう</p>
          </div>
        ) : (
          <>
              <div className="flex justify-between items-center mb-6">
                  <div className="flex items-center border-b border-gray-200">
                      {bookshelves.map(shelf => (
                          <button
                              key={shelf.id}
                              onClick={() => setActiveTabId(shelf.id)}
                              className={`px-4 py-2 text-sm font-medium flex items-center gap-2 ${activeBookshelf?.id === shelf.id ? 'border-b-2 border-primary text-primary' : 'text-text-secondary hover:text-main'}`}
                          >
                              {shelf.title}
                              <span className="bg-muted text-text-secondary text-xs font-semibold px-2 py-0.5 rounded-full">{(shelf.categories || []).reduce((acc, cat) => acc + cat.books.length, 0)}</span>
                          </button>
                      ))}
                  </div>
              </div>

              {activeBookshelf && (
                activeBookshelf.categories.length === 0 ? (
                    <div className="text-center py-20 bg-white rounded-lg shadow-inner border border-gray-100">
                        <h3 className="mt-2 text-lg font-bold text-gray-800">この本棚には本がありません</h3>
                    </div>
                ) : (
                  <div className="space-y-8">
                    {activeBookshelf.categories.map(category => (
                      <div key={category.id} className="bg-muted p-6 rounded-lg">
                        <h3 className="text-xl font-bold mb-4 pb-2 border-b">{category.name}</h3>
                        {category.books.length === 0 ? (
                          <p className="text-gray-500">このカテゴリには本がありません。</p>
                        ) : (
                          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
                            {category.books.map(book => (
                              <div key={book.id} className="relative group cursor-pointer" onClick={() => handleBookClick(book)}>
                                  <BookCard id={book.id} title={book.title} author={book.author} isbn={book.isbn} tags={book.userTags} />
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )
            )}
          </>
        )}

      {user.tsundoku && user.tsundoku.length > 0 && (
        <div className="mt-12">
          <div className="flex items-center mb-6">
            <h2 className="text-2xl font-bold">積読棚</h2>
            <span className="ml-2 px-3 py-1 text-sm font-semibold bg-muted text-text-secondary rounded-full">{user.tsundoku.length}冊</span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6 bg-muted p-6 rounded-lg">
            {user.tsundoku.map(book => (
              <div key={book.id} className="relative group cursor-pointer" onClick={() => handleBookClick(book)}>
                <BookCard id={book.id} title={book.title} author={book.author} isbn={book.isbn} tags={book.userTags} />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
    </>
  );
};

export default UserProfile;
