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
    avatarUrl: 'https://dummyimage.com/100x100/e0e0e0/aaa.png&text=UserA',
    bio: 'ビジネス書を中心に、年間100冊を目標に読んでいます。特に組織開発やリーダーシップに関心があります。皆さんのおすすめの本もぜひ教えてください。',
    stats: { posts: 123, followers: 456, following: 789, likes: 1200 },
    bookshelves: [
      {
        id: 'shelf-1-1',
        title: 'ビジネス書の本棚',
        tags: [{ id: 'business', name: 'ビジネス' }, { id: 'career', name: 'キャリア' }],
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
                pubDate: '2018-11-15',
                imageUrl: '',
                description: '',
                link: '',
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
                pubDate: '2024-03-20',
                imageUrl: '',
                description: '',
                link: '',
                status: '読了',
                userTags: [{ id: 'キャリア戦略', name: 'キャリア戦略' }, { id: '自己分析', name: '自己分析' }, { id: '目標設定', name: '目標設定' }],
                knowledgeTank: '自分の人生を会社経営に見立て、ビジョンやドメインを定義する考え方は新しい発見だった。定期的に自己の棚卸しを行い、戦略を見直す必要がある。',
                userRating: { overall: 4, difficulty: 3, practicality: 5 },
                userSummary: '人生という壮大なプロジェクトを成功させるための「経営戦略」を提示してくれる一冊。キャリアに悩むすべての人におすすめ。'
              },
              {
                id: '9784478066027',
                isbn: '9784478066027',
                title: 'グロービスＭＢＡ経営戦略',
                author: 'グロービス経営大学院',
                publisher: 'ダイヤモンド社',
                pubDate: '2019-11-28',
                imageUrl: '',
                description: '',
                link: '',
                status: '読書中',
                userTags: [{ id: 'MBA', name: 'MBA' }, { id: '経営戦略', name: '経営戦略' }, { id: 'フレームワーク', name: 'フレームワーク' }],
                knowledgeTank: '事業戦略から組織戦略まで、経営の全体像を体系的に理解できる。常に手元に置いておきたい教科書のような存在。',
                userRating: { overall: 5, difficulty: 4, practicality: 5 },
                userSummary: '経営戦略の教科書。図解が多く、複雑な概念も直感的に理解できる構成になっている。'
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
                pubDate: '2024-03-22',
                imageUrl: '',
                description: '',
                link: '',
                status: '読了',
                userTags: [{ id: '読書術', name: '読書術' }, { id: 'スキルアップ', name: 'スキルアップ' }],
                knowledgeTank: '「読む・活かす・書く」のサイクルを回すことの重要性。知識をストックするだけでなく、フローさせて初めて価値が生まれる。',
                userRating: { overall: 4, difficulty: 2, practicality: 4 },
                userSummary: '単なる速読や多読ではなく、読書から得た知識をいかにして自身の血肉とし、仕事の成果に結びつけるかを説く。'
              },
              {
                id: '9784296120604',
                isbn: '9784296120604',
                title: '知的戦闘力を高める 独学の技法',
                author: '山口 周',
                publisher: '日経BP',
                pubDate: '2024-03-21',
                imageUrl: '',
                description: '',
                link: '',
                status: '積読',
                userTags: [{ id: '独学', name: '独学' }, { id: '学習法', name: '学習法' }, { id: '思考法', name: '思考法' }],
                knowledgeTank: '何を学ぶかだけでなく「何（どの問い）を解決するために学ぶか」という目的意識が、学習の質と効率を最大化させる。',
                userRating: { overall: 0, difficulty: 0, practicality: 0 },
                userSummary: 'まだ読んでいないため、サマリーはありません。'
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
    name: '技術好きB',
    avatarUrl: 'https://dummyimage.com/100x100/cccccc/888.png&text=UserB',
    bio: 'ソフトウェアエンジニアです。技術書は日々の学び。週末はSF小説を読んでリフレッシュしています。Clean Codeは私のバイブルです。',
    stats: { posts: 58, followers: 234, following: 105, likes: 850 },
    bookshelves: [
      {
        id: 'shelf-2-1',
        title: '技術書コレクション',
        tags: [{ id: 'programming', name: 'プログラミング' }, { id: 'it', name: 'IT' }],
        categories: [
          {
            id: 'cat-2-1-1',
            name: 'ソフトウェア設計',
            books: [
              {
                id: '9784048930659',
                isbn: '9784048930659',
                title: 'Clean Architecture',
                author: 'Robert C. Martin',
                publisher: 'KADOKAWA',
                pubDate: '2017-10-23',
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
                pubDate: '2012-06-15',
                status: '読了',
                userTags: [{ id: 'コーディング', name: 'コーディング' }, { id: '可読性', name: '可読性' }],
                userRating: { overall: 5, difficulty: 2, practicality: 5 },
                userSummary: 'エンジニアなら誰もが読むべき。コードの可読性がいかに重要か、具体的なテクニックと共に学べます。',
              },
            ],
          }
        ]
      },
      {
        id: 'shelf-2-2',
        title: '漫画',
        tags: [{ id: 'manga', name: '漫画' }, { id: '少年漫画', name: '少年漫画' }],
        categories: [
          {
            id: 'cat-2-2-1',
            name: '週刊少年ジャンプ',
            books: [
              {
                id: '9784088716114',
                isbn: '9784088716114',
                title: 'SLAM DUNK 1',
                author: '井上 雄彦',
                publisher: '集英社',
                pubDate: '1991-02-08',
                status: '読了',
                userTags: [{ id: 'バスケットボール', name: 'バスケットボール' }, { id: '90年代', name: '90年代' }, { id: 'スラムダンク', name: 'スラムダンク' }],
                userRating: { overall: 5, difficulty: 2, practicality: 3 },
                userSummary: '言わずと知れたバスケットボール漫画の金字塔。登場人物一人ひとりの成長ドラマが熱い。何度読んでも泣ける。',
                knowledgeTank: '「あきらめたらそこで試合終了ですよ」という安西先生の言葉は、仕事や人生のあらゆる場面で自分を奮い立たせてくれる普遍的な真理。'
              },
              {
                id: '9784088725093',
                isbn: '9784088725093',
                title: 'ONE PIECE 1',
                author: '尾田 栄一郎',
                publisher: '集英社',
                pubDate: '1997-12-24',
                status: '読了',
                userTags: [{ id: '冒険', name: '冒険' }, { id: '海賊', name: '海賊' }],
                userRating: { overall: 5, difficulty: 1, practicality: 4 },
                userSummary: '壮大な海洋冒険ロマンの原点。仲間との絆、夢を追いかけることの大切さが詰まっている。ワクワクが止まらない。',
                knowledgeTank: 'ルフィの「海賊王におれはなる!!!!」という明確な目標設定と、それに対する揺るぎない信念は、キャリアを考える上で非常に参考になる。自分の「宝」は何かを問い直すきっかけになった。'
              }
            ]
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
        pubDate: '2015-09-18',
        status: '積読',
        imageUrl: '',
        description: '',
        link: '',
      },
      {
        id: '9784863543713',
        isbn: '9784863543713',
        title: 'クラウドエンジニアの教科書',
        author: '佐々木 拓郎',
        publisher: 'シーアンドアール研究所',
        pubDate: '2021-12-22',
        status: '積読',
        imageUrl: '',
        description: '',
        link: '',
      },
      {
        id: '9784297119447',
        isbn: '9784297119447',
        title: 'サーバ/インフラエンジニアの基本がこれ1冊でしっかり身につく本',
        author: '馬場 俊彰',
        publisher: '技術評論社',
        pubDate: '2021-03-13',
        status: '積読',
        imageUrl: '',
        description: '',
        link: '',
      }
    ]
  },
];
