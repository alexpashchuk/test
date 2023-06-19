import { Callback, NewsData, Options, SourceData } from '../app/types';
import { ErrorStatus } from '../app/constants';

class Loader {
    readonly baseLink: string;
    readonly options: Options<string>;
    constructor(baseLink: string, options: Options<string>) {
        this.baseLink = baseLink;
        this.options = options;
    }

    getResp(
        { endpoint, options = {} }: { endpoint: string; options?: Options<string> },
        callback: Callback<NewsData> | Callback<SourceData> = (): void => {
            console.error('No callback for GET response');
        },
        keySearch = ''
    ): void {
        this.load('GET', endpoint, callback, options, keySearch);
    }

    errorHandler(res: Response): Response {
        if (!res.ok) {
            if (res.status === ErrorStatus.Authenticate || res.status === ErrorStatus.NotFound)
                console.log(`Sorry, but there is ${res.status} error: ${res.statusText}`);
            throw Error(res.statusText);
        }

        return res;
    }

    makeUrl(options: Options<string>, endpoint: string, keySearch: string): string {
        const urlOptions = { ...this.options, ...options };
        let url = `${this.baseLink}${endpoint}?`;
        if (keySearch) {
            Object.keys(urlOptions).forEach((key) => {
                url += `q=${keySearch}&${key}=${urlOptions[key]}`;
            });
            return url;
        }
        Object.keys(urlOptions).forEach((key) => {
            url += `${key}=${urlOptions[key]}&`;
        });

        return url.slice(0, -1);
    }

    load(
        method: string,
        endpoint: string,
        callback: Callback<NewsData> | Callback<SourceData>,
        options = {},
        keySearch: string
    ) {
        fetch(this.makeUrl(options, endpoint, keySearch), { method })
            .then(this.errorHandler)
            .then((res) => res.json())
            .then((data) => callback(data))
            .catch((err) => console.error(err));
    }
}

export default Loader;
