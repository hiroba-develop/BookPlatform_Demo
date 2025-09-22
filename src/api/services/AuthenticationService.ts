/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class AuthenticationService {
    /**
     * ログイン
     * ユーザーログイン時使用
     * @returns any ログイン成功
     * @throws ApiError
     */
    public static postApiAuthLogin({
        requestBody,
    }: {
        requestBody?: {
            email: string;
            password: string;
        },
    }): CancelablePromise<{
        responseStatus?: number;
        userId?: string;
        token?: string;
        displayName?: string;
    }> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/auth/login',
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * ユーザー登録
     * ユーザー登録時使用
     * @returns any 登録成功
     * @throws ApiError
     */
    public static postApiAuthRegister({
        requestBody,
    }: {
        requestBody?: {
            username: string;
            email: string;
            password: string;
            displayName: string;
        },
    }): CancelablePromise<{
        responseStatus?: number;
        userId?: string;
        message?: string;
    }> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/auth/register',
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * ログアウト
     * ログアウト時使用,トークン無効化
     * @returns any ログアウト成功
     * @throws ApiError
     */
    public static postApiAuthLogout({
        requestBody,
    }: {
        requestBody?: {
            token: string;
        },
    }): CancelablePromise<{
        responseStatus?: number;
        message?: string;
    }> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/auth/logout',
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * パスワード変更
     * パスワード変更時使用
     * @returns any パスワード変更成功
     * @throws ApiError
     */
    public static putApiAuthPassword({
        requestBody,
    }: {
        requestBody?: {
            currentPassword: string;
            newPassword: string;
        },
    }): CancelablePromise<{
        responseStatus?: number;
        message?: string;
    }> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/api/auth/password',
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * パスワードリセット要求
     * パスワードリセット用メール送信
     * @returns any リセットメール送信成功
     * @throws ApiError
     */
    public static postApiAuthPasswordResetRequest({
        requestBody,
    }: {
        requestBody?: {
            email: string;
        },
    }): CancelablePromise<{
        responseStatus?: number;
        message?: string;
    }> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/auth/password/reset-request',
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * パスワードリセット実行
     * リセットトークンでパスワード変更
     * @returns any パスワードリセット成功
     * @throws ApiError
     */
    public static postApiAuthPasswordResetConfirm({
        requestBody,
    }: {
        requestBody?: {
            resetToken: string;
            newPassword: string;
        },
    }): CancelablePromise<{
        responseStatus?: number;
        message?: string;
    }> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/auth/password/reset-confirm',
            body: requestBody,
            mediaType: 'application/json',
        });
    }
}
