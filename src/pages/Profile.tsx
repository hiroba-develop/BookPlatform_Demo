import React, { useState, useMemo } from 'react';
import { UserCircleIcon, BookOpenIcon, EyeIcon, StarIcon, BookmarkIcon } from '@heroicons/react/24/outline';
import { useBookshelf } from '../contexts/BookshelfContext';

const ToggleSwitch = ({ checked, onChange }: { checked: boolean, onChange: (checked: boolean) => void }) => (
  <button
    onClick={() => onChange(!checked)}
    className={`relative inline-flex flex-shrink-0 h-5 w-10 rounded-full transition-colors duration-200 ease-in-out focus:outline-none ${
      checked ? 'bg-primary' : 'bg-muted'
    }`}
  >
    <span
      className={`absolute top-1/2 -translate-y-1/2 inline-block w-3.5 h-3.5 transform bg-white rounded-full transition-transform duration-200 ease-in-out ${
        checked ? 'translate-x-[22px]' : 'translate-x-1'
      }`}
    />
  </button>
);


const Profile: React.FC = () => {
  const { bookshelves } = useBookshelf();
  const [name, setName] = useState('');
  const [bio, setBio] = useState('');
  const [privacySettings, setPrivacySettings] = useState({
    publicBookshelf: true,
    showAsRecommended: true,
    publicUnread: true,
  });

  const readingStats = useMemo(() => {
    const allBooks = bookshelves.flatMap(shelf => shelf.categories.flatMap(cat => cat.books));
    const registeredBooks = allBooks.length;
    const createdBookshelves = bookshelves.length;
    const categories = new Set(bookshelves.flatMap(shelf => shelf.categories.map(cat => cat.name)));
    
    return {
      registeredBooks,
      createdBookshelves,
      categoriesCount: categories.size,
      finished: allBooks.filter(b => b.status === '読了').length,
      reading: allBooks.filter(b => b.status === '読書中').length,
      unread: allBooks.filter(b => b.status === '積読').length,
    };
  }, [bookshelves]);

  return (
    <div className="container mx-auto max-w-4xl py-8">
      <h1 className="text-3xl font-bold mb-8">マイページ</h1>
      
      {/* プロフィール情報 */}
      <div className="mb-8">
        <div className="bg-white p-6 sm:p-8 rounded-xl shadow-sm border border-gray-200">
          <h2 className="text-xl font-bold mb-4">プロフィール情報</h2>
          <div className="space-y-4">
            <div>
                  <label className="block text-sm font-medium text-gray-600 mb-1">お名前</label>
                  <input type="text" value={name} onChange={e => setName(e.target.value)} placeholder="名前を入力してください（匿名可）" className="w-full p-2 border border-gray-300 rounded-md focus:ring-primary focus:border-primary" />
                  <p className="text-xs text-text-secondary mt-1">匿名での利用も可能です</p>
              </div>
              <div>
                  <label className="block text-sm font-medium text-gray-600 mb-1">自己紹介</label>
                  <textarea value={bio} onChange={e => setBio(e.target.value)} placeholder="簡単な自己紹介を入力してください" rows={4} className="w-full p-2 border border-gray-300 rounded-md focus:ring-primary focus:border-primary"></textarea>
                  <p className="text-xs text-text-secondary mt-1">読書の好みや興味のあるジャンルなどを書いてみてください</p>
              </div>
          </div>
        </div>
      </div>

      {/* 登録情報 */}
      <div className="mb-8">
        <div className="bg-white p-6 sm:p-8 rounded-xl shadow-sm border border-gray-200">
          <h2 className="text-xl font-bold mb-4">登録情報</h2>
          <form>
            <div className="space-y-4">
              <div>
                  <label className="block text-sm font-medium text-gray-600 mb-1">お名前</label>
                  <input type="text" value={name} onChange={e => setName(e.target.value)} placeholder="名前を入力してください（匿名可）" className="w-full p-2 border border-gray-300 rounded-md focus:ring-primary focus:border-primary" />
                  <p className="text-xs text-text-secondary mt-1">匿名での利用も可能です</p>
              </div>
              <div>
                  <label className="block text-sm font-medium text-gray-600 mb-1">自己紹介</label>
                  <textarea value={bio} onChange={e => setBio(e.target.value)} placeholder="簡単な自己紹介を入力してください" rows={4} className="w-full p-2 border border-gray-300 rounded-md focus:ring-primary focus:border-primary"></textarea>
                  <p className="text-xs text-text-secondary mt-1">読書の好みや興味のあるジャンルなどを書いてみてください</p>
              </div>
            </div>
          </form>
        </div>
      </div>

      {/* 設定 */}
      <div className="mb-8">
        <div className="bg-white p-6 sm:p-8 rounded-xl shadow-sm border border-gray-200">
          <h2 className="text-xl font-bold mb-4">設定</h2>
          <div className="space-y-4">
            <div>
                  <label className="block text-sm font-medium text-gray-600 mb-1">お名前</label>
                  <input type="text" value={name} onChange={e => setName(e.target.value)} placeholder="名前を入力してください（匿名可）" className="w-full p-2 border border-gray-300 rounded-md focus:ring-primary focus:border-primary" />
                  <p className="text-xs text-text-secondary mt-1">匿名での利用も可能です</p>
              </div>
              <div>
                  <label className="block text-sm font-medium text-gray-600 mb-1">自己紹介</label>
                  <textarea value={bio} onChange={e => setBio(e.target.value)} placeholder="簡単な自己紹介を入力してください" rows={4} className="w-full p-2 border border-gray-300 rounded-md focus:ring-primary focus:border-primary"></textarea>
                  <p className="text-xs text-text-secondary mt-1">読書の好みや興味のあるジャンルなどを書いてみてください</p>
              </div>
          </div>
        </div>
      </div>

      {/* Reading Statistics */}
      <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-200 mb-8">
        <h2 className="text-xl font-bold flex items-center mb-6 text-text">
          <BookOpenIcon className="w-6 h-6 mr-3 text-gray-400" />
          読書統計
        </h2>
        <div className="grid grid-cols-3 gap-4 text-center mb-6">
            <div>
                <p className="text-3xl font-bold text-primary">{readingStats.registeredBooks}</p>
                <p className="text-sm text-text-secondary">登録した本</p>
            </div>
            <div>
                <p className="text-3xl font-bold text-primary">{readingStats.createdBookshelves}</p>
                <p className="text-sm text-text-secondary">作成した本棚</p>
            </div>
            <div>
                <p className="text-3xl font-bold text-primary">{readingStats.categoriesCount}</p>
                <p className="text-sm text-text-secondary">カテゴリ数</p>
            </div>
        </div>
        <h3 className="text-center text-sm font-semibold text-text mb-2">読書進捗</h3>
        <div className="grid grid-cols-3 gap-4 text-center">
            <div className="bg-muted p-4 rounded-lg">
                <p className="text-2xl font-bold text-primary">{readingStats.finished}</p>
                <p className="text-xs text-text-secondary">読了</p>
            </div>
            <div className="bg-muted p-4 rounded-lg">
                <p className="text-2xl font-bold text-primary">{readingStats.reading}</p>
                <p className="text-xs text-text-secondary">読書中</p>
            </div>
            <div className="bg-muted p-4 rounded-lg">
                <p className="text-2xl font-bold text-primary">{readingStats.unread}</p>
                <p className="text-xs text-text-secondary">積読</p>
            </div>
        </div>
      </div>

      {/* Privacy Settings */}
      <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-200">
        <h2 className="text-xl font-bold flex items-center mb-6 text-text">
          <UserCircleIcon className="w-6 h-6 mr-3 text-gray-400" />
          プライバシー設定
        </h2>
         <p className="text-sm text-text-secondary mb-6 -mt-4 ml-9">他のユーザーからの検索・閲覧に関する設定を管理できます</p>
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div className="max-w-[80%]">
                    <h3 className="font-semibold flex items-center"><EyeIcon className="w-5 h-5 mr-2 text-gray-400" />本棚を他のユーザーに公開する</h3>
                    <p className="text-sm text-text-secondary">あなたの本棚は「本棚を覗く」で他のユーザーから検索・閲覧できます</p>
                </div>
                <ToggleSwitch checked={privacySettings.publicBookshelf} onChange={val => setPrivacySettings(p => ({...p, publicBookshelf: val}))} />
            </div>
            <div className="flex items-center justify-between">
                <div className="max-w-[80%]">
                    <h3 className="font-semibold flex items-center"><StarIcon className="w-5 h-5 mr-2 text-gray-400" />おすすめユーザーとして表示する</h3>
                    <p className="text-sm text-text-secondary">あなたの本棚が「本棚を覗く」のおすすめユーザーに表示される可能性があります</p>
                </div>
                 <ToggleSwitch checked={privacySettings.showAsRecommended} onChange={val => setPrivacySettings(p => ({...p, showAsRecommended: val}))} />
            </div>
            <div className="flex items-center justify-between">
                <div className="max-w-[80%]">
                    <h3 className="font-semibold flex items-center"><BookmarkIcon className="w-5 h-5 mr-2 text-gray-400" />積読棚を公開する</h3>
                    <p className="text-sm text-text-secondary">あなたの積読棚が他のユーザーから閲覧できます</p>
                </div>
                 <ToggleSwitch checked={privacySettings.publicUnread} onChange={val => setPrivacySettings(p => ({...p, publicUnread: val}))} />
            </div>
        </div>
      </div>

      <div className="text-center mt-8">
        <button className="bg-primary text-white font-bold py-3 px-12 rounded-lg hover:bg-opacity-80 transition-colors">
          プロフィールを保存
        </button>
      </div>
    </div>
  );
};

export default Profile;
