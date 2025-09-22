/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { BookInfo } from './BookInfo';
export type BookshelfCategory = {
    /**
     * 本棚カテゴリID
     */
    bookshelfCategoryId?: number;
    /**
     * カテゴリID
     */
    categoryId?: number;
    /**
     * カテゴリ名
     */
    categoryName?: string;
    /**
     * 表示順序
     */
    displayOrder?: number;
    /**
     * 本数
     */
    bookCount?: number;
    books?: Array<BookInfo>;
};

