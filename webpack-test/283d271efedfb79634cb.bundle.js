/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ 855:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ 46:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ 884:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ 717:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
const controller_1 = __importDefault(__webpack_require__(842));
const appView_1 = __webpack_require__(527);
class App {
    controller;
    view;
    constructor() {
        this.controller = new controller_1.default();
        this.view = new appView_1.AppView();
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
exports["default"] = App;


/***/ }),

/***/ 749:
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ErrorStatus = exports.Api = exports.Links = void 0;
var Links;
(function (Links) {
    Links["local"] = "https://newsapi.org/v2/";
    Links["deploy"] = "https://rss-news-api.onrender.com/";
})(Links = exports.Links || (exports.Links = {}));
var Api;
(function (Api) {
    Api["key1"] = "b3095f32b45e4809b0761a77753ace53";
    Api["key2"] = "ea66c5f005934e05a284826b3b050d0a";
})(Api = exports.Api || (exports.Api = {}));
var ErrorStatus;
(function (ErrorStatus) {
    ErrorStatus[ErrorStatus["NotFound"] = 404] = "NotFound";
    ErrorStatus[ErrorStatus["Authenticate"] = 401] = "Authenticate";
})(ErrorStatus = exports.ErrorStatus || (exports.ErrorStatus = {}));


/***/ }),

/***/ 853:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
const loader_1 = __importDefault(__webpack_require__(24));
const constants_1 = __webpack_require__(749);
class AppLoader extends loader_1.default {
    constructor() {
        super(constants_1.Links.deploy, {
            apiKey: constants_1.Api.key2,
        });
    }
}
exports["default"] = AppLoader;


/***/ }),

/***/ 842:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
const appLoader_1 = __importDefault(__webpack_require__(853));
class AppController extends appLoader_1.default {
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
exports["default"] = AppController;


/***/ }),

/***/ 24:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const constants_1 = __webpack_require__(749);
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
            if (res.status === constants_1.ErrorStatus.Authenticate || res.status === constants_1.ErrorStatus.NotFound)
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
exports["default"] = Loader;


/***/ }),

/***/ 527:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AppView = void 0;
const news_1 = __importDefault(__webpack_require__(798));
const sources_1 = __importDefault(__webpack_require__(53));
class AppView {
    news;
    sources;
    constructor() {
        this.news = new news_1.default();
        this.sources = new sources_1.default();
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
exports.AppView = AppView;
exports["default"] = AppView;


/***/ }),

/***/ 798:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
__webpack_require__(855);
const utils_1 = __webpack_require__(974);
class News {
    draw(data) {
        const news = data.length >= 10 ? data.filter((_item, idx) => idx < 10) : data;
        const fragment = document.createDocumentFragment();
        const newsItemTemp = document.querySelector('#newsItemTemp');
        news.forEach((item, idx) => {
            const newsClone = newsItemTemp?.content.cloneNode(true);
            if (idx % 2)
                (0, utils_1.getElement)(newsClone, '.news__item').classList.add('alt');
            (0, utils_1.getElement)(newsClone, '.news__meta-photo').style.backgroundImage = `url(${item.urlToImage || './assets/news_placeholder.jpg'})`;
            (0, utils_1.getElement)(newsClone, '.news__meta-author').textContent =
                item.author || item.source.name;
            (0, utils_1.getElement)(newsClone, '.news__meta-date').textContent = item.publishedAt
                .slice(0, 10)
                .split('-')
                .reverse()
                .join('-');
            (0, utils_1.getElement)(newsClone, '.news__description-title').textContent = item.title;
            (0, utils_1.getElement)(newsClone, '.news__description-source').textContent = item.source.name;
            (0, utils_1.getElement)(newsClone, '.news__description-content').textContent = item.description;
            (0, utils_1.getElement)(newsClone, '.news__read-more a').setAttribute('href', item.url);
            fragment.append(newsClone);
        });
        const el = document.querySelector('.news');
        if (el) {
            el.innerHTML = '';
            el.appendChild(fragment);
        }
    }
}
exports["default"] = News;


/***/ }),

/***/ 53:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
__webpack_require__(46);
const utils_1 = __webpack_require__(974);
class Sources {
    draw(data) {
        const fragment = document.createDocumentFragment();
        const sourceItemTemp = document.querySelector('#sourceItemTemp');
        data.forEach((item) => {
            const sourceClone = sourceItemTemp?.content.cloneNode(true);
            (0, utils_1.getElement)(sourceClone, '.source__item-name').textContent = item.name;
            (0, utils_1.getElement)(sourceClone, '.source__item').setAttribute('data-source-id', item.id);
            fragment.append(sourceClone);
        });
        const sourcesElem = document.querySelector('.sources');
        sourcesElem?.append(fragment);
    }
}
exports["default"] = Sources;


/***/ }),

/***/ 607:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
const app_1 = __importDefault(__webpack_require__(717));
__webpack_require__(884);
const app = new app_1.default();
app.start();


/***/ }),

/***/ 974:
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.getElement = void 0;
const getElement = (root, selector) => {
    const element = root.querySelector(selector);
    if (!element) {
        throw new TypeError(`There is no element with selector: ${selector}`);
    }
    return element;
};
exports.getElement = getElement;


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module is referenced by other modules so it can't be inlined
/******/ 	var __webpack_exports__ = __webpack_require__(607);
/******/ 	
/******/ })()
;