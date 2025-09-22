import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const Header: React.FC = () => {
  const { user, logout } = useAuth();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="bg-primary text-background shadow-lg border-b-2 border-accent">
      <nav className="container mx-auto px-6 py-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <Link to="/" className="text-2xl font-bold font-serif">BookPlatform</Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            <ul className="flex items-center space-x-8">
              {user && (
                <li>
                  <Link to="/my-bookshelf" className="hover:text-accent transition-colors">私の本棚</Link>
                </li>
              )}
              <li>
                <Link to="/browse" className="hover:text-accent transition-colors">本棚を覗く</Link>
              </li>
              <li>
                <Link to="/search" className="hover:text-accent transition-colors">検索</Link>
              </li>
              {user && (
                <li>
                  <Link to="/profile" className="hover:text-accent transition-colors">マイページ</Link>
                </li>
              )}
            </ul>
            <div className="flex items-center space-x-4">
              {user ? (
                <>
                  <span className="text-background">こんにちは、{user.name}さん</span>
                  <button onClick={logout} className="bg-accent text-primary font-bold px-4 py-2 rounded-md hover:bg-opacity-80 transition-colors">ログアウト</button>
                </>
              ) : (
                <>
                  <Link to="/login" className="bg-accent text-primary font-bold px-4 py-2 rounded-md hover:bg-opacity-80 transition-colors">ログイン</Link>
                  <Link to="/signup" className="bg-background text-primary font-bold px-4 py-2 rounded-md hover:bg-muted transition-colors">会員登録</Link>
                </>
              )}
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button onClick={() => setIsOpen(!isOpen)}>
              {isOpen ? (
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
                </svg>
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden mt-4">
            <ul className="flex flex-col space-y-4">
              {user && (
                <li>
                  <Link to="/my-bookshelf" className="hover:text-accent transition-colors block" onClick={() => setIsOpen(false)}>私の本棚</Link>
                </li>
              )}
              <li>
                <Link to="/browse" className="hover:text-accent transition-colors block" onClick={() => setIsOpen(false)}>本棚を覗く</Link>
              </li>
              <li>
                <Link to="/search" className="hover:text-accent transition-colors block" onClick={() => setIsOpen(false)}>検索</Link>
              </li>
              {user && (
                <li>
                  <Link to="/profile" className="hover:text-accent transition-colors block" onClick={() => setIsOpen(false)}>マイページ</Link>
                </li>
              )}
            </ul>
            <div className="mt-4 pt-4 border-t border-accent">
              {user ? (
                <div className="flex flex-col space-y-4">
                  <span className="text-background text-center">こんにちは、{user.name}さん</span>
                  <button onClick={() => { logout(); setIsOpen(false); }} className="bg-accent text-primary font-bold px-4 py-2 rounded-md hover:bg-opacity-80 transition-colors w-full">ログアウト</button>
                </div>
              ) : (
                <div className="flex flex-col space-y-4">
                  <Link to="/login" onClick={() => setIsOpen(false)} className="bg-accent text-primary text-center font-bold px-4 py-2 rounded-md hover:bg-opacity-80 transition-colors">ログイン</Link>
                  <Link to="/signup" onClick={() => setIsOpen(false)} className="bg-background text-primary text-center font-bold px-4 py-2 rounded-md hover:bg-muted transition-colors">会員登録</Link>
                </div>
              )}
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Header;
