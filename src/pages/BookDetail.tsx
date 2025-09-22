import React from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { StarIcon } from '@heroicons/react/24/solid';
import { UserCircleIcon } from '@heroicons/react/24/outline';
import useBookById from '../hooks/useBookById';

const BookDetail: React.FC = () => {
  const { '*': id } = useParams<{ '*': string }>();
  const location = useLocation();
  const passedBook = location.state?.book;

  const { book: fetchedBook, loading, error } = useBookById(passedBook ? undefined : id);
  const book = passedBook || fetchedBook;

  // Dummy data for summaries and purchase links, as they are not in the API response
  const staticData = {
    summaries: [
      { id: 1, user: "佐藤", rating: 4.5, summary: "非常に示唆に富む内容で、特にリーダーシップについて深く考えさせられました。何度でも読み返したい一冊です。" },
      { id: 2, user: "鈴木", rating: 4.2, summary: "逆境に屈しない精神力に感動しました。現代社会で生きる我々にも通じる教訓が多く含まれています。" },
      { id: 3, user: "高橋", rating: 4.0, summary: "翻訳も素晴らしく、原文の持つ力を損なうことなく伝えてくれます。歴史的な背景を知らなくても楽しめます。" },
    ],
    purchaseLinks: [
        { name: "Amazon", url: "#", logo: "/amazon_logo.svg" },
        { name: "e-hon", url: "#", logo: "/ehon_logo.svg" },
        { name: "楽天", url: "#", logo: "/rakuten_logo.svg" },
        { name: "Honya Club", url: "#", logo: "/honya_club_logo.svg" },
    ],
    tags: ["自己啓発・マインド", "リーダーシップ・マネジメント", "リベラルアーツ"],
    rating: 3.7,
    ratings: {
      comprehensibility: 4,
      practicality: 3,
    },
  };

  const renderStars = (rating: number, maxStars = 5) => {
    const fullStars = Math.floor(rating);
    const halfStar = rating % 1 !== 0;
    const emptyStars = maxStars - fullStars - (halfStar ? 1 : 0);
    
    return (
        <div className="flex items-center">
            {[...Array(fullStars)].map((_, i) => <StarIcon key={`full-${i}`} className="h-5 w-5 text-yellow-400" />)}
            {halfStar && <StarIcon key="half" className="h-5 w-5 text-yellow-400" style={{ clipPath: 'polygon(0 0, 50% 0, 50% 100%, 0 100%)' }} />}
            {[...Array(emptyStars)].map((_, i) => <StarIcon key={`empty-${i}`} className="h-5 w-5 text-gray-300" />)}
        </div>
    );
  };

  if (loading) {
    return <div className="container mx-auto p-4 sm:p-8 text-center">読み込み中...</div>;
  }

  if (error) {
    return <div className="container mx-auto p-4 sm:p-8 text-center text-red-500">{error}</div>;
  }

  if (!book) {
    return <div className="container mx-auto p-4 sm:p-8 text-center">書籍が見つかりませんでした。</div>;
  }

  return (
    <div className="container mx-auto bg-gray-50">
      <div className="flex flex-col lg:flex-row gap-12">

        {/* Left Column */}
        <div className="lg:w-1/3 flex flex-col items-center">
          <img src={book.imageUrl} alt={book.title} className="w-full max-w-xs rounded-lg shadow-2xl mb-8" />
          
          <div className="space-y-4 w-full max-w-xs">
            {staticData.summaries.map(s => (
              <div key={s.id} className="flex items-center gap-4">
                <UserCircleIcon className="h-16 w-16 text-gray-400"/>
                <div className="text-sm">
                  <div className="flex items-center gap-2 p-2 bg-blue-500 text-white rounded-md">
                    <span>総合</span>
                    {renderStars(s.rating)}
                  </div>
                  <button className="mt-1 w-full text-center p-2 bg-gray-200 rounded-md hover:bg-gray-300">本棚を覗く</button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column */}
        <div className="lg:w-2/3">

          {/* Book Info */}
          <div className="border-b pb-6 mb-6">
            <h1 className="text-3xl font-bold mb-4">{book.title}</h1>
            <div className="flex flex-wrap gap-2 mb-4">
              <span className="font-bold bg-blue-500 text-white px-3 py-1 text-sm rounded">タグ</span>
              {staticData.tags.map(tag => (
                  <span key={tag} className="bg-gray-200 text-gray-800 px-3 py-1 text-sm rounded">{tag}</span>
              ))}
            </div>
            <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm text-gray-700">
                <div className="font-bold">著者</div><div>{book.author}</div>
                <div className="font-bold">出版社</div><div>{book.publisher}</div>
                <div className="font-bold">出版日</div><div>{book.pubDate}</div>
            </div>
          </div>

          {/* Rating */}
          <div className="border-b pb-6 mb-6">
            <h3 className="font-bold text-gray-700 mb-2">評点</h3>
            <div className="flex items-center gap-6">
                <div className="flex items-center gap-2">
                    <span className="font-bold">総合</span>
                    <span className="text-2xl font-bold">{staticData.rating}</span>
                    {renderStars(staticData.rating)}
                </div>
                <div className="flex items-center gap-2 p-2 bg-blue-100 rounded-md">
                    <span className="font-bold text-blue-800">わかりやすさ</span>
                    {renderStars(staticData.ratings.comprehensibility)}
                </div>
                <div className="flex items-center gap-2 p-2 bg-blue-100 rounded-md">
                    <span className="font-bold text-blue-800">実用性</span>
                    {renderStars(staticData.ratings.practicality)}
                </div>
            </div>
          </div>

          {/* Purchase Links */}
          <div className="bg-blue-500/80 p-4 rounded-lg mb-8">
            <h3 className="text-white font-bold text-center mb-4">本の購入はこちら</h3>
            <div className="flex justify-center items-center gap-4">
                {staticData.purchaseLinks.map(link => (
                    <a key={link.name} href={link.url} target="_blank" rel="noopener noreferrer" className="bg-white p-2 rounded-md hover:opacity-80">
                        <img src={link.logo} alt={link.name} className="h-6"/>
                    </a>
                ))}
            </div>
          </div>

          {/* Summaries */}
          <div>
            <h2 className="text-xl font-bold text-gray-800 mb-2">本のサマリー <span className="text-red-500 text-sm font-normal">※表示は、総合点の高い上位5名</span></h2>
            <div className="space-y-4">
              {staticData.summaries.map(s => (
                <div key={s.id} className="p-4 border border-yellow-400 bg-yellow-50 rounded-lg">
                  <p>{s.summary}</p>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default BookDetail;
