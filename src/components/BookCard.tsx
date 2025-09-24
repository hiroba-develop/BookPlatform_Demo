import React, { useState, useEffect, useMemo } from 'react';
import type { UserBook, Tag } from '../types';
import { useHashtagClick } from '../hooks/useHashtagClick';

interface BookCardProps {
  id: string;
  isbn?: string;
  title: string;
  author: string;
  tags?: Tag[];
  imageUrl?: string;
  bookState?: UserBook;
}

const convertIsbn10To13 = (isbn10: string): string => {
  const clean = isbn10.replace(/[-\s]/g, '');
  if (clean.length !== 10) return clean;
  const base = '978' + clean.slice(0, 9);
  let sum = 0;
  for (let i = 0; i < 12; i++) {
    const n = parseInt(base[i], 10);
    sum += i % 2 === 0 ? n : n * 3;
  }
  const check = (10 - (sum % 10)) % 10;
  return base + String(check);
};

const normalizeIsbn13 = (raw?: string): string | undefined => {
  if (!raw) return undefined;
  const clean = raw.replace(/[-\s]/g, '');
  if (clean.length === 13) return clean;
  if (clean.length === 10) return convertIsbn10To13(clean);
  return undefined;
};

const BookCard: React.FC<BookCardProps> = ({ id, isbn, title, author, tags, imageUrl }) => {
  const { handleHashtagClick } = useHashtagClick();
  const fallbackImageUrl = 'https://dummyimage.com/150x220/e0e0e0/aaa.png&text=No+Image';

  const normalizedIsbn13 = useMemo(() => normalizeIsbn13(isbn), [isbn]);

  const candidates = useMemo(() => {
    const list: string[] = [];
    // 1) NDL thumbnail
    if (normalizedIsbn13) {
      list.push(`https://ndlsearch.ndl.go.jp/thumbnail/${normalizedIsbn13}.jpg`);
    }
    // 2) Provided imageUrl prop
    if (imageUrl) list.push(imageUrl);
    // 3) Placeholder last
    list.push(fallbackImageUrl);
    return list;
  }, [normalizedIsbn13, imageUrl]);

  const [index, setIndex] = useState(0);
  const [currentImageUrl, setCurrentImageUrl] = useState<string>(candidates[0] || fallbackImageUrl);

  useEffect(() => {
    setIndex(0);
    setCurrentImageUrl(candidates[0] || fallbackImageUrl);
  }, [id, normalizedIsbn13, imageUrl, title]);

  const handleImageError = () => {
    if (index < candidates.length - 1) {
      const next = index + 1;
      setIndex(next);
      setCurrentImageUrl(candidates[next]);
    } else if (currentImageUrl !== fallbackImageUrl) {
      setCurrentImageUrl(fallbackImageUrl);
    }
  };

  const truncatedTitle = title.length > 15 ? title.substring(0, 15) + '…' : title;

  return (
    <div className="bg-muted rounded-lg shadow-lg overflow-hidden flex flex-col h-full group border border-border transition-all duration-300 hover:shadow-xl">
      <div className="relative w-full h-60 bg-background p-2">
        <img 
          src={currentImageUrl} 
          alt={title} 
          className="w-full h-full object-contain" 
          onError={handleImageError}
        />
        <div className="absolute inset-0 bg-primary bg-opacity-70 flex items-center justify-center p-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <p className="text-background text-center text-sm font-serif">{title}</p>
        </div>
      </div>
      <div className="p-3 flex flex-col flex-grow">
        <h3 className="text-md font-bold font-serif text-main truncate" title={title}>
          {truncatedTitle}
        </h3>
        <p className="text-sm text-text-secondary mt-1 truncate" title={author}>
          {author}
        </p>
        {tags && tags.length > 0 && (
          <div className="mt-2 flex flex-wrap items-center gap-1">
            {tags.slice(0, 2).map((tag, index) => (
              <span 
                key={tag.id} 
                className={`text-xs bg-background text-main px-2 py-0.5 rounded-full truncate cursor-pointer hover:bg-gray-200 transition-colors ${index === 0 ? 'max-w-[calc(100%-3rem)]' : ''}`}
                onClick={() => handleHashtagClick(tag.name)}
              >
                #{tag.name}
              </span>
            ))}
            {tags.length > 2 && (
              <span className="text-xs text-text-secondary font-bold ml-1">
                +{tags.length - 2}
              </span>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default BookCard;

