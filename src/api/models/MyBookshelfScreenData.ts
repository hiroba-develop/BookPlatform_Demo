/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Bookshelf } from './Bookshelf';
import type { ReadingStats } from './ReadingStats';
import type { UserProfile } from './UserProfile';
import type { UserReadingRecord } from './UserReadingRecord';
export type MyBookshelfScreenData = {
    /**
     * ユーザープロフィール
     */
    userProfile?: UserProfile;
    bookshelves?: Array<Bookshelf>;
    /**
     * 読書統計
     */
    readingStats?: ReadingStats;
    recentBooks?: Array<UserReadingRecord>;
};

