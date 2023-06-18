import Loader from './loader';
import { Api, Links } from '../app/constants';

class AppLoader extends Loader {
    constructor() {
        super(Links.deploy, {
            apiKey: Api.key2,
        });
    }
}

export default AppLoader;
