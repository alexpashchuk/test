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
        const sourcesElem: HTMLElement | null = document.querySelector('.sources');
        sourcesElem?.addEventListener('click', (e): void =>
            this.controller.getNews(e, (data?: NewsData) => this.view.drawNews(data))
        );
        const searchElem: HTMLElement | null = document.querySelector('.search');
        searchElem?.addEventListener('submit', (e): void => {
            e.preventDefault();
            return this.controller.getSearch((data?: NewsData) => this.view.drawNews(data));
        });
        this.controller.getSources((data?: SourceData) => this.view.drawSources(data));
    }
}

export default App;
