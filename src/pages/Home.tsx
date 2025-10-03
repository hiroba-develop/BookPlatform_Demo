import React from 'react';
import { useNavigate } from 'react-router-dom';
import BookCard from '../components/BookCard';
import { useAuth } from '../contexts/AuthContext';
import { newArrivalsData } from '../data/newArrivals';
import { recommendationBooks } from '../data/recommendations';
import NewArrivalBookCard from '../components/NewArrivalBookCard';
import RecommendationBookCard from '../components/RecommendationBookCard';
import libraryImageUrl from '../assets/BookDesign.png';

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
      userCoverImage: undefined,
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
      userCoverImage: undefined,
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
      <section 
        className="relative text-center h-[50vh] md:h-[60vh] lg:h-[70vh] text-white bg-cover bg-center bg-no-repeat bg-white"
        style={{ backgroundImage: `url(${libraryImageUrl})` }}
      >
      </section>
      
      {!user && (
        <div className="text-center py-8">
          <button
            onClick={() => navigate('/signup')}
            className="bg-accent text-primary font-bold py-3 px-8 rounded-full hover:bg-opacity-80 transition-transform transform hover:scale-105"
          >
            3か月間（90日間）無料トライアル
          </button>
        </div>
      )}

      {/* 最近のアクティビティ */}
      {user && (
        <section className="mb-16 mt-16">
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
                        userCoverImage={activity.book.userCoverImage}
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
      {user && (
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
      )}

      {!user && (
        <>
        <section id="features" className="py-16 md:py-24 bg-white">
          <div className="container mx-auto px-6">
              <div className="text-center mb-12">
                  <h3 className="text-3xl md:text-4xl font-bold text-main">BOOK DESIGNでできること</h3>
                  <p className="text-text-secondary mt-2">本を通じて、新しい自分を発見し、人とつながる体験を。</p>
                  <div className="inline-block w-20 h-1 bg-primary mt-4 rounded"></div>
              </div>
              <div className="grid md:grid-cols-3 gap-8">
                  <div className="bg-background p-8 rounded-xl shadow-md border border-border">
                      <div className="text-primary mb-4">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v11.494m-9-5.494h18" /></svg>
                      </div>
                      <h4 className="text-xl font-bold mb-2 text-center text-main">本棚をかんたん作成</h4>
                      <p className="text-main text-sm">書籍検索APIと連携し、読んだ本を簡単に登録。カテゴリやハッシュタグで、あなただけのオリジナル本棚を直感的に構築できます。</p>
                  </div>
                  <div className="bg-background p-8 rounded-xl shadow-md border border-border">
                       <div className="text-primary mb-4">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.653-.125-1.274-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.653.125-1.274.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
                      </div>
                      <h4 className="text-xl font-bold mb-2 text-center text-main">価値観でつながる</h4>
                      <p className="text-main text-sm">他ユーザーの本棚を覗いて、新たな興味を発見。フォロー機能で、同じ価値観を持つ人々と簡単につながれます。</p>
                  </div>
                  <div className="bg-background p-8 rounded-xl shadow-md border border-border">
                       <div className="text-primary mb-4">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" /></svg>
                      </div>
                      <h4 className="text-xl font-bold mb-2 text-center text-main">いつでも知識を取り出せる</h4>
                      <p className="text-main text-sm">本から得た示唆やアクションプランなどナレッジタンクに記録することにより、いつでも知識が取り出せます。</p>
                  </div>
              </div>
          </div>
        </section>

        <section id="target" className="py-16 md:py-24">
            <div className="container mx-auto px-6">
                 <div className="text-center mb-12">
                    <h3 className="text-3xl md:text-4xl font-bold text-main">特に、こんな方におすすめです</h3>
                     <p className="text-text-secondary mt-2">本を軸とした、新しいコミュニケーションを求めるすべての方へ。</p>
                    <div className="inline-block w-20 h-1 bg-primary mt-4 rounded"></div>
                </div>
                <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-8">
                    <div className="bg-white p-6 rounded-lg shadow">
                        <h4 className="font-bold text-lg text-primary">教えたい・学びたい人事の方</h4>
                        <p className="text-sm mt-2 text-main">候補者や社員の読書傾向から、カルチャーフィットや潜在能力を把握。自社のナレッジ共有や育成のヒントにも繋がります。</p>
                    </div>
                     <div className="bg-white p-6 rounded-lg shadow">
                        <h4 className="font-bold text-lg text-primary">すべての読書愛好家の方</h4>
                        <p className="text-sm mt-2 text-main">積読の解消から、読後の感動の共有まで。あなたの読書体験を記録し、同じ本を愛する仲間と語り合う場を提供します。</p>
                    </div>
                </div>
            </div>
        </section>
        
        <section id="how-to" className="py-16 md:py-24 bg-white">
            <div className="container mx-auto px-6 text-center">
                 <div className="text-center mb-12">
                    <h3 className="text-3xl md:text-4xl font-bold text-main">かんたん3ステップで開始</h3>
                    <div className="inline-block w-20 h-1 bg-primary mt-4 rounded"></div>
                </div>
                <div className="grid md:grid-cols-3 gap-8 items-start">
                    <div className="relative">
                        <div className="bg-primary text-white w-12 h-12 rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">1</div>
                        <h4 className="font-bold text-lg mb-2 text-main">無料会員登録</h4>
                        <p className="text-sm text-main">メールアドレスとパスワードで簡単登録。興味のあるタグを選んで、あなたへのおすすめを受け取る準備をしましょう。</p>
                    </div>
                    <div>
                         <div className="bg-primary text-white w-12 h-12 rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">2</div>
                        <h4 className="font-bold text-lg mb-2 text-main">あなたの本棚を作成</h4>
                        <p className="text-sm text-main">タイトル検索で本を追加し、あなたの本棚を構築。読書体験をハッシュタグで豊かに表現しましょう。</p>
                    </div>
                    <div>
                         <div className="bg-primary text-white w-12 h-12 rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">3</div>
                        <h4 className="font-bold text-lg mb-2 text-main">つながる・見つける</h4>
                        <p className="text-sm text-main">気になる人の本棚を覗いたり、タグで検索したり。新たな本と人との出会いが、あなたを待っています。</p>
                    </div>
                </div>
            </div>
        </section>
        
        <section className="bg-primary py-16 md:py-24">
            <div className="container mx-auto px-6 text-center">
                <h3 className="text-3xl md:text-4xl font-bold text-white mb-4">さあ、あなたの本棚を世界に公開しよう。</h3>
                <p className="text-white/80 max-w-2xl mx-auto mb-8">思考を整理し、新しいつながりを生む。まずは無料で、その体験を。</p>
                 <button onClick={() => navigate('/signup')} className="bg-white text-primary font-bold px-8 py-4 rounded-lg shadow-lg hover:bg-gray-100 transition-transform transform hover:scale-105 inline-block">
                 3か月間（90日間）無料ではじめる
                </button>
            </div>
        </section>
        </>
      )}

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
