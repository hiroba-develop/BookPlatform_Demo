import React from 'react';
import type { UserBook } from '../types';
import { XMarkIcon, StarIcon } from '@heroicons/react/24/solid';

interface BookDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  book: UserBook | null;
}

const ReadOnlyStarRating: React.FC<{ rating: number; label: string }> = ({ rating, label }) => (
  <div className="flex items-center">
    <span className="text-sm font-medium text-gray-600 w-24">{label}</span>
    <div className="flex">
      {[...Array(5)].map((_, i) => (
        <StarIcon
          key={i}
          className={`h-5 w-5 ${i < rating ? 'text-yellow-400' : 'text-gray-300'}`}
        />
      ))}
    </div>
  </div>
);

const BookDetailModal: React.FC<BookDetailModalProps> = ({ isOpen, onClose, book }) => {
  if (!isOpen || !book) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 z-50 flex justify-center items-center p-4">
      <div className="bg-white rounded-lg shadow-2xl w-full max-w-4xl max-h-[90vh] flex flex-col sm:flex-row">
        <div className="w-full sm:w-1/3 flex-shrink-0 bg-gray-100 sm:rounded-l-lg p-4">
          <img
            src={`https://ndlsearch.ndl.go.jp/thumbnail/${book.isbn}.jpg`}
            alt={book.title}
            className="w-full h-full object-contain rounded-t-lg sm:rounded-l-lg sm:rounded-t-none"
            onError={(e) => {
              e.currentTarget.src = 'https://dummyimage.com/150x220/e0e0e0/aaa.png&text=No+Image';
            }}
          />
        </div>
        
        <div className="w-full sm:w-2/3 flex flex-col p-6 overflow-y-auto">
          <div className="flex justify-between items-start mb-4">
            <div>
              <h2 className="text-2xl font-bold text-gray-800">{book.title}</h2>
              <p className="text-md text-gray-500 mt-1">{book.author}</p>
            </div>
            <button onClick={onClose} className="p-1 rounded-full text-gray-400 hover:bg-gray-200 transition-colors">
              <XMarkIcon className="h-6 w-6" />
            </button>
          </div>

          <div className="space-y-6 text-sm">
            {book.userTags && book.userTags.length > 0 && (
              <div>
                <h4 className="font-semibold text-gray-700 mb-2">タグ</h4>
                <div className="flex flex-wrap gap-2">
                  {book.userTags.map(tag => (
                    <span key={tag.id} className="bg-muted text-text-secondary px-2.5 py-1 rounded-full text-xs">#{tag.name}</span>
                  ))}
                </div>
              </div>
            )}

            {book.userRating && (
              <div>
                <h4 className="font-semibold text-gray-700 mb-3">評価</h4>
                <div className="space-y-2">
                  <ReadOnlyStarRating rating={book.userRating.overall} label="総合評価" />
                  <ReadOnlyStarRating rating={book.userRating.difficulty} label="難易度" />
                  <ReadOnlyStarRating rating={book.userRating.practicality} label="実用度" />
                </div>
              </div>
            )}
            
            {book.userSummary && (
              <div>
                <h4 className="font-semibold text-gray-700 mb-2">サマリー</h4>
                <p className="text-gray-600 bg-gray-50 p-3 rounded-md whitespace-pre-wrap">{book.userSummary}</p>
              </div>
            )}
            
            {book.knowledgeTank && (
              <div>
                <h4 className="font-semibold text-gray-700 mb-2">ナレッジタンク</h4>
                <p className="text-gray-600 bg-blue-50 p-3 rounded-md whitespace-pre-wrap">{book.knowledgeTank}</p>
                {book.knowledgeTankTags && book.knowledgeTankTags.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-3">
                    {book.knowledgeTankTags.map(tag => (
                      <span key={tag.id} className="bg-blue-100 text-blue-800 px-2.5 py-1 rounded-full text-xs">#{tag.name}</span>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookDetailModal;
