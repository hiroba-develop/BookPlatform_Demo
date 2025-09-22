import React from 'react';
import BookCard from './BookCard';

interface RecommendationBookCardProps {
  id: string;
  title: string;
  author: string;
  isbn: string;
  imageUrl: string;
}

const RecommendationBookCard: React.FC<RecommendationBookCardProps> = ({ 
  id, 
  title, 
  author, 
  isbn, 
  imageUrl 
}) => {
  const amazonUrl = `https://www.amazon.co.jp/s?k=${encodeURIComponent(title)}+${encodeURIComponent(author)}`;

  return (
    <a href={amazonUrl} target="_blank" rel="noopener noreferrer">
      <BookCard 
        id={id} 
        title={title} 
        author={author} 
        isbn={isbn}
        imageUrl={imageUrl} 
      />
    </a>
  );
};

export default RecommendationBookCard;
