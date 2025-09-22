import React, { useState, useEffect } from 'react';
import type { UserBook, Tag, Bookshelf } from '../types';
import StarRatingInput from './StarRatingInput';
import { XMarkIcon, PlusIcon } from '@heroicons/react/24/outline';

interface EditBookModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (book: UserBook, newBookshelfId: string, newCategoryId: string) => void;
  book: UserBook | null;
  bookshelves: Bookshelf[];
  initialBookshelfId: string | null;
  initialCategoryId: string | null;
}

const EditBookModal: React.FC<EditBookModalProps> = ({ 
  isOpen, onClose, onSave, book, bookshelves, initialBookshelfId, initialCategoryId 
}) => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [userTags, setUserTags] = useState<Tag[]>([]);
  const [tagInput, setTagInput] = useState('');
  const [summary, setSummary] = useState('');
  const [rating, setRating] = useState({ overall: 0, difficulty: 0, practicality: 0 });
  const [knowledgeTank, setKnowledgeTank] = useState('');
  const [knowledgeTankTags, setKnowledgeTankTags] = useState<Tag[]>([]);
  const [knowledgeTagInput, setKnowledgeTagInput] = useState('');
  const [status, setStatus] = useState<'読了' | '読書中' | '積読'>('読了');
  const [visibility, setVisibility] = useState<'public' | 'private'>('public');
  const [containsSpoiler, setContainsSpoiler] = useState(false);
  const [selectedBookshelfId, setSelectedBookshelfId] = useState<string>('');
  const [selectedCategoryId, setSelectedCategoryId] = useState<string>('');


  useEffect(() => {
    if (book) {
      setTitle(book.title);
      setAuthor(book.author);
      setUserTags(book.userTags || []);
      setSummary(book.userSummary || '');
      setRating(book.userRating || { overall: 0, difficulty: 0, practicality: 0 });
      setKnowledgeTank(book.knowledgeTank || '');
      setKnowledgeTankTags(book.knowledgeTankTags || []);
      setStatus(book.status);
      setVisibility(book.visibility || 'public');
      setContainsSpoiler(book.containsSpoiler || false);
      setSelectedBookshelfId(initialBookshelfId || '');
      setSelectedCategoryId(initialCategoryId || '');
    }
  }, [book, initialBookshelfId, initialCategoryId]);

  const handleAddTag = (type: 'book' | 'knowledge') => {
    const isBookTag = type === 'book';
    const tags = isBookTag ? userTags : knowledgeTankTags;
    const setTags = isBookTag ? setUserTags : setKnowledgeTankTags;
    const input = isBookTag ? tagInput : knowledgeTagInput;
    const setInput = isBookTag ? setTagInput : setKnowledgeTagInput;

    if (tags.length >= 5) {
      alert('タグは5個までしか登録できません。');
      return;
    }

    const tagName = input.trim().replace(/^#/, '');

    if (tagName.length > 20) {
      alert('タグは20文字以内で入力してください。');
      return;
    }

    if (tagName && !tags.find(t => t.name === tagName)) {
      setTags([...tags, { id: tagName, name: tagName }]);
    }
    setInput('');
  };

  const handleRemoveTag = (tagToRemove: Tag, type: 'book' | 'knowledge') => {
    if (type === 'book') {
      setUserTags(userTags.filter(tag => tag.id !== tagToRemove.id));
    } else {
      setKnowledgeTankTags(knowledgeTankTags.filter(tag => tag.id !== tagToRemove.id));
    }
  };
  
  const handleSave = () => {
    if (!book) return;
    const updatedBook: UserBook = {
      ...book,
      userTags,
      userSummary: summary,
      userRating: rating,
      knowledgeTank: knowledgeTank,
      knowledgeTankTags: knowledgeTankTags,
      status,
      visibility,
      containsSpoiler,
    };
    onSave(updatedBook, selectedBookshelfId, selectedCategoryId);
    onClose();
  };

  if (!isOpen || !book) return null;

  const activeBookshelf = bookshelves.find(bs => bs.id === selectedBookshelfId);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-start pt-20">
      <div className="bg-white p-6 rounded-lg shadow-2xl w-full max-w-2xl max-h-[80vh] flex flex-col">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold">本の情報を編集</h2>
          <button onClick={onClose} className="text-2xl text-gray-500 hover:text-gray-800">&times;</button>
        </div>
        
        <div className="overflow-y-auto pr-4 space-y-4">
          <div>
            <h3 className="text-lg font-semibold">{title}</h3>
            <p className="text-sm text-gray-500">{author}</p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">本のタグ</label>
            <div className="flex">
              <input type="text" value={tagInput} onChange={(e) => setTagInput(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && handleAddTag('book')} placeholder="#タグを追加" className="w-full p-2 border rounded-l-md"/>
              <button onClick={() => handleAddTag('book')} className="bg-gray-200 px-4 rounded-r-md"><PlusIcon className="h-5 w-5 text-gray-600"/></button>
            </div>
            <div className="mt-2 flex flex-wrap gap-2">
              {userTags.map(tag => (
                <span key={tag.id} className="flex items-center bg-gray-200 text-sm rounded-full px-3 py-1">
                  #{tag.name}
                  <button onClick={() => handleRemoveTag(tag, 'book')} className="ml-2 text-gray-500 hover:text-gray-800"><XMarkIcon className="h-3 w-3"/></button>
                </span>
              ))}
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">サマリー</label>
            <textarea value={summary} onChange={(e) => setSummary(e.target.value)} rows={4} className="w-full p-2 border rounded-md" placeholder="本の内容を簡潔に説明してください"></textarea>
          </div>
          
          <div className="border-t my-4"></div>

          <div>
            <h3 className="text-lg font-semibold mb-2">ナレッジタンク</h3>
            <p className="text-sm text-gray-500 mb-2">本から得た示唆やアクションプランなどを記録しましょう。</p>
            <textarea value={knowledgeTank} onChange={(e) => setKnowledgeTank(e.target.value)} rows={6} className="w-full p-2 border rounded-md" placeholder="大事な部分を書き出したり、得た学びを記録しましょう。"></textarea>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">ナレッジタンクのタグ</label>
             <div className="flex">
              <input type="text" value={knowledgeTagInput} onChange={(e) => setKnowledgeTagInput(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && handleAddTag('knowledge')} placeholder="#キーワードを追加" className="w-full p-2 border rounded-l-md"/>
              <button onClick={() => handleAddTag('knowledge')} className="bg-gray-200 px-4 rounded-r-md"><PlusIcon className="h-5 w-5 text-gray-600"/></button>
            </div>
            <div className="mt-2 flex flex-wrap gap-2">
              {knowledgeTankTags.map(tag => (
                <span key={tag.id} className="flex items-center bg-blue-100 text-sm rounded-full px-3 py-1">
                  #{tag.name}
                  <button onClick={() => handleRemoveTag(tag, 'knowledge')} className="ml-2 text-blue-500 hover:text-blue-800"><XMarkIcon className="h-3 w-3"/></button>
                </span>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">評価</label>
            <p className="text-xs text-gray-500 mb-2">評価は0.5刻みで設定できます。</p>
            <div className="p-4 border rounded-md bg-gray-50">
                <StarRatingInput label="総合評価" rating={rating.overall} onRatingChange={(r) => setRating(p => ({...p, overall: r}))} />
                <StarRatingInput label="難易度" rating={rating.difficulty} onRatingChange={(r) => setRating(p => ({...p, difficulty: r}))} />
                <StarRatingInput label="実用度" rating={rating.practicality} onRatingChange={(r) => setRating(p => ({...p, practicality: r}))} />
            </div>
          </div>

          <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">読書進捗</label>
              <select value={status} onChange={(e) => setStatus(e.target.value as '読了' | '読書中' | '積読')} className="w-full p-2 border border-gray-300 rounded-md">
                  <option>読了</option>
                  <option>読書中</option>
                  <option>積読</option>
              </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">公開設定</label>
            <div className='p-4 border rounded-md bg-gray-50 space-y-3'>
              <select value={visibility} onChange={(e) => setVisibility(e.target.value as 'public' | 'private')} className="w-full p-2 border border-gray-300 rounded-md">
                  <option value="public">公開</option>
                  <option value="private">非公開</option>
              </select>
              <div className="flex items-center">
                  <input
                      id="containsSpoiler"
                      type="checkbox"
                      checked={containsSpoiler}
                      onChange={(e) => setContainsSpoiler(e.target.checked)}
                      className="h-4 w-4 text-accent border-gray-300 rounded focus:ring-accent"
                  />
                  <label htmlFor="containsSpoiler" className="ml-2 block text-sm text-gray-900">
                      ネタバレの内容を含む
                  </label>
              </div>
            </div>
          </div>
          
          {status !== '積読' && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">棚の移動</label>
              <select 
                value={selectedBookshelfId} 
                onChange={(e) => {
                  setSelectedBookshelfId(e.target.value);
                  const firstCategory = bookshelves.find(bs => bs.id === e.target.value)?.categories[0];
                  setSelectedCategoryId(firstCategory?.id || '');
                }} 
                className="w-full p-2 border border-gray-300 rounded-md mb-2"
              >
                {bookshelves.map(shelf => (
                  <option key={shelf.id} value={shelf.id}>{shelf.title}</option>
                ))}
              </select>
              {activeBookshelf && (
                <select 
                  value={selectedCategoryId} 
                  onChange={(e) => setSelectedCategoryId(e.target.value)} 
                  className="w-full p-2 border border-gray-300 rounded-md"
                >
                  {activeBookshelf.categories.map(cat => (
                    <option key={cat.id} value={cat.id}>{cat.name}</option>
                  ))}
                </select>
              )}
            </div>
          )}

        </div>

        <div className="mt-6 pt-4 border-t flex justify-end space-x-3">
          <button onClick={onClose} className="px-6 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50">キャンセル</button>
          <button onClick={handleSave} className="px-6 py-2 bg-accent text-white font-bold rounded-md hover:bg-opacity-90">保存</button>
        </div>
      </div>
    </div>
  );
};

export default EditBookModal;
