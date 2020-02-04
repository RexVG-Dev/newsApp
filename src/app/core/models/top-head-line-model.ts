import { ArticleModel } from './article-model';

export interface TopHeadLineModel {
    status: string;
    totalResults: number;
    articles: ArticleModel[];
}
