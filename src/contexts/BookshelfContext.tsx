import { createContext, useState, ReactNode, useContext } from 'react';
import { UserBook, Bookshelf, Tag, BookCategory } from '../types';

const mockBookshelves: Bookshelf[] = [
  {
    id: 'shelf-1',
    title: '『#技術書』の本棚',
    tags: [{ id: '技術書', name: '技術書' }],
    visibility: 'public',
    categories: [
      {
        id: 'cat-1-1',
        name: 'フロントエンド',
        books: [
          {
            id: 'book-1-1-1',
            isbn: '9784297127473',
            title: 'プロを目指す人のためのTypeScript入門 安全なコードの書き方から高度な型の使い方まで',
            author: 'uhyohyo',
            publisher: '技術評論社',
            pubDate: '2022-04-22',
            imageUrl: '',
            description: 'TypeScriptの基礎から応用までを解説した書籍。',
            link: '',
            status: '読了',
            userTags: [{ id: 'typescript', name: 'TypeScript' }],
            knowledgeTank: 'TypeScriptの型システムは非常に強力で、大規模開発には欠かせない。'
          },
          {
            id: 'book-1-1-2',
            isbn: '9784798157573',
            title: 'JavaScript逆引きレシピ 第2版',
            author: '山田 祥寛',
            publisher: '翔泳社',
            pubDate: '2018-09-19',
            imageUrl: '',
            description: 'JavaScriptの様々なTipsを逆引き形式で探せる便利な一冊。',
            link: '',
            status: '読書中',
            userTags: [{ id: 'javascript', name: 'JavaScript' }],
          }
        ]
      }
    ]
  },
    {
    id: 'shelf-2',
    title: '『#小説』の本棚',
    tags: [{ id: '小説', name: '小説' }],
    visibility: 'public',
    categories: [
      {
        id: 'cat-2-1',
        name: 'ミステリー',
        books: [
          {
            id: '1',
            title: 'そして誰もいなくなった',
            author: 'アガサ・クリスティー',
            isbn: '9784151310805',
            userTags: [{ id: '1', name: 'ミステリー' }, { id: '2', name: '海外小説' }],
            status: '積読',
          }
        ]
      }
    ]
  }
];


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
  const [bookshelves, setBookshelves] = useState<Bookshelf[]>(mockBookshelves);
  const [tsundokuBooks, setTsundokuBooks] = useState<UserBook[]>([]);

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
