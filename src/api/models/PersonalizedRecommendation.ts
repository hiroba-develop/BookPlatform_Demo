/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { BookInfo } from './BookInfo';
export type PersonalizedRecommendation = {
    /**
     * 書籍情報
     */
    bookInfo?: BookInfo;
    /**
     * レコメンドスコア（1.0-5.0）
     */
    score?: number;
    /**
     * レコメンド理由
     */
    reason?: string;
};

