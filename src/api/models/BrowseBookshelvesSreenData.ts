/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { BookshelfWithUser } from './BookshelfWithUser';
import type { TrendingCategory } from './TrendingCategory';
export type BrowseBookshelvesSreenData = {
    recentlyUpdatedBookshelves?: Array<BookshelfWithUser>;
    similarUsersBookshelves?: Array<BookshelfWithUser>;
    popularBookshelves?: Array<BookshelfWithUser>;
    followingUsersBookshelves?: Array<BookshelfWithUser>;
    recommendedUsersBookshelves?: Array<BookshelfWithUser>;
    trendingCategories?: Array<TrendingCategory>;
};

