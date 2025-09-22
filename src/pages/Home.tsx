import React from 'react';
import BookCard from '../components/BookCard';
import { useAuth } from '../contexts/AuthContext';
import { newArrivalsData } from '../data/newArrivals';
import NewArrivalBookCard from '../components/NewArrivalBookCard';

// 星評価を表示するコンポーネント
const StarRating = ({ rating }: { rating: number }) => {
  const fullStars = Math.floor(rating);
  const halfStar = rating % 1 !== 0;
  const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);

  return (
    <div className="flex text-accent">
      {[...Array(fullStars)].map((_, i) => <span key={`full-${i}`}>★</span>)}
      {/* halfStar support can be added if needed */}
      {[...Array(emptyStars)].map((_, i) => <span key={`empty-${i}`} className="text-gray-300">★</span>)}
    </div>
  );
};


// 仮のダミーデータ
const dummyActivities = [
  {
    id: "1",
    user: { name: "読書家A", avatar: "https://dummyimage.com/40x40/ccc/000&text=A" },
    action: "「星を継ぐもの」を本棚に追加しました。",
    book: {
      id: "9784488663018",
      title: "星を継ぐもの",
      author: "ジェイムズ・P・ホーガン",
      isbn: "9784488663018",
    },
    summary: "月で発見された真紅の宇宙服を着た死体。その正体を探るうちに、人類の起源に関わる壮大な謎が明らかになる。",
    rating: 5,
    hashtags: ["SF", "ハードSF", "名作"],
    knowledgeTank: "月面で発見された死体「チャーリー」の謎が物語の中核。",
    knowledgeTags: ["ガニメデ", "ミネルヴァ", "ルナリアン"],
    timestamp: "2時間前"
  },
  {
    id: "2",
    user: { name: "SF好きB", avatar: "https://dummyimage.com/40x40/ccc/000&text=B" },
    action: "「ソラリス」を読み始めました。",
    book: {
      id: "9784150120009",
      title: "ソラリス",
      author: "スタニスワフ・レム",
      isbn: "9784150120009",
    },
    summary: "知性を持つ海に覆われた惑星ソラリス。調査基地の科学者たちが体験する不可解な現象と、人間の認識の限界を描く。",
    rating: 4,
    hashtags: ["SF", "哲学", "宇宙"],
    knowledgeTank: "惑星ソラリスの海が、訪問者の記憶から実体のある訪問者を作り出す。",
    knowledgeTags: ["クリス・ケルヴィン", "ハリー", "シミュラークル"],
    timestamp: "5時間前"
  },
];


const Home: React.FC = () => {
  const { user } = useAuth();

  return (
    <div className="container mx-auto">
      {/* ヒーローセクション */}
      <section className="text-center py-20">
        <h1 className="text-2xl md:text-4xl font-bold font-serif text-main mb-4">本棚で、自分を表現しよう。</h1>
        <p className="text-lg text-text-secondary mb-8">BookPlatformは、あなたの読書履歴を可視化し、新しいつながりを生むSNSです。</p>
        {!user && (
          <button className="bg-accent text-primary font-bold py-3 px-8 rounded-full hover:bg-opacity-80 transition-colors">
            7日間無料トライアル
          </button>
        )}
      </section>

      {/* 最近のアクティビティ */}
      {user && (
        <section className="mb-16">
          <h2 className="text-2xl font-bold font-serif text-main mb-6">最近のアクティビティ</h2>
          <div className="space-y-8">
            {dummyActivities.map(activity => (
              <div key={activity.id} className="card p-6">
                <div className="flex items-center space-x-3 mb-4">
                  <img src={activity.user.avatar} alt={activity.user.name} className="w-10 h-10 rounded-full" />
                  <div>
                    <p>
                      <span className="font-bold">{activity.user.name}</span>
                      <span className="text-text-secondary">が{activity.action}</span>
                    </p>
                    <span className="text-text-secondary text-sm">{activity.timestamp}</span>
                  </div>
                </div>

                <div className="flex flex-col md:flex-row items-start space-y-4 md:space-y-0 md:space-x-6">
                  {activity.book && (
                     <div className="w-full md:w-40 flex-shrink-0">
                      <BookCard
                        id={activity.book.id}
                        title={activity.book.title}
                        author={activity.book.author}
                        isbn={activity.book.isbn}
                      />
                    </div>
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
                        {activity.hashtags.map(tag => (
                          <span key={tag} className="bg-background text-main text-xs px-2 py-1 rounded-full border border-border">#{tag}</span>
                        ))}
                      </div>
                    </div>
                     <div className="mt-3">
                      <h4 className="font-bold font-serif text-main mb-1">ナレッジタンク</h4>
                      <p className="text-sm text-text-secondary bg-muted p-3 rounded-md">{activity.knowledgeTank}</p>
                    </div>
                    <div className="mt-3">
                      <h4 className="font-bold font-serif text-main mb-1">ナレッジタグ</h4>
                      <div className="flex flex-wrap gap-2">
                         {activity.knowledgeTags.map(tag => (
                          <span key={tag} className="bg-background text-main text-xs px-2 py-1 rounded-full border border-border">{tag}</span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* AIレコメンド */}
      <section>
        <h2 className="text-2xl font-bold font-serif text-main mb-6">あなたへのおすすめ</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-8">
          {/* Sample BookCards */}
          <BookCard id="sample1" title="書籍タイトル6" author="著者名6" imageUrl="https://dummyimage.com/150x220/e0e0e0/aaa.png&text=Sample" />
          <BookCard id="sample2" title="書籍タイトル7" author="著者名7" imageUrl="https://dummyimage.com/150x220/e0e0e0/aaa.png&text=Sample" />
          <BookCard id="sample3" title="書籍タイトル8" author="著者名8" imageUrl="https://dummyimage.com/150x220/e0e0e0/aaa.png&text=Sample" />
          <BookCard id="sample4" title="書籍タイトル9" author="著者名9" imageUrl="https://dummyimage.com/150x220/e0e0e0/aaa.png&text=Sample" />
          <BookCard id="sample5" title="書籍タイトル10" author="著者名10" imageUrl="https://dummyimage.com/150x220/e0e0e0/aaa.png&text=Sample" />
        </div>
      </section>

      {/* 新着情報 */}
      <section className="mt-16">
        <h2 className="text-2xl font-bold font-serif text-main mb-6">今月の新着 (2025年9月)</h2>
        <div className="space-y-8">
          {newArrivalsData.map(category => (
            <div key={category.name}>
              <h3 className="text-xl font-bold text-main mb-4">{category.name}</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-8">
                {category.books.map(book => (
                  <NewArrivalBookCard
                    key={book.id}
                    id={book.id}
                    title={book.title}
                    author={book.author}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Home;
