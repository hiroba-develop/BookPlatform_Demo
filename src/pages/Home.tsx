import React from 'react';
import { useNavigate } from 'react-router-dom';
import BookCard from '../components/BookCard';
import { useAuth } from '../contexts/AuthContext';
import { newArrivalsData } from '../data/newArrivals';
import { recommendationBooks } from '../data/recommendations';
import NewArrivalBookCard from '../components/NewArrivalBookCard';
import RecommendationBookCard from '../components/RecommendationBookCard';

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
    user: { id: "user-2", name: "読書家A", avatar: "https://dummyimage.com/40x40/ccc/000&text=A" },
    action: "「組織論のエッセンス」を本棚に追加しました。",
    book: {
      id: "9784495390792",
      title: "組織論のエッセンス",
      author: "Mary Jo Hatch",
      isbn: "9784495390792",
    },
    summary: "組織について初めて学ぶ人、組織の「組織化（organizing）」という視点を含めて、組織の理論と現実を結びつけて考えたい人におススメ",
    rating: 4,
    hashtags: ["組織論", "組織マネジメント"],
    knowledgeTank: "理論と実践を結びつける：「組織とは何か」「組織化とは何か」という抽象的な問いを、自分の組織体験（職場・学校・プロジェクトなど）に当てはめて考えると理解が深まる。",
    knowledgeTags: ["理論と実践", "組織化", "組織体験"],
    timestamp: "2時間前"
  },
  {
    id: "2",
    user: { id: "user-3", name: "技術好きB", avatar: "https://dummyimage.com/100x100/cccccc/888.png&text=UserB" },
    action: "「リーダブルコード」を読み始めました。",
    book: {
      id: "9784873115658",
      title: "リーダブルコード",
      author: "Dustin Boswell, Trevor Foucher",
      isbn: "9784873115658",
    },
    summary: "エンジニアなら誰もが読むべき。コードの可読性がいかに重要か、具体的なテクニックと共に学べます。",
    rating: 5,
    hashtags: ["コーディング", "可読性"],
    knowledgeTank: "エンジニアなら誰もが読むべき。コードの可読性がいかに重要か、具体的なテクニックと共に学べます。",
    knowledgeTags: ["命名規則", "コードフォーマット", "コメントの書き方"],
    timestamp: "5時間前"
  },
];


const Home: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleUserClick = (userId: string) => {
    navigate(`/users/${userId}`);
  };

  const handleTagClick = (tag: string) => {
    navigate(`/search?q=${encodeURIComponent(tag)}`);
  };

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
                     <div 
                       className="w-full md:w-40 flex-shrink-0 cursor-pointer hover:opacity-80 transition-opacity"
                       onClick={() => handleUserClick(activity.user.id)}
                     >
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
                     <div className="mt-3">
                      <h4 className="font-bold font-serif text-main mb-1">ナレッジタンク</h4>
                      <p className="text-sm text-text-secondary bg-muted p-3 rounded-md">{activity.knowledgeTank}</p>
                    </div>
                    <div className="mt-3">
                      <h4 className="font-bold font-serif text-main mb-1">ナレッジタグ</h4>
                      <div className="flex flex-wrap gap-2">
                         {activity.knowledgeTags.map(tag => (
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
            ))}
          </div>
        </section>
      )}

      {/* AIレコメンド */}
      <section>
        <h2 className="text-2xl font-bold font-serif text-main mb-6">あなたへのおすすめ</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-8">
          {recommendationBooks.map(book => (
            <RecommendationBookCard
              key={book.id}
              id={book.id}
              title={book.title}
              author={book.author}
              isbn={book.isbn}
              imageUrl={book.imageUrl}
            />
          ))}
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
