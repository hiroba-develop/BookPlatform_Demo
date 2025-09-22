/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { BookInfo } from './BookInfo';
import type { BookRatingStats } from './BookRatingStats';
import type { UserReadingRecord } from './UserReadingRecord';
export type BookDetailScreenData = {
    /**
     * 書籍情報
     */
    bookInfo?: BookInfo;
    userReadingRecords?: Array<UserReadingRecord>;
    /**
     * 書籍評価統計
     */
    bookRatingStats?: BookRatingStats;
    relatedBooks?: Array<BookInfo>;
    userReviews?: Array<UserReadingRecord>;
};

