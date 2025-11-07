import React from 'react';
import BookCard from './BookCard';

interface NewArrivalBookCardProps {
  id: string;
  title: string;
  author: string;
  isbn: string;
}

const NewArrivalBookCard: React.FC<NewArrivalBookCardProps> = ({ id, title, author, isbn }) => {
  const amazonUrl = `https://www.amazon.co.jp/s?k=${encodeURIComponent(title)}+${encodeURIComponent(author)}`;

  return (
    <a href={amazonUrl} target="_blank" rel="noopener noreferrer">
      <BookCard id={id} title={title} author={author} isbn={isbn} />
    </a>
  );
};

export default NewArrivalBookCard;
