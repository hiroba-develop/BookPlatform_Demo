/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type CategorySuggestion = {
    /**
     * カテゴリID
     */
    categoryId?: number;
    /**
     * カテゴリ名
     */
    categoryName?: string;
    /**
     * 使用回数
     */
    usageCount?: number;
    /**
     * システムフラグ（'0':ユーザー作成、'1':システム標準）
     */
    systemFlg?: string;
    /**
     * マッチタイプ（'prefix':前方一致、'partial':部分一致）
     */
    matchType?: string;
    /**
     * 完全一致かどうか（'true':完全一致、'false':部分一致）
     */
    isExactMatch?: string;
};

