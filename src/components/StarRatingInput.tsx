import React, { useState } from 'react';
import { StarIcon } from '@heroicons/react/24/solid';

interface StarRatingInputProps {
  label: string;
  rating: number;
  onRatingChange: (rating: number) => void;
}

const StarRatingInput: React.FC<StarRatingInputProps> = ({ label, rating, onRatingChange }) => {
  const [hoverRating, setHoverRating] = useState(0);

  const handleClick = (rate: number) => {
    onRatingChange(rating === rate ? 0 : rate);
  };

  return (
    <div className="flex items-center mb-2">
      <span className="w-20 text-sm">{label}</span>
      {[1, 2, 3, 4, 5].map((star) => (
        <div
          key={star}
          className="relative cursor-pointer"
          onMouseLeave={() => setHoverRating(0)}
        >
          <div
            className="absolute w-full h-full left-0 top-0 z-10"
          >
            <div 
              className="absolute w-1/2 h-full left-0 top-0"
              onMouseEnter={() => setHoverRating(star - 0.5)}
              onClick={(e) => { e.stopPropagation(); handleClick(star - 0.5); }}
            />
            <div 
              className="absolute w-1/2 h-full right-0 top-0"
              onMouseEnter={() => setHoverRating(star)}
              onClick={(e) => { e.stopPropagation(); handleClick(star); }}
            />
          </div>
          <StarIcon
            className="w-8 h-8 text-gray-300"
          />
          <div
            className="absolute top-0 left-0 h-full overflow-hidden"
            style={{ width: `${((hoverRating >= star) || (rating >= star)) ? 100 : ((hoverRating >= star - 0.5) || (rating >= star - 0.5)) ? 50 : 0}%` }}
          >
            <StarIcon className="w-8 h-8 text-yellow-400" />
          </div>
        </div>
      ))}
    </div>
  );
};

export default StarRatingInput;
