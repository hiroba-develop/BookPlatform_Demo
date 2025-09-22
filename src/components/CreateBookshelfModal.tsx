import React, { useState, useEffect } from 'react';
import { GlobeAltIcon, LockClosedIcon } from '@heroicons/react/24/outline';
import type { Bookshelf } from '../types';

interface CreateBookshelfModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (id: string | null, name: string, visibility: 'public' | 'private') => void;
  shelfToEdit?: Bookshelf | null;
}

const CreateBookshelfModal: React.FC<CreateBookshelfModalProps> = ({ isOpen, onClose, onSave, shelfToEdit }) => {
  const [name, setName] = useState('');
  const [visibility, setVisibility] = useState<'public' | 'private'>('public');

  const isEditMode = !!shelfToEdit;

  useEffect(() => {
    if (isOpen) {
      if (isEditMode && shelfToEdit) {
        const match = shelfToEdit.title.match(/『(.+)』の本棚/);
        setName(match ? match[1] : shelfToEdit.title);
        setVisibility(shelfToEdit.visibility);
      } else {
        setName('');
        setVisibility('public');
      }
    }
  }, [isOpen, shelfToEdit, isEditMode]);


  const handleSave = () => {
    if (name.trim()) {
      onSave(isEditMode ? shelfToEdit.id : null, name.trim(), visibility);
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center">
      <div className="bg-white p-8 rounded-lg shadow-2xl w-full max-w-md">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">{isEditMode ? '本棚を編集' : '本棚を作る'}</h2>
          <button onClick={onClose} className="text-2xl font-bold">&times;</button>
        </div>
        
        <div className="space-y-6">
          <div>
            <label htmlFor="bookshelf-name" className="block text-sm font-medium text-gray-700 mb-1">
              本棚の名前 <span className="text-red-500">*</span>
            </label>
            <input
              id="bookshelf-name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="本棚の名前を入力..."
              className="w-full p-2 border border-gray-300 rounded-md"
            />
          </div>

          <div>
            <label htmlFor="visibility" className="block text-sm font-medium text-gray-700 mb-1">
              公開設定
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                {visibility === 'public' ? (
                  <GlobeAltIcon className="h-5 w-5 text-gray-400" />
                ) : (
                  <LockClosedIcon className="h-5 w-5 text-gray-400" />
                )}
              </div>
              <select
                id="visibility"
                value={visibility}
                onChange={(e) => setVisibility(e.target.value as 'public' | 'private')}
                className="w-full p-2 pl-10 border border-gray-300 rounded-md appearance-none"
              >
                <option value="public">公開</option>
                <option value="private">非公開</option>
              </select>
            </div>
          </div>
        </div>

        <div className="mt-8 flex justify-end space-x-4">
          <button 
            onClick={onClose} 
            className="px-6 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
          >
            キャンセル
          </button>
          <button 
            onClick={handleSave} 
            disabled={!name.trim()}
            className="px-6 py-2 bg-accent text-white font-bold rounded-md hover:bg-opacity-90 disabled:bg-gray-400"
          >
            {isEditMode ? '更新' : '+ 作成'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateBookshelfModal;
