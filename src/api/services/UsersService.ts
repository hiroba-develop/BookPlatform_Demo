/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { UserProfile } from '../models/UserProfile';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class UsersService {
    /**
     * ユーザー情報取得
     * ユーザー情報取得
     * @returns UserProfile ユーザー情報取得成功
     * @throws ApiError
     */
    public static getApiUsers({
        userId,
    }: {
        userId: string,
    }): CancelablePromise<UserProfile> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/users/{userId}',
            path: {
                'userId': userId,
            },
        });
    }
    /**
     * ユーザー情報更新
     * ユーザー情報更新,imageFileがある場合はアイコンも更新
     * @returns any ユーザー情報更新成功
     * @throws ApiError
     */
    public static putApiUsers({
        userId,
        formData,
    }: {
        userId: string,
        formData?: {
            userProfile?: UserProfile;
            imageFile?: Blob;
        },
    }): CancelablePromise<{
        responseStatus?: number;
        iconImagePath?: string;
        message?: string;
    }> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/api/users/{userId}',
            path: {
                'userId': userId,
            },
            formData: formData,
            mediaType: 'multipart/form-data',
        });
    }
    /**
     * ユーザー削除
     * ユーザー削除（論理削除）
     * @returns any ユーザー削除成功
     * @throws ApiError
     */
    public static deleteApiUsers({
        userId,
    }: {
        userId: string,
    }): CancelablePromise<{
        responseStatus?: number;
        message?: string;
    }> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/api/users/{userId}',
            path: {
                'userId': userId,
            },
        });
    }
}
