/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { BookInfo } from './BookInfo';
import type { Hashtag } from './Hashtag';
export type UserReadingRecord = {
    /**
     * ユーザー書籍ID
     */
    userBookId?: number;
    /**
     * 読書ステータス（'1':積読、'2':読書中、'3':読了）
     */
    readingStatus?: string;
    /**
     * 総合評価（1.0-5.0、0.5単位）
     */
    overallRating?: number;
    /**
     * 分かりやすさ評価（1.0-5.0、0.5単位）
     */
    clarityRating?: number;
    /**
     * 実用性評価（1.0-5.0、0.5単位）
     */
    utilityRating?: number;
    /**
     * 本の概要（ユーザー入力）
     */
    bookSummary?: string;
    /**
     * ナレッジタンク内容
     */
    content?: string;
    hashtags?: Array<Hashtag>;
    knowledgeHashtags?: Array<Hashtag>;
    /**
     * 書籍基本情報
     */
    bookInfo?: BookInfo;
    /**
     * 作成日時
     */
    createdAt?: string;
    /**
     * 更新日時
     */
    updatedAt?: string;
};

