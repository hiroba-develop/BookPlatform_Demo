import React from 'react';
import { useParams } from 'react-router-dom';
import { mockUsers } from '../data/mockUsers';
import BookCard from '../components/BookCard';

const TagSearch: React.FC = () => {
  const { tag } = useParams<{ tag: string }>();

  if (!tag) {
    return (
      <div className="container mx-auto">
        <h1 className="text-3xl font-bold mb-2">タグ検索</h1>
        <p className="text-center text-gray-500">タグが指定されていません。</p>
      </div>
    );
  }

  // Find all books with the given tag
  const taggedBooks = mockUsers.flatMap(user => 
    user.bookshelves.flatMap(shelf =>
      shelf.categories.flatMap(category =>
        category.books.filter(book =>
          book.userTags?.some(t => t.name.toLowerCase().includes(tag.toLowerCase()))
        )
      )
    )
  );

  return (
    <div className="container mx-auto">
      <h1 className="text-3xl font-bold mb-2">
        タグ検索: <span className="text-accent">#{tag}</span>
      </h1>
      <p className="text-center text-gray-500 mb-8">{taggedBooks.length}件のブックが見つかりました</p>

      {taggedBooks.length > 0 ? (
          <div className="space-y-6">
            {taggedBooks.map((book, index) => (
              <BookCard 
                key={`${book.id}-${index}`} 
                id={book.id}
                isbn={book.isbn}
                title={book.title}
                author={book.author}
                tags={book.userTags}
                imageUrl={book.imageUrl}
                userCoverImage={book.userCoverImage}
              />
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-500">検索結果が見つかりませんでした。</p>
        )}
    </div>
  );
};

export default TagSearch;
