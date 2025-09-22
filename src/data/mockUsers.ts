import type { Bookshelf, UserBook } from "../types";

export interface MockUser {
  id: string;
  name: string;
  avatarUrl: string;
  bio: string;
  stats: {
    posts: number;
    followers: number;
    following: number;
    likes: number;
  };
  bookshelves: Bookshelf[];
  tsundoku?: UserBook[];
}

export const mockUsers: MockUser[] = [
  {
    id: 'demo-user-id',
    name: 'デモユーザー',
    avatarUrl: 'https://dummyimage.com/100x100/e0e0e0/aaa.png&text=Me',
    bio: 'ビジネス書を中心に、年間100冊を目標に読んでいます。特に組織開発やリーダーシップに関心があります。皆さんのおすすめの本もぜひ教えてください。',
    stats: { posts: 123, followers: 456, following: 789, likes: 1200 },
    bookshelves: [
      {
        id: 'shelf-1-1',
        title: 'ビジネス書の本棚',
        tags: [{ id: 'business', name: 'ビジネス' }, { id: 'career', name: 'キャリア' }],
        visibility: 'public',
        categories: [
          {
            id: 'cat-1-1-1',
            name: '経営戦略',
            books: [
              {
                id: '9784763137241',
                isbn: '9784763137241',
                title: 'Think clearly',
                author: 'ロルフ・ドベリ',
                publisher: 'サンマーク出版',
                status: '読了',
                userTags: [{ id: '意思決定', name: '意思決定' }, { id: '思考法', name: '思考法' }],
                userRating: { overall: 5, difficulty: 3, practicality: 5 },
                userSummary: '意思決定のバイアスについて、具体的な事例を交えて解説しており、非常に分かりやすい。何度も読み返したい一冊。',
              },
              {
                id: '9784478119938',
                isbn: '9784478119938',
                title: '人生の経営戦略',
                author: '山口 周',
                publisher: 'ダイヤモンド社',
                status: '読了',
                userTags: [{ id: 'キャリア戦略', name: 'キャリア戦略' }, { id: '自己分析', name: '自己分析' }, { id: '目標設定', name: '目標設定' }],
                knowledgeTank: '自分の人生を会社経営に見立て、ビジョンやドメインを定義する考え方は新しい発見だった。定期的に自己の棚卸しを行い、戦略を見直す必要がある。',
                userRating: { overall: 4, difficulty: 3, practicality: 5 },
                userSummary: '人生という壮大なプロジェクトを成功させるための「経営戦略」を提示してくれる一冊。キャリアに悩むすべての人におすすめ。'
              }
            ]
          },
          {
            id: 'cat-1-1-2',
            name: '自己啓発・学習法',
            books: [
              {
                id: '9784041161500',
                isbn: '9784041161500',
                title: '読書を仕事につなげる技術 知識が成果に変わる',
                author: '山口 周',
                publisher: 'KADOKAWA',
                status: '読了',
                userTags: [{ id: '読書術', name: '読書術' }, { id: 'スキルアップ', name: 'スキルアップ' }],
                knowledgeTank: '「読む・活かす・書く」のサイクルを回すことの重要性。知識をストックするだけでなく、フローさせて初めて価値が生まれる。',
                userRating: { overall: 4, difficulty: 2, practicality: 4 },
                userSummary: '単なる速読や多読ではなく、読書から得た知識をいかにして自身の血肉とし、仕事の成果に結びつけるかを説く。'
              }
            ]
          }
        ]
      },
    ],
    tsundoku: [],
  },
  {
    id: 'user-2',
    name: '読書家A',
    avatarUrl: 'https://dummyimage.com/100x100/e0e0e0/aaa.png&text=UserA',
    bio: '経営書や話題の小説を幅広く読んでいます。特に企業価値評価や、緻密なストーリーのミステリー小説が好きです。',
    stats: { posts: 78, followers: 320, following: 150, likes: 980 },
    bookshelves: [
      {
        id: 'shelf-2-1',
        title: 'ビジネス書コレクション',
        tags: [{ id: 'business', name: 'ビジネス' }, { id: 'management', name: '経営' }],
        visibility: 'public',
        categories: [
          {
            id: 'cat-2-1-1',
            name: '企業価値評価・ファイナンス',
            books: [
              {
                id: '9784534048172',
                isbn: '9784534048172',
                title: '図解でわかる企業価値評価のすべて',
                author: '中神 康議',
                publisher: '日本実業出版社',
                status: '読了',
                userTags: [{ id: '企業価値評価', name: '企業価値評価' }, { id: '図解', name: '図解' }],
                userRating: { overall: 4, difficulty: 2, practicality: 4 },
                userSummary: 'タイトルの通り図解が豊富で、複雑な概念が直感的に理解できる。価値評価の全体像を掴む最初の一冊として最適。'
              },
              {
                id: '9784478105412',
                isbn: '9784478105412',
                title: 'コーポレートファイナンス 戦略と実践',
                author: '田中 慎一',
                publisher: 'ダイヤモンド社',
                status: '読書中',
                userTags: [{ id: 'コーポレートファイナンス', name: 'コーポレートファイナンス' }, { id: '財務戦略', name: '財務戦略' }],
                userRating: { overall: 5, difficulty: 4, practicality: 5 },
                userSummary: 'ファイナンス理論と経営戦略を結びつけて解説しており、非常に示唆に富む。'
              }
            ]
          },
          {
            id: 'cat-2-1-2',
            name: '経営戦略・組織づくり',
            books: [
              {
                id: '9784334107543',
                isbn: '9784334107543',
                title: '人が集まる企業は何が違うのか',
                author: '楠木 建',
                publisher: '光文社',
                status: '読了',
                userTags: [{ id: '経営戦略', name: '経営戦略' }, { id: '組織論', name: '組織論' }],
                userRating: { overall: 4, difficulty: 3, practicality: 4 },
                userSummary: '企業の「魅力」を構造的に解き明かす一冊。良い会社と強い会社の違いなど、本質的な問いを投げかける。'
              }
            ]
          },
          {
            id: 'cat-2-1-3',
            name: 'イノベーション・デザイン思考',
            books: [
              {
                id: '9784334037680',
                isbn: '9784334037680',
                title: '世界で最もイノベーティブな組織の作り方',
                author: 'IDEO',
                publisher: '光文社',
                status: '読了',
                userTags: [{ id: 'イノベーション', name: 'イノベーション' }, { id: 'デザイン思考', name: 'デザイン思考' }],
                userRating: { overall: 5, difficulty: 3, practicality: 5 },
                userSummary: 'デザインコンサルティングファームIDEOの組織文化やプロセスを紹介。創造性を引き出すための具体的な方法論が満載。'
              }
            ]
          },
          {
            id: 'cat-2-1-4',
            name: '組織論・マネジメント理論',
            books: [
              {
                id: '9784495390792',
                isbn: '9784495390792',
                title: '組織論のエッセンス',
                author: 'Mary Jo Hatch',
                publisher: '有斐閣',
                status: '読了',
                userTags: [{ id: '組織論', name: '組織論' }, { id: '組織マネジメント', name: '組織マネジメント' }],
                userRating: { overall: 4, difficulty: 3, practicality: 4 },
                userSummary: '組織について初めて学ぶ人、組織の「組織化（organizing）」という視点を含めて、組織の理論と現実を結びつけて考えたい人におススメ',
                knowledgeTank: '理論と実践を結びつける：「組織とは何か」「組織化とは何か」という抽象的な問いを、自分の組織体験（職場・学校・プロジェクトなど）に当てはめて考えると理解が深まる。',
                knowledgeTankTags: [{ id: '理論と実践', name: '理論と実践' }, { id: '組織化', name: '組織化' }, { id: '組織体験', name: '組織体験' }]
              }
            ]
          }
        ]
      },
      {
        id: 'shelf-2-2',
        title: '小説',
        tags: [{ id: 'novel', name: '小説' }, { id: 'mystery', name: 'ミステリー' }],
        visibility: 'public',
        categories: [
          {
            id: 'cat-2-2-1',
            name: '湊かなえ',
            books: [
              {
                id: '9784062935869',
                isbn: '9784062935869',
                title: 'リバース',
                author: '湊かなえ',
                publisher: '講談社',
                status: '読了',
                userTags: [{ id: 'イヤミス', name: 'イヤミス' }, { id: '友情', name: '友情' }],
                userRating: { overall: 4, difficulty: 2, practicality: 3 },
                userSummary: '主人公の平凡な日常が、一つの告発によって崩れていく様が見事。人間の心の脆さや友情のあり方を問う作品。',
                knowledgeTank: '「罪の共有」がテーマ。過去の出来事が現在にどう影響を与えるか、という構成が秀逸。'
              },
              {
                id: '9784575517040',
                isbn: '9784575517040',
                title: 'Nのために',
                author: '湊かなえ',
                publisher: '双葉社',
                status: '読了',
                userTags: [{ id: '純愛', name: '純愛' }, { id: 'ミステリー', name: 'ミステリー' }],
                userRating: { overall: 5, difficulty: 3, practicality: 4 },
                userSummary: '登場人物それぞれの視点から語られる「N」への想い。切なすぎる純愛ミステリーの傑作。'
              }
            ]
          },
          {
            id: 'cat-2-2-2',
            name: '東野圭吾',
            books: [
              {
                id: '9784163238609',
                isbn: '9784163238609',
                title: '容疑者Ｘの献身',
                author: '東野圭吾',
                publisher: '文藝春秋',
                status: '読了',
                userTags: [{ id: '本格ミステリ', name: '本格ミステリ' }, { id: '切ない', name: '切ない' }],
                userRating: { overall: 5, difficulty: 3, practicality: 4 },
                userSummary: '論理的思考の天才である数学者と物理学者の対決。トリックの緻密さと、その裏にある深い愛情に心を揺さぶられる。'
              },
              {
                id: '9784087744002',
                isbn: '9784087744002',
                title: '白夜行',
                author: '東野圭吾',
                publisher: '集英社',
                status: '読了',
                userTags: [{ id: '悪女', name: '悪女' }, { id: '社会派ミステリー', name: '社会派ミステリー' }],
                userRating: { overall: 5, difficulty: 4, practicality: 4 },
                userSummary: '主人公2人の19年間にわたる壮絶な人生を描く。彼らの関係性が最後まで明示されないまま進むストーリーは圧巻。'
              }
            ]
          }
        ]
      }
    ],
    tsundoku: []
  },
  {
    id: 'user-3',
    name: '技術好きB',
    avatarUrl: 'https://dummyimage.com/100x100/cccccc/888.png&text=UserB',
    bio: 'ソフトウェアエンジニアです。技術書は日々の学び。週末はSF小説を読んでリフレッシュしています。Clean Codeは私のバイブルです。',
    stats: { posts: 58, followers: 234, following: 105, likes: 850 },
    bookshelves: [
      {
        id: 'shelf-3-1',
        title: '技術書コレクション',
        tags: [{ id: 'programming', name: 'プログラミング' }, { id: 'it', name: 'IT' }],
        visibility: 'public',
        categories: [
          {
            id: 'cat-3-1-1',
            name: 'ソフトウェア設計',
            books: [
              {
                id: '9784048930659',
                isbn: '9784048930659',
                title: 'Clean Architecture',
                author: 'Robert C. Martin',
                publisher: 'KADOKAWA',
                status: '読書中',
                userTags: [{ id: '設計原則', name: '設計原則' }, { id: 'SOLID', name: 'SOLID' }],
                userRating: { overall: 4.5, difficulty: 4, practicality: 5 },
                userSummary: 'ソフトウェア設計の原則を学ぶ上で欠かせない。特に依存関係の逆転の原則は目から鱗でした。',
              },
              {
                id: '9784873115658',
                isbn: '9784873115658',
                title: 'リーダブルコード',
                author: 'Dustin Boswell, Trevor Foucher',
                publisher: 'オライリージャパン',
                status: '読了',
                userTags: [{ id: 'コーディング', name: 'コーディング' }, { id: '可読性', name: '可読性' }],
                userRating: { overall: 5, difficulty: 2, practicality: 5 },
                userSummary: 'エンジニアなら誰もが読むべき。コードの可読性がいかに重要か、具体的なテクニックと共に学べます。',
                knowledgeTank: 'エンジニアなら誰もが読むべき。コードの可読性がいかに重要か、具体的なテクニックと共に学べます。',
                knowledgeTankTags: [{ id: '命名規則', name: '命名規則' }, { id: 'コードフォーマット', name: 'コードフォーマット' }, { id: 'コメントの書き方', name: 'コメントの書き方' }]
              },
            ],
          }
        ]
      }
    ],
    tsundoku: [
      {
        id: '9784863541689',
        isbn: '9784863541689',
        title: 'Webエンジニアの教科書',
        author: '田中 巧',
        publisher: 'シーアンドアール研究所',
        status: '積読',
        imageUrl: '',
        description: '',
      }
    ]
  },
];
