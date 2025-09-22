/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { PopularCategory } from './PopularCategory';
import type { ThumbnailBook } from './ThumbnailBook';
import type { UserProfile } from './UserProfile';
export type BookshelfWithUser = {
    /**
     * 本棚ID
     */
    bookshelfId?: number;
    /**
     * 本棚名
     */
    bookshelfName?: string;
    /**
     * 本棚説明
     */
    description?: string;
    /**
     * カテゴリ数
     */
    categoryCount?: number;
    /**
     * 本数
     */
    bookCount?: number;
    /**
     * 最終更新日時
     */
    lastUpdated?: string;
    /**
     * 本棚所有者のプロフィール
     */
    userProfile?: UserProfile;
    thumbnailBooks?: Array<ThumbnailBook>;
    popularCategories?: Array<PopularCategory>;
};

