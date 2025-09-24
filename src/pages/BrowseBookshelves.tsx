import React from 'react';
import { Link } from 'react-router-dom';
import { mockUsers } from '../data/mockUsers';
import { useHashtagClick } from '../hooks/useHashtagClick';

const BrowseBookshelves: React.FC = () => {
  const otherUsers = mockUsers.filter(user => user.id !== 'demo-user-id');
  const { handleHashtagClick } = useHashtagClick();

  return (
    <div className="container mx-auto">
      <h1 className="text-3xl font-bold mb-8 text-center">本棚を覗く</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {otherUsers.map(user => {
          const allTags = user.bookshelves.flatMap(shelf => shelf.tags);
          const uniqueTags = [...new Map(allTags.map(tag => [tag.id, tag])).values()];

          return (
            <div key={user.id} className="bg-white rounded-lg shadow-lg p-6 flex flex-col h-full">
              <div className="flex items-center mb-4">
                <img src={user.avatarUrl} alt={user.name} className="w-16 h-16 rounded-full mr-4" />
                <div>
                  <h2 className="text-xl font-bold">{user.name}</h2>
                  <div className="text-xs text-gray-500 flex space-x-2 mt-1">
                    <span>投稿: {user.stats.posts}</span>
                    <span>フォロワー: {user.stats.followers}</span>
                    <span>フォロー中: {user.stats.following}</span>
                  </div>
                </div>
              </div>

              <p className="text-sm text-gray-700 mb-4 flex-grow">
                {user.bio}
              </p>

              <div className="mb-4">
                <h3 className="text-sm font-semibold mb-2 text-gray-600">本棚のカテゴリ</h3>
                <div className="flex flex-wrap gap-2">
                  {uniqueTags.slice(0, 5).map(tag => (
                    <span 
                      key={tag.id} 
                      className="bg-gray-200 text-gray-800 px-2 py-1 text-xs rounded-full cursor-pointer hover:bg-gray-300 transition-colors"
                      onClick={() => handleHashtagClick(tag.name)}
                    >
                      #{tag.name}
                    </span>
                  ))}
                </div>
              </div>
              
              <Link to={`/users/${user.id}`} className="mt-auto w-full bg-accent text-white text-center font-bold py-2 px-4 rounded-md hover:bg-opacity-80 transition-colors">
                本棚を覗く
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default BrowseBookshelves;
