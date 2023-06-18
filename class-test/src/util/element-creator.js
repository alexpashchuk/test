export default class ElementCreator {
    constructor(params) {
        this.element = null
        this.createElement(params)
    }
    createElement(params) {
        this.element = document.createElement(params.tag);
        this.setCssClasses(params.className);
        this.setTextContent(params.textContent);
        this.setCallback(params.callback);
    }

    getElement() {
        return this.element;
    }

    setCssClasses(cssClasses = []) {
        cssClasses.map((cssClass) => this.element.classList.add(cssClass));
    }

    setTextContent(text = '') {
        this.element.textContent = text;
    }

    setCallback(callback) {
        if (typeof callback === 'function') {
            this.element.addEventListener('click', (event) => callback(event));
        }
    }

}
