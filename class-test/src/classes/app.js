import '../style.css';
import FooterView from './view/footer/footer-view';
import HeaderView from './view/header/header-view';

export default class App {
    constructor() {
        this.createView();
    }

    createView() {
        const footer = new FooterView();
        const header = new HeaderView();

        document.body.append(header.getHtmlElement(),footer.getHtmlElement());
    }
}
