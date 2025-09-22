/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Bookshelf } from '../models/Bookshelf';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class BookshelvesService {
    /**
     * 本棚一覧取得
     * 指定ユーザーの本棚一覧取得
     * @returns Bookshelf 本棚一覧取得成功
     * @throws ApiError
     */
    public static getApiBookshelves({
        userId,
    }: {
        userId: string,
    }): CancelablePromise<Array<Bookshelf>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/bookshelves',
            query: {
                'userId': userId,
            },
        });
    }
    /**
     * 本棚作成
     * 本棚新規作成
     * @returns any 本棚作成成功
     * @throws ApiError
     */
    public static postApiBookshelves({
        requestBody,
    }: {
        requestBody?: Bookshelf,
    }): CancelablePromise<{
        responseStatus?: number;
        bookshelfId?: number;
        message?: string;
    }> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/bookshelves',
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * 本棚詳細取得
     * 本棚詳細情報取得
     * @returns Bookshelf 本棚詳細取得成功
     * @throws ApiError
     */
    public static getApiBookshelves1({
        bookshelfId,
    }: {
        bookshelfId: number,
    }): CancelablePromise<Bookshelf> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/bookshelves/{bookshelfId}',
            path: {
                'bookshelfId': bookshelfId,
            },
        });
    }
    /**
     * 本棚更新
     * 本棚情報更新
     * @returns any 本棚更新成功
     * @throws ApiError
     */
    public static putApiBookshelves({
        bookshelfId,
        requestBody,
    }: {
        bookshelfId: number,
        requestBody?: Bookshelf,
    }): CancelablePromise<{
        responseStatus?: number;
        message?: string;
    }> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/api/bookshelves/{bookshelfId}',
            path: {
                'bookshelfId': bookshelfId,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * 本棚削除
     * 本棚削除
     * @returns any 本棚削除成功
     * @throws ApiError
     */
    public static deleteApiBookshelves({
        bookshelfId,
    }: {
        bookshelfId: number,
    }): CancelablePromise<{
        responseStatus?: number;
        message?: string;
    }> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/api/bookshelves/{bookshelfId}',
            path: {
                'bookshelfId': bookshelfId,
            },
        });
    }
}
