import type { Bookshelf } from '../types';

export const mockBookshelves: Bookshelf[] = [
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
    ],
    visibility: 'public'
  }
];
