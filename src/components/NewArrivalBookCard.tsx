import React, { useState, useEffect } from 'react';
import BookCard from './BookCard';

interface NewArrivalBookCardProps {
  id: string;
  title: string;
  author: string;
}

const NewArrivalBookCard: React.FC<NewArrivalBookCardProps> = ({ id, title, author }) => {
  const [imageUrl, setImageUrl] = useState<string | undefined>(undefined);
  const amazonUrl = `https://www.amazon.co.jp/s?k=${encodeURIComponent(title)}+${encodeURIComponent(author)}`;

  useEffect(() => {
    const fetchBookCover = async () => {
      try {
        const query = `intitle:${encodeURIComponent(title)}+inauthor:${encodeURIComponent(author)}`;
        const response = await fetch(`https://www.googleapis.com/books/v1/volumes?q=${query}&maxResults=1`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        if (data.items && data.items.length > 0) {
          const coverUrl = data.items[0].volumeInfo.imageLinks?.thumbnail;
          if (coverUrl) {
            setImageUrl(coverUrl.replace(/^http:/, 'https:'));
          }
        }
      } catch (error) {
        console.error("書影の取得に失敗しました:", error);
      }
    };

    fetchBookCover();
  }, [title, author]);

  const finalImageUrl = imageUrl || `https://dummyimage.com/150x220/e0e0e0/aaa.png&text=${encodeURIComponent(title.substring(0, 10))}`;

  return (
    <a href={amazonUrl} target="_blank" rel="noopener noreferrer">
      <BookCard id={id} title={title} author={author} imageUrl={finalImageUrl} />
    </a>
  );
};

export default NewArrivalBookCard;
