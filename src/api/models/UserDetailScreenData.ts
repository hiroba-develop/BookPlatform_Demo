/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Bookshelf } from './Bookshelf';
import type { FollowInfo } from './FollowInfo';
import type { FollowStatus } from './FollowStatus';
import type { TotalCounts } from './TotalCounts';
import type { UserProfile } from './UserProfile';
export type UserDetailScreenData = {
    /**
     * 対象ユーザープロフィール
     */
    targetUserProfile?: UserProfile;
    publicBookshelves?: Array<Bookshelf>;
    /**
     * フォロー状況
     */
    followStatus?: FollowStatus;
    followers?: Array<FollowInfo>;
    following?: Array<FollowInfo>;
    /**
     * 総数情報
     */
    totalCounts?: TotalCounts;
};

