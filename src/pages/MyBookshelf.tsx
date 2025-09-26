import React, { useState, useMemo, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import BookCard from '../components/BookCard';
import { useBookshelf } from '../contexts/BookshelfContext';
import type { Tag, UserBook, Bookshelf } from '../types';
import AddBookModal from '../components/AddBookModal';
import CreateBookshelfModal from '../components/CreateBookshelfModal';
import EditBookModal from '../components/EditBookModal';
import BookshelfSearchModal from '../components/BookshelfSearchModal';
import { BookOpenIcon, PlusIcon, MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import UserProfileHeader from '../components/UserProfileHeader';
import { useAuth } from '../contexts/AuthContext';
import { mockUsers } from '../data/mockUsers';

const MyBookshelf: React.FC = () => {
  const [isAddBookModalOpen, setIsAddBookModalOpen] = useState(false);
  const [isBookshelfModalOpen, setIsBookshelfModalOpen] = useState(false);
  const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);
  const [shelfToEdit, setShelfToEdit] = useState<Bookshelf | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [bookToEdit, setBookToEdit] = useState<UserBook | null>(null);
  const [selectedBookshelfId, setSelectedBookshelfId] = useState<string | null>(null);
  const [selectedCategoryId, setSelectedCategoryId] = useState<string | null>(null);
  const [isTsundokuPublic, ] = useState(true); // TODO: This should be connected to user profile settings
  const { 
    bookshelves, addBookshelf, updateBookshelf, 
    addBookToCategory, removeBookFromCategory, updateBookInCategory,
    tsundokuBooks, addTsundokuBook, removeTsundokuBook, updateTsundokuBook 
  } = useBookshelf();
  
  const [activeTabId, setActiveTabId] = useState<string | null>(null);
  const { user: authUser } = useAuth();
  const location = useLocation();
  const currentUser = useMemo(() => mockUsers.find(u => u.id === authUser?.id), [authUser]);

  useEffect(() => {
    const hash = location.hash.substring(1);
    if (hash) {
      const params = new URLSearchParams(hash);
      const bookId = params.get('bookId');
      const shelfId = params.get('shelfId');
      const categoryId = params.get('categoryId');

      if (bookId && shelfId && categoryId && currentUser) {
        const shelf = bookshelves.find(s => s.id === shelfId);
        if (shelf) {
          const category = shelf.categories.find(c => c.id === categoryId);
          if (category) {
            const book = category.books.find(b => b.id === bookId);
            if (book) {
              setActiveTabId(shelfId);
              handleEditBook(book, shelfId, categoryId);
              // Clear the hash to prevent re-triggering
              window.history.replaceState(null, '', ' ');
            }
          }
        }
      }
    }
  }, [location.hash, currentUser, bookshelves]);

  const activeBookshelf = useMemo(() => {
    if (activeTabId) return bookshelves.find(shelf => shelf.id === activeTabId);
    if (bookshelves.length > 0) return bookshelves[0];
    return null;
  }, [activeTabId, bookshelves]);

  const handleOpenAddBookModal = (bookshelfId: string) => {
    setSelectedBookshelfId(bookshelfId);
    setIsAddBookModalOpen(true);
  }

  const handleEditBook = (book: UserBook, bookshelfId?: string, categoryId?: string) => {
    setBookToEdit(book);
    setSelectedBookshelfId(bookshelfId ?? null);
    setSelectedCategoryId(categoryId ?? null);
    setIsEditModalOpen(true);
  };

  const handleDeleteBook = (bookId: string, shelfId?: string, categoryId?: string) => {
    if (window.confirm('本当にこの本を削除してもよろしいですか？')) {
      if (shelfId && categoryId) {
        removeBookFromCategory(shelfId, categoryId, bookId);
      } else {
        removeTsundokuBook(bookId);
      }
    }
  };

  const handleSaveBook = (book: UserBook, shelfId?: string, categoryId?: string) => {
    if (book.status === '積読') {
      addTsundokuBook(book);
    } else if (shelfId && categoryId) {
      const shelf = bookshelves.find(s => s.id === shelfId);
      if (shelf) {
        const category = shelf.categories.find(c => c.id === categoryId);
        if (category && category.books.some(b => b.id === book.id)) {
          updateBookInCategory(shelfId, categoryId, book);
        } else {
          addBookToCategory(shelfId, categoryId, book);
        }
      }
    }
  };

  const handleUpdateBook = (book: UserBook, newBookshelfId?: string, newCategoryId?: string) => {
    const isTsundokuNow = book.status === '積読';
    const wasTsundoku = !selectedBookshelfId || !selectedCategoryId;

    if (isTsundokuNow) {
      if (!wasTsundoku) {
        // From bookshelf to Tsundoku
        removeBookFromCategory(selectedBookshelfId!, selectedCategoryId!, book.id);
        addTsundokuBook(book);
      } else {
        // Update within Tsundoku
        updateTsundokuBook(book);
      }
    } else if (newBookshelfId && newCategoryId) {
      if (wasTsundoku) {
        // From Tsundoku to bookshelf
        removeTsundokuBook(book.id);
        addBookToCategory(newBookshelfId, newCategoryId, book);
      } else {
        // Move between categories or update within the same category
        const isCategoryChanged = selectedCategoryId !== newCategoryId || selectedBookshelfId !== newBookshelfId;
        if (isCategoryChanged) {
          removeBookFromCategory(selectedBookshelfId!, selectedCategoryId!, book.id);
          addBookToCategory(newBookshelfId, newCategoryId, book);
        } else {
          updateBookInCategory(selectedBookshelfId!, selectedCategoryId!, book);
        }
      }
    }
  };

  const handleSaveBookshelf = (id: string | null, name: string, visibility: 'public' | 'private') => {
    const title = `『${name}』の本棚`;
    if (id) {
      const existingShelf = bookshelves.find(shelf => shelf.id === id);
      if (existingShelf) {
        updateBookshelf(id, title, existingShelf.tags);
      }
    } else {
      const tags: Tag[] = [{ id: name, name: name }];
      addBookshelf(title, tags, visibility);
    }
  };

  const handleOpenCreateBookshelfModal = () => {
    setShelfToEdit(null);
    setIsBookshelfModalOpen(true);
  };

  const handleOpenEditBookshelfModal = (shelf: Bookshelf) => {
    setShelfToEdit(shelf);
    setIsBookshelfModalOpen(true);
  };

  if (!currentUser) {
    return <div className="text-center p-8">ユーザー情報の読み込みに失敗しました。</div>;
  }

  return (
    <div className="container mx-auto bg-background min-h-screen">
      <UserProfileHeader user={{...currentUser, tsundoku: currentUser.tsundoku || []}} isMyPage />
       <AddBookModal
         isOpen={isAddBookModalOpen}
         onClose={() => setIsAddBookModalOpen(false)}
         onSave={handleSaveBook}
         bookshelves={bookshelves}
         initialBookshelfId={selectedBookshelfId}
       />
       <CreateBookshelfModal
        isOpen={isBookshelfModalOpen}
        onClose={() => setIsBookshelfModalOpen(false)}
        onSave={handleSaveBookshelf}
        shelfToEdit={shelfToEdit}
       />
       <EditBookModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        onSave={handleUpdateBook}
        book={bookToEdit}
        bookshelves={bookshelves}
        initialBookshelfId={selectedBookshelfId}
        initialCategoryId={selectedCategoryId}
       />
       <BookshelfSearchModal 
        isOpen={isSearchModalOpen}
        onClose={() => setIsSearchModalOpen(false)}
        bookshelves={bookshelves}
        onSelectBook={handleEditBook}
       />

      {bookshelves.length === 0 ? (
        <div className="text-center py-16 px-6 bg-white rounded-lg shadow">
            <BookOpenIcon className="mx-auto h-16 w-16 text-gray-300" />
            <h2 className="mt-4 text-2xl font-bold text-gray-800">本棚を作成しましょう</h2>
            <p className="mt-2 text-md text-gray-500">お気に入りの本を整理するための本棚を作ってみてください</p>
            <button 
              onClick={handleOpenCreateBookshelfModal} 
              className="mt-6 bg-primary text-white font-bold py-2 px-6 rounded-md hover:bg-opacity-90 transition-colors"
            >
                + 本棚を作る
            </button>
        </div>
      ) : (
        <>
            <div className="flex flex-col md:flex-row justify-between md:items-center mb-6">
                <div className="w-full md:w-auto">
                    <div className="flex justify-end md:hidden mb-2">
                        <button onClick={handleOpenCreateBookshelfModal} className="px-3 py-1.5 text-sm bg-muted text-text-secondary rounded-md hover:bg-opacity-80 flex items-center gap-1 flex-shrink-0">
                            <PlusIcon className="h-4 w-4" />
                            本棚を作る
                        </button>
                    </div>
                    <div className="flex items-center border-b border-gray-200 overflow-x-auto pb-2 md:pb-0">
                        <div className="flex flex-nowrap">
                            {bookshelves.map(shelf => (
                                <button
                                    key={shelf.id}
                                    onClick={() => setActiveTabId(shelf.id)}
                                    className={`px-4 py-2 text-sm font-medium flex items-center gap-2 flex-shrink-0 ${activeBookshelf?.id === shelf.id ? 'border-b-2 border-primary text-primary' : 'text-text-secondary hover:text-text'}`}
                                >
                                    {shelf.title}
                                    <span className="bg-muted text-text-secondary text-xs font-semibold px-2 py-0.5 rounded-full">{shelf.categories.reduce((acc, cat) => acc + cat.books.length, 0)}</span>
                                </button>
                            ))}
                        </div>
                        <button onClick={handleOpenCreateBookshelfModal} className="ml-4 px-3 py-1.5 text-sm bg-muted text-text-secondary rounded-md hover:bg-opacity-80 items-center gap-1 flex-shrink-0 hidden md:flex">
                            <PlusIcon className="h-4 w-4" />
                            本棚を作る
                        </button>
                    </div>
                </div>
                {activeBookshelf && (
                    <div className="mt-4 md:mt-0 flex flex-shrink-0">
                        <button onClick={() => setIsSearchModalOpen(true)} className="bg-white border border-gray-300 text-text font-bold py-2 px-4 rounded-md hover:bg-muted text-sm mr-2 flex items-center">
                            <MagnifyingGlassIcon className="w-4 h-4 mr-2" />
                            本棚内を検索
                        </button>
                        <button onClick={() => handleOpenEditBookshelfModal(activeBookshelf)} className="bg-white border border-gray-300 text-text font-bold py-2 px-4 rounded-md hover:bg-muted text-sm mr-2">
                            編集
                        </button>
                        <button onClick={() => handleOpenAddBookModal(activeBookshelf.id)} className="bg-primary text-white font-bold py-2 px-4 rounded-md hover:bg-opacity-80 text-sm">
                            + 本を登録する
                        </button>
                    </div>
                )}
            </div>

            {activeBookshelf && (
              activeBookshelf.categories.length === 0 ? (
                  <div className="text-center py-20 bg-white rounded-lg shadow-inner border border-gray-100">
                      <PlusIcon className="mx-auto h-12 w-12 text-gray-300" />
                      <h3 className="mt-2 text-lg font-bold text-gray-800">本を登録しましょう</h3>
                      <p className="mt-1 text-sm text-gray-500">本を登録してカテゴリを整理してください</p>
                      <button onClick={() => handleOpenAddBookModal(activeBookshelf.id)} className="mt-6 bg-primary text-white font-bold py-2 px-5 rounded-md hover:bg-opacity-90">
                          + 本を登録する
                      </button>
                  </div>
              ) : (
                <div className="space-y-8">
                  {activeBookshelf.categories.map(category => (
                    <div key={category.id} className="bg-muted p-6 rounded-lg">
                      <h3 className="text-xl font-bold mb-4 pb-2 border-b">{category.name}</h3>
                      {category.books.length === 0 ? (
                        <p className="text-gray-500">このカテゴリには本がありません。</p>
                      ) : (
                        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-6">
                          {category.books.map(book => (
                          <div key={book.id} className="relative group cursor-pointer" onClick={() => handleEditBook(book, activeBookshelf.id, category.id)}>
                              <BookCard id={book.id} title={book.title} author={book.author} isbn={book.isbn} tags={book.userTags} />
                              <div className="absolute top-2 right-2 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                              <button 
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleDeleteBook(book.id, activeBookshelf.id, category.id);
                                }} 
                                className="bg-error text-white rounded-full p-1 text-xs"
                              >
                                削除
                              </button>
                              </div>
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

      <div className="mt-12">
        <div className="flex items-center mb-6">
          <h2 className="text-2xl font-bold">積読棚</h2>
          {isTsundokuPublic ? (
            <span className="ml-4 px-2 py-0.5 text-xs font-semibold bg-blue-100 text-blue-800 rounded-full">公開中</span>
          ) : (
            <span className="ml-4 px-2 py-0.5 text-xs font-semibold bg-gray-100 text-gray-800 rounded-full">非公開</span>
          )}
          <span className="ml-2 px-3 py-1 text-sm font-semibold bg-muted text-text-secondary rounded-full">{tsundokuBooks.length}冊</span>
        </div>
        {tsundokuBooks.length === 0 ? (
           <div className="text-center py-16 px-6 bg-muted rounded-lg shadow-inner border border-gray-100">
              <BookOpenIcon className="mx-auto h-16 w-16 text-gray-400" />
              <p className="mt-4 text-md text-gray-600">積読の本はありません</p>
              <p className="mt-2 text-sm text-gray-500">本を登録する際に「積読」を選択すると、ここに表示されます</p>
          </div>
        ) : (
          <div className="p-6 bg-muted rounded-lg">
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-6">
              {tsundokuBooks.map(book => (
                  <div key={book.id} className="relative group cursor-pointer" onClick={() => handleEditBook(book)}>
                    <BookCard id={book.id} title={book.title} author={book.author} isbn={book.isbn} />
                    <div className="absolute top-2 right-2 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button 
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDeleteBook(book.id);
                        }} 
                        className="bg-error text-white rounded-full p-1 text-xs"
                      >
                        削除
                      </button>
                    </div>
                  </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyBookshelf;
