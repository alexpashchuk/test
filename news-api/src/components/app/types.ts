export type InitSource = {
    id: string;
    name: string;
};

export type Articles = {
    author: string;
    content: string;
    description: string;
    publishedAt: string;
    source: InitSource;
    title: string;
    url: string;
    urlToImage: string;
};

export type Sources = {
    category: string;
    country: string;
    description: string;
    id: string;
    name: string;
    url: string;
    language: string;
};

export interface NewsData {
    articles: Array<Articles>;
    totalResults: number;
    status: string;
}

export interface SourceData {
    sources: Array<Sources>;
    status: string;
}

export type AllData = Articles | Sources;

export type Options<T> = { [key: string]: T };

export type Callback<T> = (data?: T) => void;
