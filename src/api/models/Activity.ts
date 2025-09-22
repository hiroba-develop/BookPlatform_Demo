/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { BookInfo } from './BookInfo';
export type Activity = {
    /**
     * 活動種別（book_added/reading_status_changed/knowledge_tank_created等）
     */
    type?: string;
    /**
     * 活動説明
     */
    description?: string;
    /**
     * 関連書籍情報
     */
    relatedBookInfo?: BookInfo;
    /**
     * 活動日時
     */
    createdAt?: string;
};

