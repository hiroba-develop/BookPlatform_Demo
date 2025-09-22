/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CategorySuggestion } from '../models/CategorySuggestion';
import type { HashtagSuggestion } from '../models/HashtagSuggestion';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class SuggestionsService {
    /**
     * カテゴリサジェスト取得
     * 入力中の文字列に対するカテゴリサジェスト
     * @returns CategorySuggestion カテゴリサジェスト取得成功
     * @throws ApiError
     */
    public static getApiSuggestCategories({
        query,
        limit,
    }: {
        query: string,
        limit?: number,
    }): CancelablePromise<Array<CategorySuggestion>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/suggest/categories',
            query: {
                'query': query,
                'limit': limit,
            },
        });
    }
    /**
     * ハッシュタグサジェスト取得
     * 入力中の文字列に対するハッシュタグサジェスト
     * @returns HashtagSuggestion ハッシュタグサジェスト取得成功
     * @throws ApiError
     */
    public static getApiSuggestHashtags({
        query,
        limit,
    }: {
        query: string,
        limit?: number,
    }): CancelablePromise<Array<HashtagSuggestion>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/suggest/hashtags',
            query: {
                'query': query,
                'limit': limit,
            },
        });
    }
}
