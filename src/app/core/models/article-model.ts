import { SourceModel } from './source-model';

export interface ArticleModel {
    source: SourceModel;
    author?: string;
    title: string;
    description: string;
    url: string;
    urlToImage: string;
    publishedAt: string;
    content: string;
}