/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { BookshelfCategory } from './BookshelfCategory';
export type Bookshelf = {
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
     * 公開フラグ（'0':非公開、'1':公開）
     */
    publicFlg?: string;
    /**
     * カテゴリ数
     */
    categoryCount?: number;
    /**
     * 本数
     */
    bookCount?: number;
    categories?: Array<BookshelfCategory>;
    /**
     * 作成日時
     */
    createdAt?: string;
};

