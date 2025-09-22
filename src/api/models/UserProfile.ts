/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type UserProfile = {
    /**
     * ユーザーID（UUID）
     */
    userId?: string;
    /**
     * ユーザー名（英数字、ログイン用）
     */
    username?: string;
    /**
     * 表示名（日本語可）
     */
    displayName?: string;
    /**
     * アイコン画像パス
     */
    iconImagePath?: string;
    /**
     * 自己紹介文
     */
    selfIntroduction?: string;
    /**
     * 本棚公開フラグ（'0':非公開、'1':公開）
     */
    bookshelfPublicFlg?: string;
    /**
     * おすすめ表示フラグ（'0':非表示、'1':表示）
     */
    recommendDisplayFlg?: string;
    /**
     * 積読棚公開フラグ（'0':非公開、'1':公開）
     */
    tsundokuPublicFlg?: string;
    /**
     * 総登録本数
     */
    totalBooks?: number;
    /**
     * 総本棚数
     */
    totalBookshelves?: number;
    /**
     * 登録日時
     */
    createdAt?: string;
};

