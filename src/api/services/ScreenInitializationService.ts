/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { BookDetailScreenData } from '../models/BookDetailScreenData';
import type { BrowseBookshelvesSreenData } from '../models/BrowseBookshelvesSreenData';
import type { HomeScreenData } from '../models/HomeScreenData';
import type { MyBookshelfScreenData } from '../models/MyBookshelfScreenData';
import type { MypageScreenData } from '../models/MypageScreenData';
import type { UserDetailScreenData } from '../models/UserDetailScreenData';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class ScreenInitializationService {
    /**
     * ホーム画面初期表示
     * ホーム画面に必要な全データを一括取得
     * @returns HomeScreenData ホーム画面データ取得成功
     * @throws ApiError
     */
    public static getApiScreensHome({
        userId,
    }: {
        userId: string,
    }): CancelablePromise<HomeScreenData> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/screens/home/{userId}',
            path: {
                'userId': userId,
            },
        });
    }
    /**
     * 私の本棚画面初期表示
     * 私の本棚画面に必要な全データを一括取得
     * @returns MyBookshelfScreenData 私の本棚画面データ取得成功
     * @throws ApiError
     */
    public static getApiScreensMyBookshelves({
        userId,
    }: {
        userId: string,
    }): CancelablePromise<MyBookshelfScreenData> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/screens/my-bookshelves/{userId}',
            path: {
                'userId': userId,
            },
        });
    }
    /**
     * 本棚を覗く画面初期表示
     * 他ユーザーの本棚一覧画面に必要な全データを一括取得
     * @returns BrowseBookshelvesSreenData 本棚一覧画面データ取得成功
     * @throws ApiError
     */
    public static getApiScreensBrowseBookshelves({
        userId,
    }: {
        userId: string,
    }): CancelablePromise<BrowseBookshelvesSreenData> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/screens/browse-bookshelves/{userId}',
            path: {
                'userId': userId,
            },
        });
    }
    /**
     * ユーザー詳細画面初期表示
     * ユーザー詳細画面に必要な全データを一括取得
     * @returns UserDetailScreenData ユーザー詳細画面データ取得成功
     * @throws ApiError
     */
    public static getApiScreensUserDetail({
        userId,
        targetUserId,
    }: {
        userId: string,
        targetUserId: string,
    }): CancelablePromise<UserDetailScreenData> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/screens/user-detail/{userId}/{targetUserId}',
            path: {
                'userId': userId,
                'targetUserId': targetUserId,
            },
        });
    }
    /**
     * 本の詳細画面初期表示
     * 本の詳細画面に必要な全データを一括取得
     * @returns BookDetailScreenData 本の詳細画面データ取得成功
     * @throws ApiError
     */
    public static getApiScreensBookDetail({
        userId,
        isbn,
    }: {
        userId: string,
        isbn: string,
    }): CancelablePromise<BookDetailScreenData> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/screens/book-detail/{userId}/{isbn}',
            path: {
                'userId': userId,
                'isbn': isbn,
            },
        });
    }
    /**
     * マイページ初期表示
     * マイページ（設定画面）に必要な全データを一括取得
     * @returns MypageScreenData マイページデータ取得成功
     * @throws ApiError
     */
    public static getApiScreensMypage({
        userId,
    }: {
        userId: string,
    }): CancelablePromise<MypageScreenData> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/screens/mypage/{userId}',
            path: {
                'userId': userId,
            },
        });
    }
}
