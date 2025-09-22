/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { BookInfo } from './BookInfo';
import type { CategoryMaster } from './CategoryMaster';
import type { Hashtag } from './Hashtag';
import type { PersonalizedRecommendation } from './PersonalizedRecommendation';
export type HomeScreenData = {
    categories?: Array<CategoryMaster>;
    weeklyNewBooks?: Array<BookInfo>;
    personalizedRecommendations?: Array<PersonalizedRecommendation>;
    trendingHashtags?: Array<Hashtag>;
};

