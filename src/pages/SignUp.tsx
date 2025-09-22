import React from 'react';
import { Link } from 'react-router-dom';

const SignUp: React.FC = () => {
  const interestTags = ["ビジネス", "小説", "漫画", "テクノロジー", "歴史", "自己啓発", "サイエンス", "趣味"];

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="max-w-4xl w-full bg-white rounded-lg shadow-xl p-6 sm:p-8">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">会員登録</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* 左側：入力フォーム */}
          <div>
            <form className="space-y-6">
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
                  ユーザー名
                </label>
                <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="username" type="text" placeholder="Username" />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                  メールアドレス
                </label>
                <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="email" type="email" placeholder="Email" />
              </div>
              <div className="mb-6">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                  パスワード
                </label>
                <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" id="password" type="password" placeholder="******************" />
              </div>
               <div className="flex items-center justify-between">
                <button className="bg-accent hover:bg-opacity-80 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full" type="button">
                  登録する
                </button>
              </div>
            </form>
            <p className="text-center text-gray-500 text-xs mt-4">
              アカウントをお持ちですか？ <Link to="/login" className="text-accent hover:underline">ログイン</Link>
            </p>
          </div>

          {/* 右側：興味のタグ */}
          <div>
            <h2 className="text-lg font-bold text-sub-2 mb-4">興味のあるタグを選択</h2>
            <div className="flex flex-wrap gap-2">
              {interestTags.map(tag => (
                <button key={tag} className="bg-gray-200 text-gray-700 px-3 py-1 rounded-full text-sm hover:bg-accent hover:text-white focus:bg-accent focus:text-white">
                  {tag}
                </button>
              ))}
            </div>
            <p className="text-xs text-gray-500 mt-4">選択したタグに基づいて、AIがおすすめの書籍を提案します。</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
