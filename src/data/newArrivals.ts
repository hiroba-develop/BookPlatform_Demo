export interface NewArrivalBook {
  id: string;
  title: string;
  author: string;
  isbn: string;
  imageUrl?: string;
}

export interface NewArrivalCategory {
  name: string;
  books: NewArrivalBook[];
}

export const newArrivalsData: NewArrivalCategory[] = [
  {
    name: '経済',
    books: [
      { id: 'na-eco-1', title: '新たな雇用・勤務環境下の源泉徴収の要否', author: '阿瀬薫', isbn: '9784419069795' },
      { id: 'na-eco-2', title: '一発合格!ビジネスマネジャー検定試験要点マスター&問題集', author: '山崎秀夫, 酒井美重子', isbn: '9784816375730' },
      { id: 'na-eco-3', title: 'インテグリティが浸透するコンプライアンス・カルチャーの創り方', author: '中山達樹', isbn: '9784502498217' },
      { id: 'na-eco-4', title: 'ビジネスモデルひらめき図鑑', author: '平野敦士カール', isbn: '9784816375679' },
      { id: 'na-eco-5', title: '米中経済消耗戦争', author: '田村秀男', isbn: '9784847073289' },
    ],
  },
  {
    name: '経営学',
    books: [
      { id: 'na-biz-1', title: 'マッキンゼーリーダーの教室', author: 'ダナ・マオール', isbn: '9784478118023' },
      { id: 'na-biz-2', title: 'ザ・ゴール ― 企業の究極の目的とは何か', author: 'エリヤフ・ゴールドラット', isbn: '9784478025949' },
      { id: 'na-biz-3', title: 'ビジョナリー・カンパニー', author: 'ジェームズ・C・コリンズ', isbn: '9784822240121' },
      { id: 'na-biz-4', title: '良い戦略、悪い戦略', author: 'リチャード・ルメルト', isbn: '9784532196637' },
      { id: 'na-biz-5', title: 'イノベーションのジレンマ', author: 'クレイトン・クリステンセン', isbn: '9784798122206' },
    ],
  },
  {
    name: '日本文学',
    books: [
      { id: 'na-lit-1', title: '汝、星のごとく', author: '凪良ゆう', isbn: '9784065282107' },
      { id: 'na-lit-2', title: 'しろがねの葉', author: '千早茜', isbn: '9784103548512' },
      { id: 'na-lit-3', title: '夜が明ける', author: '西加奈子', isbn: '9784103523823' },
      { id: 'na-lit-4', title: 'medium 霊媒探偵城塚翡翠', author: '相沢沙呼', isbn: '9784065171333' },
      { id: 'na-lit-5', title: '塞王の楯', author: '今村翔吾', isbn: '9784087717750' },
    ],
  },
];
