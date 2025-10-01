import React from 'react';
import type { UserBook } from '../types';
import { XMarkIcon, StarIcon, ArrowTopRightOnSquareIcon } from '@heroicons/react/24/solid';
import { useHashtagClick } from '../hooks/useHashtagClick';

interface BookDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  book: UserBook | null;
}

const ReadOnlyStarRating: React.FC<{ rating: number; label: string }> = ({ rating, label }) => (
  <div className="flex items-center">
    <span className="text-xs sm:text-sm font-medium text-gray-600 w-16 sm:w-24">{label}</span>
    <div className="flex">
      {[...Array(5)].map((_, i) => (
        <StarIcon
          key={i}
          className={`h-4 w-4 sm:h-5 sm:w-5 ${i < rating ? 'text-yellow-400' : 'text-gray-300'}`}
        />
      ))}
    </div>
  </div>
);

const BookDetailModal: React.FC<BookDetailModalProps> = ({ isOpen, onClose, book }) => {
  const { handleHashtagClick } = useHashtagClick();
  
  if (!isOpen || !book) return null;

  const amazonSearchUrl = `https://www.amazon.co.jp/s?k=${encodeURIComponent(`${book.title} ${book.author} ${book.isbn}`)}`;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 z-50 flex justify-center items-center p-2 sm:p-4">
      <div className="bg-white rounded-lg shadow-2xl w-full max-w-4xl max-h-[95vh] sm:max-h-[90vh] flex flex-col sm:flex-row">
        {/* 画像セクション - スマートフォンでは上部に小さく表示 */}
        <div className="w-full sm:w-1/3 flex-shrink-0 bg-gray-100 sm:rounded-l-lg p-2 sm:p-4">
          <div className="flex justify-center sm:block">
            <img
              src={`https://ndlsearch.ndl.go.jp/thumbnail/${book.isbn}.jpg`}
              alt={book.title}
              className="w-40 h-52 sm:w-full sm:h-full object-contain rounded-t-lg sm:rounded-l-lg sm:rounded-t-none mx-auto sm:mx-0"
              onError={(e) => {
                e.currentTarget.src = 'https://dummyimage.com/150x220/e0e0e0/aaa.png&text=No+Image';
              }}
            />
          </div>
        </div>
        
        {/* コンテンツセクション - スマートフォンではスクロール可能 */}
        <div className="w-full sm:w-2/3 flex flex-col p-3 sm:p-6 overflow-y-auto max-h-[70vh] sm:max-h-none">
          <div className="flex justify-between items-start mb-3 sm:mb-4">
            <div className="flex-1 pr-2">
              <h2 className="text-lg sm:text-2xl font-bold text-gray-800 leading-tight">{book.title}</h2>
              <p className="text-sm sm:text-md text-gray-500 mt-1">{book.author}</p>
            </div>
            <button onClick={onClose} className="p-1 rounded-full text-gray-400 hover:bg-gray-200 transition-colors flex-shrink-0">
              <XMarkIcon className="h-5 w-5 sm:h-6 sm:w-6" />
            </button>
          </div>

          <a
            href={amazonSearchUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm text-primary hover:underline mb-4"
          >
            Amazonで探す
            <ArrowTopRightOnSquareIcon className="h-4 w-4" />
          </a>


          <div className="space-y-4 sm:space-y-6 text-sm">
            {book.userTags && book.userTags.length > 0 && (
              <div>
                <h4 className="font-semibold text-gray-700 mb-2 text-sm sm:text-base">タグ</h4>
                <div className="flex flex-wrap gap-1.5 sm:gap-2">
                  {book.userTags.map(tag => (
                    <span 
                      key={tag.id} 
                      className="bg-muted text-text-secondary px-2 py-1 rounded-full text-xs cursor-pointer hover:bg-gray-300 transition-colors"
                      onClick={() => handleHashtagClick(tag.name)}
                    >
                      #{tag.name}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {book.userRating && (
              <div>
                <h4 className="font-semibold text-gray-700 mb-2 sm:mb-3 text-sm sm:text-base">評価</h4>
                <div className="space-y-1.5 sm:space-y-2">
                  <ReadOnlyStarRating rating={book.userRating.overall} label="総合評価" />
                  <ReadOnlyStarRating rating={book.userRating.difficulty} label="難易度" />
                  <ReadOnlyStarRating rating={book.userRating.practicality} label="実用度" />
                </div>
              </div>
            )}
            
            {book.userSummary && (
              <div>
                <h4 className="font-semibold text-gray-700 mb-2 text-sm sm:text-base">サマリー</h4>
                <p className="text-gray-600 bg-gray-50 p-2 sm:p-3 rounded-md whitespace-pre-wrap text-xs sm:text-sm leading-relaxed">{book.userSummary}</p>
              </div>
            )}
            
            {book.knowledgeTank && (
              <div>
                <h4 className="font-semibold text-gray-700 mb-2 text-sm sm:text-base">ナレッジタンク</h4>
                <p className="text-gray-600 bg-blue-50 p-2 sm:p-3 rounded-md whitespace-pre-wrap text-xs sm:text-sm leading-relaxed">{book.knowledgeTank}</p>
                {book.knowledgeTankTags && book.knowledgeTankTags.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 sm:gap-2 mt-2 sm:mt-3">
                    {book.knowledgeTankTags.map(tag => (
                      <span 
                        key={tag.id} 
                        className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs cursor-pointer hover:bg-blue-200 transition-colors"
                        onClick={() => handleHashtagClick(tag.name)}
                      >
                        #{tag.name}
                      </span>
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
