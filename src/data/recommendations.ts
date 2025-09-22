export interface RecommendationBook {
  id: string;
  title: string;
  author: string;
  isbn: string;
  imageUrl: string;
  description?: string;
}

export const recommendationBooks: RecommendationBook[] = [
  {
    id: "9784046066008",
    title: "武器になる哲学 人生を生き抜くための哲学・思想のキーコンセプト50",
    author: "山口周",
    isbn: "9784046066008",
    imageUrl: "https://covers.openlibrary.org/b/isbn/9784046066008-L.jpg",
    description: "ビジネスパーソンが知っておくべき哲学・思想の50のキーコンセプトを解説。現代社会で生き抜くための知的武装を身につけられる一冊。"
  },
  {
    id: "9784296120604",
    title: "知的戦闘力を高める 独学の技法",
    author: "山口周",
    isbn: "9784296120604",
    imageUrl: "https://covers.openlibrary.org/b/isbn/9784296120604-L.jpg",
    description: "独学で知識を身につけ、それを実践に活かすための具体的な技法を紹介。継続的な学習と成長のための実践的なガイド。"
  },
  {
    id: "9784833425353",
    title: "クリティカル・ビジネス・パラダイム",
    author: "山口周",
    isbn: "9784833425353",
    imageUrl: "https://covers.openlibrary.org/b/isbn/9784833425353-L.jpg",
    description: "ビジネスの本質を理解し、戦略的思考を身につけるためのパラダイムシフトを提案。現代ビジネス環境での成功の鍵を探る。"
  },
  {
    id: "9784799331279",
    title: "ビジネスリーダーのための意思決定の教科書",
    author: "川口荘史",
    isbn: "9784799331279",
    imageUrl: "https://covers.openlibrary.org/b/isbn/9784799331279-L.jpg",
    description: "リーダーが直面する複雑な意思決定を効果的に行うための理論と実践を解説。データドリブンな意思決定の技法を学べる。"
  },
  {
    id: "9784296124909",
    title: "できるリーダーが意思決定の前に考えること",
    author: "内田和成",
    isbn: "9784296124909",
    imageUrl: "https://covers.openlibrary.org/b/isbn/9784296124909-L.jpg",
    description: "優れたリーダーが意思決定プロセスで重視する思考の枠組みと判断基準を詳しく解説。実践的なリーダーシップの指南書。"
  }
];
