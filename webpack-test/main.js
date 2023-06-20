/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
var __webpack_exports__ = {};

;// CONCATENATED MODULE: ./src/components/app/constants.ts
var Links;
(function (Links) {
    Links["local"] = "https://newsapi.org/v2/";
    Links["deploy"] = "https://rss-news-api.onrender.com/";
})(Links || (Links = {}));
var Api;
(function (Api) {
    Api["key1"] = "b3095f32b45e4809b0761a77753ace53";
    Api["key2"] = "ea66c5f005934e05a284826b3b050d0a";
})(Api || (Api = {}));
var ErrorStatus;
(function (ErrorStatus) {
    ErrorStatus[ErrorStatus["NotFound"] = 404] = "NotFound";
    ErrorStatus[ErrorStatus["Authenticate"] = 401] = "Authenticate";
})(ErrorStatus || (ErrorStatus = {}));

;// CONCATENATED MODULE: ./src/components/controller/loader.ts

class Loader {
    baseLink;
    options;
    constructor(baseLink, options) {
        this.baseLink = baseLink;
        this.options = options;
    }
    getResp({ endpoint, options = {} }, callback = () => {
        console.error('No callback for GET response');
    }, keySearch = '') {
        this.load('GET', endpoint, callback, options, keySearch);
    }
    errorHandler(res) {
        if (!res.ok) {
            if (res.status === ErrorStatus.Authenticate || res.status === ErrorStatus.NotFound)
                console.log(`Sorry, but there is ${res.status} error: ${res.statusText}`);
            throw Error(res.statusText);
        }
        return res;
    }
    makeUrl(options, endpoint, keySearch) {
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
    load(method, endpoint, callback, options = {}, keySearch) {
        fetch(this.makeUrl(options, endpoint, keySearch), { method })
            .then(this.errorHandler)
            .then((res) => res.json())
            .then((data) => callback(data))
            .catch((err) => console.error(err));
    }
}
/* harmony default export */ const loader = (Loader);

;// CONCATENATED MODULE: ./src/components/controller/appLoader.ts


class AppLoader extends loader {
    constructor() {
        super(Links.deploy, {
            apiKey: Api.key2,
        });
    }
}
/* harmony default export */ const appLoader = (AppLoader);

;// CONCATENATED MODULE: ./src/components/controller/controller.ts

class AppController extends appLoader {
    getSources(callback) {
        super.getResp({
            endpoint: 'sources',
        }, callback);
    }
    getSearch(callback) {
        const searchInput = document.querySelector('.search__input');
        const keySearch = searchInput.value;
        super.getResp({
            endpoint: 'everything',
        }, callback, keySearch);
    }
    getNews(e, callback) {
        let target = e.target;
        const newsContainer = e.currentTarget;
        while (target !== newsContainer) {
            if (target.classList.contains('source__item')) {
                const sourceId = target.getAttribute('data-source-id');
                if (newsContainer.getAttribute('data-source') !== sourceId) {
                    newsContainer.setAttribute('data-source', sourceId);
                    super.getResp({
                        endpoint: 'everything',
                        options: {
                            sources: sourceId,
                        },
                    }, callback);
                }
                return;
            }
            target = target.parentNode;
        }
    }
}
/* harmony default export */ const controller = (AppController);

;// CONCATENATED MODULE: ./src/utils/utils.ts
const getElement = (root, selector) => {
    const element = root.querySelector(selector);
    if (!element) {
        throw new TypeError(`There is no element with selector: ${selector}`);
    }
    return element;
};

;// CONCATENATED MODULE: ./src/components/view/news/news.ts


class News {
    draw(data) {
        const news = data.length >= 10 ? data.filter((_item, idx) => idx < 10) : data;
        const fragment = document.createDocumentFragment();
        const newsItemTemp = document.querySelector('#newsItemTemp');
        news.forEach((item, idx) => {
            const newsClone = newsItemTemp?.content.cloneNode(true);
            if (idx % 2)
                getElement(newsClone, '.news__item').classList.add('alt');
            getElement(newsClone, '.news__meta-photo').style.backgroundImage = `url(${item.urlToImage || './assets/news_placeholder.jpg'})`;
            getElement(newsClone, '.news__meta-author').textContent =
                item.author || item.source.name;
            getElement(newsClone, '.news__meta-date').textContent = item.publishedAt
                .slice(0, 10)
                .split('-')
                .reverse()
                .join('-');
            getElement(newsClone, '.news__description-title').textContent = item.title;
            getElement(newsClone, '.news__description-source').textContent = item.source.name;
            getElement(newsClone, '.news__description-content').textContent = item.description;
            getElement(newsClone, '.news__read-more a').setAttribute('href', item.url);
            fragment.append(newsClone);
        });
        const el = document.querySelector('.news');
        if (el) {
            el.innerHTML = '';
            el.appendChild(fragment);
        }
    }
}
/* harmony default export */ const news = (News);

;// CONCATENATED MODULE: ./src/components/view/sources/sources.ts


class Sources {
    draw(data) {
        const fragment = document.createDocumentFragment();
        const sourceItemTemp = document.querySelector('#sourceItemTemp');
        data.forEach((item) => {
            const sourceClone = sourceItemTemp?.content.cloneNode(true);
            getElement(sourceClone, '.source__item-name').textContent = item.name;
            getElement(sourceClone, '.source__item').setAttribute('data-source-id', item.id);
            fragment.append(sourceClone);
        });
        const sourcesElem = document.querySelector('.sources');
        sourcesElem?.append(fragment);
    }
}
/* harmony default export */ const sources = (Sources);

;// CONCATENATED MODULE: ./src/components/view/appView.ts


class AppView {
    news;
    sources;
    constructor() {
        this.news = new news();
        this.sources = new sources();
    }
    drawNews(data) {
        const values = data?.articles ? data?.articles : [];
        this.news.draw(values);
    }
    drawSources(data) {
        const values = data?.sources ? data?.sources : [];
        this.sources.draw(values);
    }
}
/* harmony default export */ const appView = ((/* unused pure expression or super */ null && (AppView)));

;// CONCATENATED MODULE: ./src/components/app/app.ts


class App {
    controller;
    view;
    constructor() {
        this.controller = new controller();
        this.view = new AppView();
    }
    start() {
        const sourcesElem = document.querySelector('.sources');
        sourcesElem?.addEventListener('click', (e) => this.controller.getNews(e, (data) => this.view.drawNews(data)));
        const searchElem = document.querySelector('.search');
        searchElem?.addEventListener('submit', (e) => {
            e.preventDefault();
            return this.controller.getSearch((data) => this.view.drawNews(data));
        });
        this.controller.getSources((data) => this.view.drawSources(data));
    }
}
/* harmony default export */ const app = (App);

;// CONCATENATED MODULE: ./src/index.ts


const src_app = new app();
src_app.start();

/******/ })()
;