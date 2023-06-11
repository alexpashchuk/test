import AppController from '../controller/controller';
import { AppView } from '../view/appView';
import { NewsData, SourceData } from './types';

class App {
    private controller: AppController;
    private view: AppView;
    constructor() {
        this.controller = new AppController();
        this.view = new AppView();
    }

    start(): void {
        (<HTMLElement>document.querySelector('.sources')).addEventListener('click', (e): void =>
            this.controller.getNews(e, (data?: NewsData) => this.view.drawNews(data))
        );
        (<HTMLElement>document.querySelector('.search__btn')).addEventListener('click', (): void =>
            this.controller.getSearch((data?: NewsData) => this.view.drawNews(data))
        );
        this.controller.getSources((data?: SourceData) => this.view.drawSources(data));
    }
}

export default App;
