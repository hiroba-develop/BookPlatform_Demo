import React from 'react';
import { useNavigate } from 'react-router-dom';
import BookCard from './BookCard';
import StarRating from './StarRating';
import type { Activity } from '../pages/Home';

interface ActivityCardProps {
  activity: Activity;
}

const ActivityCard: React.FC<ActivityCardProps> = ({ activity }) => {
  const navigate = useNavigate();

  const handleUserClick = (userId: string) => {
    navigate(`/users/${userId}`);
  };

  const handleTagClick = (tag: string) => {
    navigate(`/search?q=${encodeURIComponent(tag)}`);
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 border border-border">
      <div className="flex items-center space-x-3 mb-4">
        <img src={activity.user.avatar} alt={activity.user.name} className="w-10 h-10 rounded-full" />
        <div>
          <p className="text-sm">
            <span className="font-bold cursor-pointer" onClick={() => handleUserClick(activity.user.id)}>
              {activity.user.name}
            </span>
            <span className="text-text-secondary">{activity.action}</span>
          </p>
          <span className="text-text-secondary text-xs">{activity.timestamp}</span>
        </div>
      </div>

      <div className="flex flex-col md:flex-row items-start space-y-4 md:space-y-0 md:space-x-6">
        {activity.book && (
          <a
            href={`https://www.amazon.co.jp/s?k=${activity.book.isbn}`}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full md:w-40 flex-shrink-0 cursor-pointer hover:opacity-80 transition-opacity"
          >
            <BookCard
              id={activity.book.id}
              title={activity.book.title}
              author={activity.book.author}
              isbn={activity.book.isbn}
              userCoverImage={activity.book.userCoverImage}
            />
          </a>
        )}
        <div className="flex-1">
          <div>
            <h4 className="font-bold font-serif text-main mb-1">サマリー</h4>
            <p className="text-sm text-text-secondary bg-muted p-3 rounded-md">{activity.summary}</p>
          </div>
          <div className="mt-3">
            <h4 className="font-bold font-serif text-main mb-1">評価</h4>
            <StarRating rating={activity.rating} />
          </div>
          <div className="mt-3">
            <h4 className="font-bold font-serif text-main mb-1">ハッシュタグ</h4>
            <div className="flex flex-wrap gap-2">
              {activity.hashtags.map((tag) => (
                <span
                  key={tag}
                  className="bg-background text-main text-xs px-2 py-1 rounded-full border border-border cursor-pointer hover:bg-accent hover:text-primary transition-colors"
                  onClick={() => handleTagClick(tag)}
                >
                  #{tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ActivityCard;
