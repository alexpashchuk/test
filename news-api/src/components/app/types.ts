export type InitSource = {
    id: string;
    name: string;
};

export type Article = {
    author: string;
    content: string;
    description: string;
    publishedAt: string;
    source: InitSource;
    title: string;
    url: string;
    urlToImage: string;
};

export type Source = {
    category: string;
    country: string;
    description: string;
    id: string;
    name: string;
    url: string;
    language: string;
};

export interface NewsData {
    articles: Array<Article>;
    totalResults: number;
    status: string;
}

export interface SourceData {
    sources: Array<Source>;
    status: string;
}

export type AllData = Article | Source;

export type Options<T> = { [key: string]: T };

export type Callback<T> = (data?: T) => void;

export enum newsLinks {
    linkLocal = 'https://newsapi.org/v2/',
    linkDeploy = 'https://rss-news-api.onrender.com/',
}

export type IApiKey = string;
