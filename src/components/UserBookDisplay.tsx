import React from 'react';
import { Link } from 'react-router-dom';
import { type UserBook } from '../types';
import { StarIcon } from '@heroicons/react/24/solid';

interface UserBookDisplayProps {
  book: UserBook;
}

const UserBookDisplay: React.FC<UserBookDisplayProps> = ({ book }) => {
  const renderStars = (rating: number) => {
    const fullStars = Math.floor(rating);
    const halfStar = rating % 1 !== 0;
    const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);
    return (
      <div className="flex">
        {[...Array(fullStars)].map((_, i) => <StarIcon key={`full-${i}`} className="h-5 w-5 text-yellow-400" />)}
        {halfStar && <StarIcon key="half" className="h-5 w-5 text-yellow-400" style={{ clipPath: 'polygon(0 0, 50% 0, 50% 100%, 0 100%)' }} />}
        {[...Array(emptyStars)].map((_, i) => <StarIcon key={`empty-${i}`} className="h-5 w-5 text-gray-300" />)}
      </div>
    );
  };

  const readingStatusInfo = {
    finished: { text: '読了', color: 'bg-green-500' },
    reading: { text: '読書中', color: 'bg-blue-500' },
    unread: { text: '積読', color: 'bg-gray-500' },
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-md flex flex-col h-full">
      <div className="flex gap-4">
        <div className="w-1/4 flex-shrink-0">
          <Link to={`/books/${book.id}`} state={{ book }}>
            <img 
              src={book.imageUrl || `https://dummyimage.com/150x220/e0e0e0/aaa.png&text=No+Image`} 
              alt={book.title} 
              className="w-full h-auto object-cover rounded" 
            />
          </Link>
        </div>
        <div className="w-3/4">
          {book.readingStatus && (
            <span className={`text-white text-xs font-bold px-2 py-1 rounded mb-2 inline-block ${readingStatusInfo[book.readingStatus].color}`}>
              {readingStatusInfo[book.readingStatus].text}
            </span>
          )}
          <Link to={`/books/${book.id}`} state={{ book }}>
            <h3 className="font-bold text-lg text-sub-2 hover:underline">{book.title}</h3>
          </Link>
          <p className="text-sm text-gray-600 mt-1">{book.author}</p>
          
          {book.userTags && book.userTags.length > 0 && (
            <div className="flex flex-wrap gap-1 mt-2">
              {book.userTags.map(tag => <span key={tag.id} className="text-xs bg-gray-200 px-2 py-1 rounded-full">#{tag.name}</span>)}
            </div>
          )}
        </div>
      </div>

      {book.userRating && (
        <div className="mt-4 border-t pt-4">
          <h4 className="font-semibold text-sm mb-2 text-gray-700">評価</h4>
          <div className="space-y-1 text-sm">
            <div className="flex justify-between items-center"><span>総合点</span>{renderStars(book.userRating.overall)}</div>
            <div className="flex justify-between items-center"><span>分かりやすさ</span>{renderStars(book.userRating.difficulty)}</div>
            <div className="flex justify-between items-center"><span>実用性</span>{renderStars(book.userRating.practicality)}</div>
          </div>
        </div>
      )}

      {book.userSummary && (
        <div className="mt-4 border-t pt-4">
          <h4 className="font-semibold text-sm mb-2 text-gray-700">概要</h4>
          <p className="text-sm text-gray-700 whitespace-pre-wrap">{book.userSummary}</p>
        </div>
      )}
    </div>
  );
};

export default UserBookDisplay;
