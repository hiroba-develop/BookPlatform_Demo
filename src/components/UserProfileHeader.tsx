import React from 'react';
import { UserProfile as UserProfileType } from '../types';
import { Link } from 'react-router-dom';

interface UserProfileHeaderProps {
  user: UserProfileType;
  isMyPage?: boolean;
}

const UserProfileHeader: React.FC<UserProfileHeaderProps> = ({ user, isMyPage = false }) => {
  return (
    <div className="md:flex items-center justify-between mb-8 pb-4 border-b">
      <div className="flex items-center mb-4 md:mb-0">
        <img src={user.avatarUrl} alt={user.name} className="w-16 h-16 md:w-20 md:h-20 rounded-full mr-4 md:mr-6" />
        <div>
          <h1 className="text-2xl md:text-3xl font-bold">{user.name}</h1>
          <div className="text-xs md:text-sm text-gray-600 flex flex-wrap gap-x-4 gap-y-1 mt-2">
            <span>投稿: {user.stats.posts}</span>
            <span>フォロワー: {user.stats.followers}</span>
            <span>フォロー中: {user.stats.following}</span>
            <span>総いいね: {user.stats.likes}</span>
          </div>
        </div>
      </div>
      {isMyPage ? (
        <Link to="/profile" className="bg-white border border-gray-300 text-text font-bold py-2 px-6 rounded-md hover:bg-muted text-sm w-full md:w-auto text-center">
          プロフィールを編集
        </Link>
      ) : (
        <button className="bg-accent text-white font-bold py-2 px-6 rounded-md hover:bg-opacity-80 w-full md:w-auto">
          フォローする
        </button>
      )}
    </div>
  );
};

export default UserProfileHeader;
