export type InitSource = {
    id: string;
    name: string;
};

export type Article = {
    author: string;
    content: string;
    description: string;
    publishedAt: string;
    source: Pick<InitSource, 'id' | 'name'>;
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

export type Options<T> = Record<string, T>;

export type Callback<T> = (data?: T) => void;
