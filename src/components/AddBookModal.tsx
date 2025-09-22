import React, { useState, useEffect, useCallback, useMemo } from 'react';
import type { Book, UserBook, Bookshelf, Tag, BookCategory } from '../types';
import { GlobeAltIcon, LockClosedIcon, XMarkIcon, PlusIcon, MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import BookSearchModal from './BookSearchModal';
import { useBookshelf } from '../contexts/BookshelfContext';
import { categorySuggestions as staticCategorySuggestions } from '../data/categories';


interface AddBookModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (book: UserBook, bookshelfId?: string, categoryId?: string) => void;
  bookshelves: Bookshelf[];
  initialBookshelfId: string | null;
}

const AddBookModal: React.FC<AddBookModalProps> = ({ isOpen, onClose, onSave, bookshelves, initialBookshelfId }) => {
  const { addCategoryToBookshelf } = useBookshelf();

  const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);
  const [title, setTitle] = useState('');
  
  const [visibility, setVisibility] = useState<'public' | 'private'>('public');
  const [status, setStatus] = useState<'読了' | '読書中' | '積読'>('読了');
  const [bookshelfId, setBookshelfId] = useState<string>('');
  const [categoryId, setCategoryId] = useState<string>('');
  const [tags, setTags] = useState<Tag[]>([]);
  const [tagInput, setTagInput] = useState('');
  const [newCategoryName, setNewCategoryName] = useState('');

  const activeBookshelf = bookshelves.find(b => b.id === bookshelfId);

  const allExistingCategories = useMemo(() => {
    const categories = new Set(Object.keys(staticCategorySuggestions));
    bookshelves.forEach(shelf => {
      shelf.categories.forEach(cat => categories.add(cat.name));
    });
    return Array.from(categories);
  }, [bookshelves]);

  const categorySuggestions = useMemo(() => {
    if (!newCategoryName) return [];
    return allExistingCategories.filter(cat => cat.toLowerCase().includes(newCategoryName.toLowerCase()));
  }, [newCategoryName, allExistingCategories]);
  
  const allExistingTags = useMemo(() => {
    const tags = new Set<string>();
    // Add tags from static suggestions based on selected category
    if (activeBookshelf && categoryId) {
      const activeCategory = activeBookshelf.categories.find(c => c.id === categoryId);
      if (activeCategory && staticCategorySuggestions[activeCategory.name]) {
        staticCategorySuggestions[activeCategory.name].hashtags.forEach(t => tags.add(t.replace('#','')));
      }
    }
    // Add all tags from all books
    bookshelves.forEach(shelf => {
      shelf.categories.forEach(cat => {
        cat.books.forEach(book => {
          book.userTags?.forEach(tag => tags.add(tag.name));
        });
      });
    });
    return Array.from(tags);
  }, [bookshelves, activeBookshelf, categoryId]);

  const tagSuggestions = useMemo(() => {
    if (!tagInput) return [];
    return allExistingTags.filter(tag => tag.toLowerCase().includes(tagInput.toLowerCase()));
  }, [tagInput, allExistingTags]);

  useEffect(() => {
    if (initialBookshelfId) {
      setBookshelfId(initialBookshelfId);
    } else if (bookshelves.length > 0) {
      setBookshelfId(bookshelves[0].id);
    }
  }, [initialBookshelfId, bookshelves]);

  const resetState = useCallback(() => {
    setIsSearchModalOpen(false);
    setSelectedBook(null);
    setTitle('');
    setVisibility('public');
    setStatus('読了');
    setBookshelfId(initialBookshelfId || (bookshelves.length > 0 ? bookshelves[0].id : ''));
    setCategoryId('');
    setTags([]);
    setTagInput('');
    setNewCategoryName('');
  }, [initialBookshelfId, bookshelves]);
  
  const handleClose = () => {
    resetState();
    onClose();
  };

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
    if (selectedBook) {
      setSelectedBook(null);
    }
  };

  const handleSelectBook = (book: Book) => {
    setSelectedBook(book);
    setTitle(book.title);
  };

  const handleAddTag = () => {
    if (tags.length >= 5) {
      alert('タグは5個までしか登録できません。');
      return;
    }
    const tagName = tagInput.trim().replace(/^#/, '');
    if (tagName.length > 20) {
      alert('タグは20文字以内で入力してください。');
      return;
    }
    if (tagName && !tags.find(t => t.name === tagName)) {
      setTags([...tags, { id: tagName, name: tagName }]);
    }
    setTagInput('');
  };
  
  const handleTagInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleAddTag();
    }
  };

  const handleRemoveTag = (tagToRemove: Tag) => {
    setTags(tags.filter(tag => tag.id !== tagToRemove.id));
  };

  const handleSave = () => {
    if (!selectedBook) return;
    
    const bookToAdd: UserBook = {
      ...selectedBook,
      status,
      userTags: tags,
      visibility,
      userSummary: '',
      userRating: { overall: 0, difficulty: 0, practicality: 0 },
    };

    if (status === '積読') {
      onSave(bookToAdd);
    } else if (bookshelfId && categoryId) {
      onSave(bookToAdd, bookshelfId, categoryId);
    }
    handleClose();
  };
  
  const handleAddCategory = () => {
    if (newCategoryName.trim() && bookshelfId) {
      // Temporarily create an ID for the new category to set it as selected
      const tempId = new Date().toISOString(); 
      addCategoryToBookshelf(bookshelfId, newCategoryName.trim(), tempId);
      setCategoryId(tempId);
      setNewCategoryName('');
    }
  };


  if (!isOpen) return null;

  return (
    <>
      <BookSearchModal
        isOpen={isSearchModalOpen}
        onClose={() => setIsSearchModalOpen(false)}
        onSelectBook={handleSelectBook}
        initialQuery={title}
      />
      <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center px-4 py-6">
        <div className="bg-white p-4 sm:p-6 rounded-lg shadow-2xl w-full max-w-lg max-h-[90vh] flex flex-col text-sm">
          <div className="flex justify-between items-center mb-4 flex-shrink-0">
            <h2 className="text-lg font-bold">本を追加</h2>
            <button onClick={handleClose} className="text-2xl text-gray-500 hover:text-gray-800">&times;</button>
          </div>
          
          <div className="overflow-y-auto pr-2 sm:pr-4 space-y-3 flex-grow">
              <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">公開設定</label>
                  <div className="relative">
                      <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                          {visibility === 'public' ? <GlobeAltIcon className="h-5 w-5 text-gray-400" /> : <LockClosedIcon className="h-5 w-5 text-gray-400" />}
                      </div>
                      <select value={visibility} onChange={(e) => setVisibility(e.target.value as 'public' | 'private')} className="w-full p-2 pl-10 border border-gray-300 rounded-md appearance-none text-sm">
                          <option value="public">公開</option>
                          <option value="private">非公開</option>
                      </select>
                  </div>
              </div>

              <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">タイトル <span className="text-red-500">*</span></label>
                  <div className="flex items-center">
                    <input type="text" value={title} onChange={handleTitleChange} placeholder="書籍のタイトルを入力..." className="w-full p-2 border rounded-l-md text-sm"/>
                    <button onClick={() => setIsSearchModalOpen(true)} className="bg-gray-200 p-2.5 rounded-r-md border border-l-0 border-gray-300">
                      <MagnifyingGlassIcon className="h-5 w-5 text-gray-600"/>
                    </button>
                  </div>
              </div>

              <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">読書進捗</label>
                  <select value={status} onChange={(e) => setStatus(e.target.value as '読了' | '読書中' | '積読')} className="w-full p-2 border border-gray-300 rounded-md text-sm">
                      <option>読了</option>
                      <option>読書中</option>
                      <option>積読</option>
                  </select>
              </div>

              {status !== '積読' && (
                <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1">カテゴリ（棚）<span className="text-red-500">*</span></label>
                    <select value={bookshelfId} onChange={(e) => {setBookshelfId(e.target.value); setCategoryId('')}} className="w-full p-2 border border-gray-300 rounded-md mb-2 text-sm">
                      <option value="" disabled>本棚を選択してください</option>
                      {bookshelves.map(shelf => (
                          <option key={shelf.id} value={shelf.id}>{shelf.title}</option>
                      ))}
                  </select>
                  
                  {bookshelfId && (
                    <>
                      <select value={categoryId} onChange={(e) => setCategoryId(e.target.value)} className="w-full p-2 border border-gray-300 rounded-md text-sm">
                          <option value="" disabled>カテゴリを選択してください</option>
                          {activeBookshelf?.categories.map(cat => (
                              <option key={cat.id} value={cat.id}>{cat.name}</option>
                          ))}
                      </select>
                      <div className="mt-2 relative">
                        <div className="flex">
                          <input 
                            type="text" 
                            value={newCategoryName}
                            onChange={(e) => setNewCategoryName(e.target.value)}
                            placeholder="新しいカテゴリ名"
                            className="w-full p-2 border rounded-l-md text-sm"
                          />
                          <button onClick={handleAddCategory} className="bg-gray-200 px-3 py-2 rounded-r-md text-xs font-semibold text-gray-700 hover:bg-gray-300 flex-shrink-0">作成</button>
                        </div>
                        {categorySuggestions.length > 0 && (
                          <div className="absolute z-10 w-full bg-white border border-gray-200 rounded-md mt-1 max-h-32 overflow-y-auto">
                            {categorySuggestions.slice(0, 5).map(cat => (
                              <div key={cat} onClick={() => {setNewCategoryName(cat);}} className="p-2 text-xs hover:bg-gray-100 cursor-pointer">
                                {cat}
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    </>
                  )}
                </div>
              )}

              <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">本のタグ</label>
                  <div className="flex relative">
                      <div className="w-full">
                        <div className="flex">
                          <input type="text" value={tagInput} onChange={(e) => setTagInput(e.target.value)} onKeyDown={handleTagInputKeyDown} placeholder="#本のタグを入力" className="w-full p-2 border rounded-l-md text-sm"/>
                          <button onClick={handleAddTag} className="bg-gray-200 px-3 py-2 rounded-r-md"><PlusIcon className="h-5 w-5 text-gray-600"/></button>
                        </div>
                        {tagSuggestions.length > 0 && (
                          <div className="absolute z-10 w-full bg-white border border-gray-200 rounded-md mt-1 max-h-32 overflow-y-auto">
                            {tagSuggestions.slice(0, 5).map(tag => (
                              <div key={tag} onClick={() => {setTagInput(tag);}} className="p-2 text-xs hover:bg-gray-100 cursor-pointer">
                                #{tag}
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                  </div>
                  <div className="mt-2 flex flex-wrap gap-1.5">
                      {tags.map(tag => (
                          <span key={tag.id} className="flex items-center bg-gray-200 text-xs rounded-full px-2.5 py-1">
                              #{tag.name}
                              <button onClick={() => handleRemoveTag(tag)} className="ml-1.5 text-gray-500 hover:text-gray-800"><XMarkIcon className="h-3 w-3"/></button>
                          </span>
                      ))}
                  </div>
              </div>
          </div>

          <div className="mt-4 pt-3 border-t flex justify-end space-x-2 flex-shrink-0">
            <button onClick={handleClose} className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 text-sm">キャンセル</button>
            <button 
              onClick={handleSave} 
              disabled={!selectedBook || (status !== '積読' && (!bookshelfId || !categoryId))} 
              className="px-4 py-2 bg-accent text-white font-bold rounded-md hover:bg-opacity-90 disabled:bg-gray-400 disabled:cursor-not-allowed text-sm"
            >
              追加
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddBookModal;
