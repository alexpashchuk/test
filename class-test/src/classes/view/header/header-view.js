import './header.css';
import View from '../view';

const CssClasses = {
    HEADER: 'header',
};
const TEXT = 'Header';

export default class HeaderView extends View {
    constructor() {
        /**
         * @type {import('../view').ViewParams}
         */
        const params = {
            tag: 'header',
            classNames: [CssClasses.HEADER],
        };
        super(params);
        this.configureView();
    }

    configureView() {
        this.viewElementCreator.setTextContent(TEXT);
    }
}
