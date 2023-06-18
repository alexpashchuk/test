import './footer.css';
import ElementCreator from '../../../util/element-creator';


const CssClasses = {
    FOOTER: 'footer',
};
const TEXT = 'SPA example app';

export default class FooterView {
    constructor() {
        this.elementCreator = this.createView()
    }
    getHtmlElement() {
        return this.elementCreator.getElement()
    }
    createView () {
        const params = {
            tag: 'footer',
            className: [CssClasses.FOOTER],
            textContent: TEXT,
            callback: null
        }
        return new ElementCreator(params)
    }
}
