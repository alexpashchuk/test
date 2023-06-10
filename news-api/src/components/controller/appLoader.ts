import Loader from './loader';

class AppLoader extends Loader {
    constructor() {
        super('https://rss-news-api.onrender.com/', {
            apiKey: 'b3095f32b45e4809b0761a77753ace53',
        });
    }
}

export default AppLoader;
