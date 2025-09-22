/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type HashtagSuggestion = {
    /**
     * ハッシュタグID
     */
    hashtagId?: number;
    /**
     * ハッシュタグ名
     */
    hashtagName?: string;
    /**
     * 使用回数（本・ナレッジタンク統合）
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
    /**
     * 最近1ヶ月の使用回数
     */
    recentUsageCount?: number;
};

