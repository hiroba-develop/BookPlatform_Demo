import { createContext, useState, useContext, type ReactNode } from 'react';
import type { UserBook, Bookshelf, Tag, BookCategory } from '../types';
import { mockUsers } from '../data/mockUsers';

const demoUser = mockUsers.find(user => user.id === 'demo-user-id');
const initialBookshelves = demoUser ? demoUser.bookshelves : [];
const initialTsundoku = demoUser && demoUser.tsundoku ? demoUser.tsundoku : [];

interface BookshelfContextType {
  bookshelves: Bookshelf[];
  tsundokuBooks: UserBook[];
  addBookshelf: (title: string, tags: Tag[], visibility: 'public' | 'private') => void;
  removeBookshelf: (bookshelfId: string) => void;
  updateBookshelf: (bookshelfId: string, title: string, tags: Tag[]) => void;
  addCategoryToBookshelf: (bookshelfId: string, categoryName: string, categoryId?: string) => void;
  addBookToCategory: (bookshelfId: string, categoryId: string, book: UserBook) => void;
  removeBookFromCategory: (bookshelfId: string, categoryId: string, bookId: string) => void;
  updateBookInCategory: (bookshelfId: string, categoryId: string, book: UserBook) => void;
  addTsundokuBook: (book: UserBook) => void;
  removeTsundokuBook: (bookId: string) => void;
  updateTsundokuBook: (book: UserBook) => void;
  searchAllBooks: (query: string) => UserBook[];
}

const BookshelfContext = createContext<BookshelfContextType | undefined>(undefined);

export const BookshelfProvider = ({ children }: { children: ReactNode }) => {
  const [bookshelves, setBookshelves] = useState<Bookshelf[]>(initialBookshelves);
  const [tsundokuBooks, setTsundokuBooks] = useState<UserBook[]>(initialTsundoku);

  const addBookshelf = (title: string, tags: Tag[], visibility: 'public' | 'private') => {
    const newBookshelf: Bookshelf = {
      id: new Date().toISOString(),
      title,
      tags,
      categories: [],
      visibility,
    };
    setBookshelves(prev => [...prev, newBookshelf]);
  };

  const removeBookshelf = (bookshelfId: string) => {
    setBookshelves(prev => prev.filter(shelf => shelf.id !== bookshelfId));
  };

  const updateBookshelf = (bookshelfId: string, title: string, tags: Tag[]) => {
    setBookshelves(prev => prev.map(shelf =>
      shelf.id === bookshelfId ? { ...shelf, title, tags } : shelf
    ));
  };

  const addTsundokuBook = (book: UserBook) => {
    setTsundokuBooks(prev => [...prev, book]);
  };

  const removeTsundokuBook = (bookId: string) => {
    setTsundokuBooks(prev => prev.filter(b => b.id !== bookId));
  };

  const updateTsundokuBook = (updatedBook: UserBook) => {
    setTsundokuBooks(prev => prev.map(b => b.id === updatedBook.id ? updatedBook : b));
  };

  const addCategoryToBookshelf = (bookshelfId: string, categoryName: string, categoryId?: string) => {
    const newCategory: BookCategory = {
      id: categoryId || new Date().toISOString(),
      name: categoryName,
      books: [],
    };
    setBookshelves(prev => prev.map(shelf =>
      shelf.id === bookshelfId ? { ...shelf, categories: [...shelf.categories, newCategory] } : shelf
    ));
  };

  const addBookToCategory = (bookshelfId: string, categoryId: string, book: UserBook) => {
    setBookshelves(prev => prev.map(shelf => {
      if (shelf.id === bookshelfId) {
        return {
          ...shelf,
          categories: shelf.categories.map(cat => {
            if (cat.id === categoryId && !cat.books.find(b => b.id === book.id)) {
              return { ...cat, books: [...cat.books, book] };
            }
            return cat;
          })
        };
      }
      return shelf;
    }));
  };

  const removeBookFromCategory = (bookshelfId: string, categoryId: string, bookId: string) => {
    setBookshelves(prev => prev.map(shelf => {
      if (shelf.id === bookshelfId) {
        return {
          ...shelf,
          categories: shelf.categories.map(cat => {
            if (cat.id === categoryId) {
              return { ...cat, books: cat.books.filter(b => b.id !== bookId) };
            }
            return cat;
          })
        };
      }
      return shelf;
    }));
  };

  const updateBookInCategory = (bookshelfId: string, categoryId: string, updatedBook: UserBook) => {
    setBookshelves(prev => prev.map(shelf => {
      if (shelf.id === bookshelfId) {
        return {
          ...shelf,
          categories: shelf.categories.map(cat => {
            if (cat.id === categoryId) {
              return { ...cat, books: cat.books.map(b => b.id === updatedBook.id ? updatedBook : b) };
            }
            return cat;
          })
        };
      }
      return shelf;
    }));
  };

  const normalize = (s: string) => (s || '')
    .toLowerCase()
    .replace(/[\uFF01-\uFF5E]/g, c => String.fromCharCode(c.charCodeAt(0) - 0xFEE0)) // full-width -> half
    .replace(/[\s\u3000]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();

  const gatherAllUserBooks = (): UserBook[] => {
    const collected: UserBook[] = [];
    for (const shelf of bookshelves) {
      for (const cat of shelf.categories) {
        for (const b of cat.books) {
          collected.push(b as UserBook);
        }
      }
    }
    // include tsundoku (avoid duplicate ids)
    const seen = new Set(collected.map(b => b.id));
    for (const b of tsundokuBooks) {
      if (!seen.has(b.id)) collected.push(b);
    }
    return collected;
  };

  const searchAllBooks = (query: string): UserBook[] => {
    const q = normalize(query);
    if (!q) return gatherAllUserBooks();
    const tokens = q.split(' ').filter(Boolean);
    const all = gatherAllUserBooks();
    return all.filter(book => {
      // find shelf tags book belongs to
      const shelfTags: string[] = [];
      for (const shelf of bookshelves) {
        for (const cat of shelf.categories) {
          if (cat.books.find(b => b.id === book.id)) {
            shelf.tags.forEach(t => shelfTags.push(t.name));
          }
        }
      }

      const haystack = normalize([
        book.title,
        book.author,
        (book as any).publisher,
        book.isbn,
        book.description,
        (book as any).userSummary,
        (book as any).knowledgeTank,
        ...(book.userTags?.map(t => t.name) || []),
        ...(((book as any).knowledgeTankTags as Tag[] | undefined)?.map(t => t.name) || []),
        ...shelfTags,
      ].filter(Boolean).join(' '));

      return tokens.every(t => haystack.includes(t));
    });
  };

  return (
    <BookshelfContext.Provider value={{ 
      bookshelves, 
      tsundokuBooks,
      addBookshelf, 
      removeBookshelf, 
      updateBookshelf, 
      addCategoryToBookshelf,
      addBookToCategory,
      removeBookFromCategory,
      updateBookInCategory,
      addTsundokuBook,
      removeTsundokuBook,
      updateTsundokuBook,
      searchAllBooks
    }}>
      {children}
    </BookshelfContext.Provider>
  );
};

export const useBookshelf = () => {
  const context = useContext(BookshelfContext);
  if (context === undefined) {
    throw new Error('useBookshelf must be used within a BookshelfProvider');
  }
  return context;
};
