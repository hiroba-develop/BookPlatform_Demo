/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Activity } from './Activity';
import type { PrivacySettings } from './PrivacySettings';
import type { ReadingStats } from './ReadingStats';
import type { UserProfile } from './UserProfile';
export type MypageScreenData = {
    /**
     * ユーザープロフィール
     */
    userProfile?: UserProfile;
    /**
     * 読書統計
     */
    readingStats?: ReadingStats;
    /**
     * プライバシー設定
     */
    privacySettings?: PrivacySettings;
    recentActivity?: Array<Activity>;
};

