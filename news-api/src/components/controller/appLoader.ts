import Loader from './loader';
import { newsLinks } from '../app/types';

class AppLoader extends Loader {
    constructor() {
        super(newsLinks.linkDeploy, {
            apiKey: 'b3095f32b45e4809b0761a77753ace53',
        });
    }
}

export default AppLoader;
