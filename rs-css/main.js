/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
var __webpack_exports__ = {};

;// CONCATENATED MODULE: ./src/interface/enums.ts
var Classes;
(function (Classes) {
    Classes["CONTAINER"] = "container";
    Classes["WRAPPER"] = "wrapper";
    Classes["LEVEL"] = "level";
    Classes["PASSED"] = "passed";
    Classes["NOT_PASSED"] = "not-passed";
    Classes["LEVEL_HEADER"] = "level-header";
    Classes["LEVEL_TITLE"] = "level-title";
    Classes["LIST_ACTIVE"] = "list-active";
    Classes["LEVEL_HELP"] = "level-help";
    Classes["LEVEL_MENU"] = "level-menu";
    Classes["LEVEL_LIST"] = "level-list";
    Classes["LIST_ITEM"] = "list-item";
    Classes["SELECTOR_NAME"] = "selector-name";
    Classes["TITLE"] = "title";
    Classes["SYNTAX"] = "syntax";
    Classes["DESCRIPTION"] = "description";
    Classes["CHECK_MARK"] = "check-mark";
    Classes["CHECK"] = "check";
    Classes["BURGER"] = "burger";
    Classes["OPEN"] = "open";
    Classes["EXAMPLES"] = "examples";
    Classes["EXAMPLE"] = "example";
    Classes["RESET"] = "reset";
    Classes["GAME"] = "game";
    Classes["EDITOR"] = "editor";
    Classes["EDITOR_WRAPPER"] = "editor-wrapper";
    Classes["EDITOR_MAIN"] = "editor-main";
    Classes["VIEWER"] = "viewer";
    Classes["VIEWER_MAIN"] = "viewer-main";
    Classes["NUMBERS"] = "numbers";
    Classes["HTML_CODE"] = "html-code";
    Classes["LAYOUT"] = "layout";
    Classes["LAYOUT_HEADER"] = "layout-header";
    Classes["HEADING_WRAPPER"] = "heading-wrapper";
    Classes["TABLE_PLANETS"] = "table-planets";
    Classes["TOOLTIP"] = "tooltip";
    Classes["FORM"] = "form";
    Classes["FORM_BUTTON"] = "form-button";
    Classes["FORM_INPUT"] = "form-input";
    Classes["FORM_HELP"] = "form-help";
    Classes["BLINK"] = "blink";
    Classes["SHAKE"] = "shake";
    Classes["SELECTED"] = "selected";
    Classes["BUTTON_TEXT"] = "button-text";
    Classes["TABLE_WRAPPER"] = "table-wrapper";
    Classes["TABLE"] = "table";
    Classes["BUTTON_MENU"] = "button-menu";
    Classes["BUTTON_PREV"] = "button-prev";
    Classes["BUTTON_NEXT"] = "button-next";
    Classes["RS_SCHOOL"] = "rs-school";
    Classes["YEARS"] = "years";
    Classes["GIT"] = "git";
    Classes["FOOTER"] = "footer";
    Classes["BACKLIGHT"] = "backlight";
    Classes["ACTIVE"] = "active";
    Classes["HIDDEN"] = "hidden";
    Classes["SCORE"] = "score";
    Classes["GAME_WIN"] = "game-win";
    Classes["CORRECT"] = "correct";
    Classes["INCORRECT"] = "incorrect";
    Classes["MISSED"] = "missed";
    Classes["TITLE_RESULTS"] = "results";
})(Classes || (Classes = {}));
var Tags;
(function (Tags) {
    Tags["H2"] = "h2";
    Tags["H3"] = "h3";
    Tags["DIV"] = "div";
    Tags["SPAN"] = "span";
    Tags["P"] = "p";
    Tags["BUTTON"] = "button";
    Tags["UL"] = "ul";
    Tags["LI"] = "li";
    Tags["FORM"] = "form";
    Tags["I"] = "i";
    Tags["INPUT"] = "input";
    Tags["SECTION"] = "section";
    Tags["FOOTER"] = "footer";
})(Tags || (Tags = {}));
var Text;
(function (Text) {
    Text["CSS"] = "CSS Editor";
    Text["STYLE"] = "style.css";
    Text["HTML"] = "HTML viewer";
    Text["INDEX"] = "index.html";
    Text["EXAMPLES"] = "Examples";
    Text["RESET"] = "RESET";
    Text["PLACEHOLDER"] = "Type in a CSS selector";
    Text["ENTER"] = "ENTER";
    Text["HELP"] = "HELP";
    Text["GITHUB"] = "github";
    Text["LINK_GITHUB"] = "https://github.com/alexpashchuk";
    Text["RS"] = "\u00A9 RS-CSS 2023";
    Text["LINK_RS"] = "https://rs.school/js/";
    Text["YOU_WIN"] = "YOU WIN";
    Text["CORRECT"] = "correct";
    Text["INCORRECT"] = "incorrect";
    Text["MISSED"] = "missed";
    Text["RESULTS"] = "Results:";
})(Text || (Text = {}));


;// CONCATENATED MODULE: ./src/components/createElements.ts

class CreateElements {
    levelHeader = document.createElement(Tags.DIV);
    rootLevel = document.createElement(Tags.DIV);
    rootMenu = document.createElement(Tags.DIV);
    levelNumber = document.createElement(Tags.SPAN);
    listMenu = document.createElement(Tags.UL);
    rootHelp = document.createElement(Tags.DIV);
    input = document.createElement(Tags.INPUT);
    table = document.createElement(Tags.SECTION);
    htmlCode = document.createElement(Tags.DIV);
    formEditor = document.createElement(Tags.FORM);
    createBlock = (tagName, className, ...arg) => {
        const block = document.createElement(tagName);
        if (Array.isArray(className)) {
            block.classList.add(...className);
        }
        else if (typeof className === 'string') {
            block.classList.add(className);
        }
        block.append(...arg);
        return block;
    };
    createHeaderElement = (tagName, className, title, description) => {
        const headerEditor = document.createElement(tagName);
        headerEditor.classList.add(`${className}-header`);
        headerEditor.append(this.createElement(tagName, [`${className}-item`], title), this.createElement(tagName, [`${className}-item`], description));
        return headerEditor;
    };
    createElement = (tagName, className, text) => {
        const element = document.createElement(tagName);
        element.classList.add(...className);
        element.innerHTML = text || '';
        return element;
    };
    createLink = (className, text, href) => {
        const element = document.createElement('a');
        element.classList.add(...className);
        element.innerHTML = text || '';
        element.href = href;
        return element;
    };
    createButton = (className, type, functions, text, ...arg) => {
        const button = document.createElement(Tags.BUTTON);
        button.classList.add(...className);
        button.innerHTML = text || '';
        button.type = type;
        button.addEventListener('click', functions);
        button.append(...arg);
        return button;
    };
}

;// CONCATENATED MODULE: ./src/components/createLevel.ts


class CreateLevel extends CreateElements {
    isPrintText = true;
    isGame = true;
    levelActive = Number(localStorage.getItem('level')) || 0;
    levels;
    constructor(data) {
        super();
        this.levels = data;
    }
    createLevelHeader = () => {
        this.levelHeader.classList.add(Classes.LEVEL_HEADER);
        this.levelNumber.classList.add(Classes.LEVEL_TITLE);
        this.levelNumber.textContent = `Level ${this.levelActive + 1} of ${this.levels.length}`;
        this.levelHeader.append(this.createButton([Classes.BUTTON_MENU], 'button', this.toggleMenu, '', this.createElement(Tags.DIV, [Classes.BURGER])));
        this.levelHeader.append(this.levelNumber);
        this.levelHeader.append(this.createElement(Tags.SPAN, [Classes.CHECK_MARK, Classes.CHECK]));
        this.levelHeader.append(this.createButton([Classes.BUTTON_PREV], 'button', this.showPrevLevel, ''));
        this.levelHeader.append(this.createButton([Classes.BUTTON_NEXT], 'button', this.showNextLevel, ''));
        return this.levelHeader;
    };
    createMenuLevel = () => {
        this.rootMenu.classList.add(Classes.LEVEL_MENU);
        this.listMenu.classList.add(Classes.LEVEL_LIST);
        for (let i = 0; i < this.levels.length; i += 1) {
            const item = document.createElement('li');
            item.classList.add('list-item');
            item.classList.add(this.levelActive + 1 === i + 1 ? Classes.LIST_ACTIVE : Classes.LIST_ITEM);
            item.id = (i + 1).toString();
            item.innerHTML = `<span class="check-mark" aria-hidden="true"></span>
            <span class="list-text">${i + 1}.${this.levels[i].syntax}</span>`;
            this.listMenu.append(item);
            item.addEventListener('click', () => {
                this.levelActive = +item.id - 1;
                this.getNewLevel();
                this.toggleMenu();
            });
        }
        this.rootMenu.append(this.listMenu);
        return this.rootMenu;
    };
    createLevelHelp = () => {
        this.rootHelp.innerHTML = '';
        this.rootHelp.classList.add(Classes.LEVEL_HELP);
        this.rootHelp.append(this.createElement(Tags.H2, [Classes.SELECTOR_NAME], this.levels[this.levelActive].selectorName), this.createElement(Tags.H3, [Classes.TITLE], this.levels[this.levelActive].helpTitle), this.createElement(Tags.H2, [Classes.SYNTAX], this.levels[this.levelActive].syntax), this.createElement(Tags.P, [Classes.DESCRIPTION], this.levels[this.levelActive].help), this.createButton([Classes.RESET], 'button', this.reset, Text.RESET));
        if (this.levels[this.levelActive].examples) {
            this.rootHelp.append(this.createElement(Tags.H3, [Classes.EXAMPLES], Text.EXAMPLES));
            this.levels[this.levelActive].examples?.forEach((el) => this.rootHelp.append(this.createElement(Tags.DIV, [Classes.EXAMPLE], el)));
        }
        return this.rootHelp;
    };
    reset = () => {
        this.levelActive = 0;
        localStorage.clear();
        this.getNewLevel();
    };
    showNextLevel = () => {
        if (+this.levelActive <= this.levels.length - 1) {
            this.levelActive += 1;
            this.getNewLevel();
        }
    };
    showPrevLevel = () => {
        if (this.levelActive > 0) {
            this.levelActive -= 1;
            this.getNewLevel();
        }
    };
    toggleMenu = () => {
        const burgerLevel = document.querySelector('.button-menu');
        const menuLevel = document.querySelector('.level-menu');
        burgerLevel.classList.toggle(Classes.OPEN);
        menuLevel.classList.toggle(Classes.OPEN);
    };
    toggleListActives = () => {
        this.levelHeader.children[2].classList.remove(Classes.NOT_PASSED, Classes.PASSED);
        this.levelNumber.textContent = `Level ${this.levelActive + 1} of ${this.levels.length}`;
        const objProgress = JSON.parse(localStorage.getItem('progress') || '{}') || {};
        if (objProgress[this.levelActive] && objProgress[this.levelActive].correct) {
            this.levelHeader.children[2].classList.add(Classes.PASSED);
        }
        if (objProgress[this.levelActive] && objProgress[this.levelActive].incorrect) {
            this.levelHeader.children[2].classList.add(Classes.NOT_PASSED);
        }
        this.listMenu.querySelectorAll(`.${Classes.LIST_ITEM}`).forEach((item, i) => {
            item.classList.remove(Classes.LIST_ACTIVE);
            if (+item.id === this.levelActive + 1)
                item.classList.add(Classes.LIST_ACTIVE);
            if (objProgress[`${i}`]) {
                item.children[0].classList.remove(Classes.NOT_PASSED, Classes.PASSED);
                if (objProgress[`${i}`].correct && !objProgress[`${i}`].incorrect) {
                    item.children[0].classList.add(Classes.PASSED);
                }
                if (objProgress[`${i}`].incorrect && !objProgress[`${i}`].correct) {
                    item.children[0].classList.add(Classes.NOT_PASSED);
                }
            }
        });
    };
    getNewLevel = () => {
        if (this.levelActive < this.levels.length) {
            this.isGame = true;
            this.htmlCode.innerHTML = ``;
            this.input.value = '';
            this.input.classList.add(Classes.BLINK);
            this.input.focus();
            this.isPrintText = true;
            this.htmlCode.append(this.getViewerCode(this.levels[this.levelActive].boardMarkup));
            this.table.innerHTML = this.levels[this.levelActive].boardMarkup;
            const elem = document.querySelector('.layout-header');
            elem.innerHTML = this.levels[this.levelActive].doThis;
            this.table.querySelectorAll('*').forEach((item) => {
                if (item.closest(this.levels[this.levelActive].selector)) {
                    item.closest(`${this.levels[this.levelActive].selector}`)?.classList.add(Classes.SELECTED);
                }
            });
            this.rootLevel.removeChild(this.rootHelp);
            this.rootLevel.append(this.createLevelHelp());
            this.toggleListActives();
            localStorage.setItem('level', `${this.levelActive}`);
        }
        else {
            this.isGame = false;
            this.input.value = '';
            this.table.innerHTML = '';
            this.showWinningResult();
        }
    };
    showWinningResult = () => {
        const layout = document.querySelector(`.${Classes.LAYOUT}`);
        const objProgress = JSON.parse(localStorage.getItem('progress') || '{}');
        let countCorrect = 0;
        let countIncorrect = 0;
        Object.keys(objProgress).forEach((e) => {
            if (objProgress[e].correct)
                countCorrect += 1;
            if (objProgress[e].incorrect)
                countIncorrect += 1;
        });
        const winMessage = this.createElement(Tags.DIV, [Classes.GAME_WIN], Text.YOU_WIN);
        const missedMessage = this.createElement(Tags.P, [Classes.MISSED], `${Text.MISSED}: ${this.levels.length - countCorrect - countIncorrect}`);
        const correctMessage = this.createElement(Tags.P, [Classes.CORRECT], `${Text.CORRECT}: ${countCorrect}`);
        const incorrectMessage = this.createElement(Tags.P, [Classes.INCORRECT], `${Text.INCORRECT}: ${countIncorrect}`);
        const resultScore = countCorrect === this.levels.length
            ? winMessage
            : this.createBlock(Tags.DIV, [Classes.SCORE], this.createElement(Tags.H2, [Classes.TITLE_RESULTS], Text.RESULTS), correctMessage, incorrectMessage, missedMessage);
        layout.append(resultScore);
    };
    getAttributes = (child) => {
        let childClass;
        const elemChild = child.getAttribute('class');
        if (elemChild) {
            childClass = elemChild
                .split(' ')
                .filter((e) => e !== 'selected')
                .join('');
        }
        const childId = child.getAttribute('id');
        const childName = child.getAttribute('name');
        return `${childClass ? ` class="${childClass}"` : ''}${childName ? ` name="${childName}"` : ''}${childId ? ` id="${childId}"` : ''}`;
    };
    getViewerCode = (item) => {
        const container = document.createElement('div');
        typeof item === 'string' ? (container.innerHTML = item) : container.append(item);
        const result = typeof item === 'string' ? document.createDocumentFragment() : item;
        const arrayContainer = Array.prototype.slice.call(container.childNodes).filter((el) => el.nodeName !== '#text');
        for (let i = 0; i < arrayContainer.length; i += 1) {
            const div = document.createElement('div');
            const child = arrayContainer[i];
            if (child.children.length > 0) {
                div.append(`<${child.nodeName.toLocaleLowerCase()}${this.getAttributes(child)}>`);
                for (let j = 0; j < child.children.length; j += 1) {
                    const elemChild = child.children[j].cloneNode(true);
                    const elemChildNode = elemChild && this.getViewerCode(elemChild).firstChild;
                    div.append(elemChildNode);
                }
                div.append(`</${child.nodeName.toLocaleLowerCase()}>`);
            }
            else {
                div.append(child.outerHTML);
            }
            result.append(div);
        }
        return result;
    };
    createBlockLevel = () => {
        this.rootLevel.classList.add(Classes.LEVEL);
        this.rootLevel.append(this.createLevelHeader(), this.createMenuLevel(), this.createLevelHelp());
        this.toggleListActives();
        return this.rootLevel;
    };
}
/* harmony default export */ const createLevel = (CreateLevel);

;// CONCATENATED MODULE: ./src/utils/utils.ts
const normalizeHtml = (string) => {
    const elements = string.split('\n').map((el) => {
        if (el.includes('/>')) {
            const newEl = el.trim();
            const indexStart = newEl.indexOf('<') + 1;
            const indexEnd = newEl.replace('/>', ' />').indexOf(' ');
            const tag = newEl.slice(indexStart, indexEnd);
            return `${newEl.replace('/>', '>')}</${tag}>`;
        }
        return el;
    });
    return elements.join('');
};

;// CONCATENATED MODULE: ./src/components/game.ts



class Game extends createLevel {
    currentElem = null;
    isPassedLevel = true;
    constructor(data) {
        super(data);
        this.levels = data;
    }
    createFormEditor = () => {
        this.formEditor.classList.add(Classes.FORM);
        this.input.classList.add(Classes.FORM_INPUT, Classes.BLINK);
        this.input.placeholder = Text.PLACEHOLDER;
        this.input.type = 'text';
        this.input.focus();
        const button = document.createElement(Tags.BUTTON);
        button.classList.add(Classes.FORM_BUTTON);
        button.type = 'submit';
        button.append(this.createElement(Tags.SPAN, [Classes.BUTTON_TEXT], Text.ENTER));
        this.formEditor.append(this.input, button, this.createButton([Classes.FORM_HELP], 'button', this.showAnswer, Text.HELP));
        this.formEditor.addEventListener('submit', (e) => {
            e.preventDefault();
            if (this.input.value === this.levels[this.levelActive].selector) {
                this.table.querySelectorAll('*').forEach((item) => {
                    if (item.closest(this.levels[this.levelActive].selector)) {
                        item.closest(`${this.levels[this.levelActive].selector}`)?.classList.add('win');
                        item.addEventListener('animationend', () => {
                            this.getNewLevel();
                        });
                    }
                });
                this.setLocalStorageProgress();
                this.levelActive += 1;
                this.isPassedLevel = true;
            }
            else {
                document.querySelector('.editor')?.classList.add(Classes.SHAKE);
                document.querySelector('.editor')?.addEventListener('animationend', () => {
                    document.querySelector('.editor')?.classList.remove(Classes.SHAKE);
                });
            }
        });
        this.input.addEventListener('input', () => {
            return this.input.value.length === 0
                ? this.input.classList.add(Classes.BLINK)
                : this.input.classList.remove(Classes.BLINK);
        });
        return this.formEditor;
    };
    setLocalStorageProgress = () => {
        const progress = JSON.parse(localStorage.getItem('progress') || '{}') || {};
        const result = progress[`${this.levelActive}`] && progress[`${this.levelActive}`].correct
            ? progress
            : { ...progress, [this.levelActive]: { correct: this.isPassedLevel, incorrect: !this.isPassedLevel } };
        localStorage.setItem('progress', JSON.stringify(result));
    };
    showAnswer = () => {
        if (this.isPrintText) {
            this.isPrintText = false;
            const arrayResponseLetters = this.levels[this.levelActive].selector.split('');
            this.input.classList.remove(Classes.BLINK);
            let count = 0;
            const printText = () => {
                if (count === arrayResponseLetters.length)
                    return this.input.value;
                this.input.value += arrayResponseLetters[count];
                count += 1;
                this.input.focus();
                return setTimeout(printText, 500);
            };
            printText();
            this.isPassedLevel = false;
        }
    };
    showTooltip = (element) => {
        if (!element)
            return;
        if (element.tagName) {
            const tooltipText = `&lt;${element.tagName.toLocaleLowerCase()}${this.getAttributes(element)}>&lt/${element.tagName.toLocaleLowerCase()}>`;
            const node = document.querySelector('.tooltip');
            node.classList.toggle(Classes.HIDDEN);
            node.innerHTML = tooltipText;
            node.style.left = `${element.getClientRects()[0].x - 60}px`;
            node.style.top = `${element.getClientRects()[0].y - 50}px`;
        }
    };
    highlightElement = (e) => {
        if (this.isGame) {
            const target = e.target;
            const elementsCode = Array.prototype.slice.call(this.htmlCode.querySelectorAll('*'));
            const elementsTable = Array.prototype.slice.call(this.table.querySelectorAll('*'));
            const index = target.tagName !== 'DIV' ? elementsTable.indexOf(target) : elementsCode.indexOf(target);
            if (e.type === 'mouseover') {
                if (this.currentElem)
                    return;
                this.currentElem = e.target;
                this.showTooltip(elementsTable[index]);
                elementsTable[index]?.classList.add(Classes.ACTIVE);
                elementsCode[index]?.classList.add(Classes.BACKLIGHT);
            }
            if (e.type === 'mouseout') {
                if (!this.currentElem)
                    return;
                elementsTable[index]?.classList.remove(Classes.ACTIVE);
                elementsCode[index]?.classList.remove(Classes.BACKLIGHT);
                this.currentElem = null;
                this.showTooltip(elementsTable[index]);
            }
        }
    };
    createHtmlCode = () => {
        this.htmlCode.classList.add(Classes.HTML_CODE);
        this.htmlCode.append(this.getViewerCode(this.levels[this.levelActive].boardMarkup));
        this.htmlCode.addEventListener('mouseover', (e) => {
            const target = e.target;
            if (target.className !== Classes.HTML_CODE) {
                this.highlightElement(e);
            }
        });
        this.htmlCode.addEventListener('mouseout', (e) => {
            const target = e.target;
            if (target.className !== Classes.HTML_CODE) {
                this.highlightElement(e);
            }
        });
        return this.htmlCode;
    };
    createTable = () => {
        this.table.classList.add(Classes.TABLE);
        this.table.innerHTML = normalizeHtml(this.levels[this.levelActive].boardMarkup);
        this.table.querySelectorAll('*').forEach((item) => {
            if (item.closest(this.levels[this.levelActive].selector)) {
                item.closest(`${this.levels[this.levelActive].selector}`)?.classList.add(Classes.SELECTED);
            }
        });
        this.table.addEventListener('mouseover', (e) => {
            const target = e.target;
            if (target.className !== Classes.TABLE) {
                this.highlightElement(e);
            }
        });
        this.table.addEventListener('mouseout', (e) => {
            const target = e.target;
            if (target.className !== Classes.TABLE) {
                this.highlightElement(e);
            }
        });
        return this.table;
    };
    createLineNumber = () => {
        const lineNumber = document.createElement(Tags.DIV);
        lineNumber.classList.add(Classes.NUMBERS);
        for (let i = 0; i < 15; i += 1) {
            lineNumber.innerHTML += `${i + 1}<br>`;
        }
        return lineNumber;
    };
    createWrapperGame = () => {
        const container = document.createElement(Tags.DIV);
        container.classList.add(Classes.GAME);
        container.append(this.createBlock(Tags.DIV, Classes.HEADING_WRAPPER, this.createElement(Tags.H2, [Classes.LAYOUT_HEADER], this.levels[this.levelActive].doThis)), this.createBlock(Tags.DIV, [Classes.LAYOUT], this.createBlock(Tags.DIV, Classes.TABLE_PLANETS, this.createBlock(Tags.DIV, [Classes.TABLE_WRAPPER], this.createTable()))), this.createBlock(Tags.DIV, Classes.EDITOR_WRAPPER, this.createBlock(Tags.DIV, [Classes.EDITOR], this.createHeaderElement(Tags.DIV, [Classes.EDITOR], Text.CSS, Text.STYLE), this.createBlock(Tags.DIV, [Classes.EDITOR_MAIN], this.createFormEditor(), this.createLineNumber())), this.createBlock(Tags.DIV, [Classes.VIEWER], this.createHeaderElement(Tags.DIV, [Classes.VIEWER], Text.HTML, Text.INDEX), this.createBlock(Tags.DIV, [Classes.VIEWER_MAIN], this.createLineNumber(), this.createHtmlCode()))), this.createBlock(Tags.FOOTER, [Classes.FOOTER], this.createLink([Classes.GIT], Text.GITHUB, Text.LINK_GITHUB), this.createElement(Tags.DIV, [Classes.YEARS], Text.RS), this.createLink([Classes.RS_SCHOOL], '', Text.LINK_RS)));
        return container;
    };
    initApp = () => {
        const container = document.createElement(Tags.DIV);
        container.classList.add(Classes.WRAPPER);
        container.append(this.createBlockLevel(), this.createWrapperGame(), this.createElement(Tags.DIV, [Classes.TOOLTIP]));
        document.body.append(container);
    };
}

;// CONCATENATED MODULE: ./src/data/levelsData.ts
const levelsData = [
    {
        helpTitle: 'Select elements by their type',
        selectorName: 'Type Selector',
        doThis: 'Select the birds',
        selector: 'bird',
        syntax: 'A',
        help: 'Selects all elements of type <strong>A</strong>. Type refers to the type of tag, so <tag>div</tag>, <tag>p</tag> and <tag>ul</tag> are all different element types.',
        examples: [
            '<strong>div</strong> selects all <tag>div</tag> elements.',
            '<strong>p</strong> selects all <tag>p</tag> elements.',
        ],
        boardMarkup: `
      <bird class='skywalker'></bird>
      <bird class='skywalker'></bird>
      <bird class='skywalker'></bird>
      `,
    },
    {
        helpTitle: 'Select an element inside another element',
        selectorName: 'Type Selector',
        doThis: 'Select the vader bird',
        selector: 'ship pig',
        syntax: 'A B',
        help: 'Selects all <strong>B</strong> inside of <strong>A</strong>. <strong>B</strong> is called a descendant because it is inside of another element.',
        examples: [
            '<strong>p strong</strong> selects all <tag>strong</tag> elements that are inside of any <tag>p</tag>',
        ],
        boardMarkup: `
      <bird class='skywalker'></bird>
      <ship>
      <pig id='black' class="vader"></pig>
      </ship>
      <pig class='officer'></pig>
      `,
    },
    {
        helpTitle: 'Select elements by their class',
        selectorName: 'Class Selector',
        doThis: 'Select the white eggs',
        selector: '.white',
        syntax: '.classname',
        help: 'The class selector selects all elements with that class attribute. Elements can only have one ID, but many classes.',
        examples: ['<strong>.neato</strong> selects all elements with <strong>class="neato"</strong>'],
        boardMarkup: `
      <cage><egg class="white"></egg></cage>
      <cage><egg class="yellow"></egg></cage>
      <cage><egg class="white"></egg></cage>
      `,
    },
    {
        helpTitle: 'Select elements with an ID',
        selectorName: 'ID Selector',
        doThis: 'Select the blue bird',
        selector: '#blue',
        syntax: '#id',
        help: 'The class selector selects all elements with that class attribute. Elements can only have one ID, but many classes.',
        examples: [
            '<strong>#cool</strong> selects any element with <strong>id="cool"</strong>',
            '<strong>ul#long</strong> selects <tag>ul id="long"</tag>',
        ],
        boardMarkup: `
      <pig class="snowtrooper"></pig>
      <bird class='pilot' id="blue"></bird>
      <pig class='officer'></pig>
      `,
    },
    {
        helpTitle: 'You can select everything!',
        selectorName: 'The Universal Selector',
        doThis: 'Select all the things!',
        selector: '*',
        syntax: '*',
        help: 'You can select all elements with the universal selector! ',
        examples: ['<strong>p *</strong> selects any element inside all <tag>p</tag> elements.'],
        boardMarkup: `
      <cage id='cage'><egg class="yellow"></egg></cage>
      <ship></ship>
      <bird class='pilot'></bird>
      <pig class='bubbles'></pig>
      <pig class='frozen' id='cold'></pig>
      <robot id='robot'></robot>
      `,
    },
    {
        helpTitle: 'Combine the Universal Selector',
        selectorName: 'The Universal Selector',
        doThis: 'Select everything on a ship',
        selector: 'ship *',
        syntax: 'A&nbsp;&nbsp;*',
        help: 'This selects all elements inside of <strong>A</strong>.',
        examples: [
            '<strong>p *</strong> selects every element inside all <tag>p</tag> elements.',
            '<strong>ul.fancy *</strong> selects every element inside all <tag>ul class="fancy"</tag> elements.',
        ],
        boardMarkup: `
      <ship id="ship">
        <pig class='vader' id="black"></pig>
      </ship>
      <ship id="ship">
        <robot id="r2"></robot>
      </ship>
      <ship>
        <pig class='officer' id="green"></pig>
      </ship>`,
    },
    {
        helpTitle: 'Select an element that directly follows another element',
        selectorName: 'Adjacent Sibling Selector',
        doThis: "Select every pig that's next to a ship",
        selector: 'ship + pig',
        syntax: 'A + B',
        help: "This selects all <strong>B</strong> elements that directly follow <strong>A</strong>. Elements that follow one another are called siblings. They're on the same level, or depth. <br/><br/>In the HTML markup for this level, elements that have the same indentation are siblings.",
        examples: [
            '<strong>p + .intro</strong> selects every element with <strong>class="intro"</strong> that directly follows a <tag>p</tag>',
            '<strong>div + a</strong> selects every <tag>a</tag> element that directly follows a <tag>div</tag>',
        ],
        boardMarkup: `
      <ship>
        <robot id="r2"></robot>
      </ship>
      <pig class='frozen'></pig>
      <ship></ship>
      <pig class='bubbles'></pig>
      `,
    },
    {
        helpTitle: 'Select elements that follows another element',
        selectorName: 'General Sibling Selector',
        doThis: 'Select the pigs beside the bird',
        syntax: 'A ~ B',
        selector: 'bird ~ pig',
        help: 'You can select all siblings of an element that follow it. This is like the Adjacent Selector (A + B) except it gets all of the following elements instead of one.',
        examples: ['<strong>A ~ B</strong> selects all <strong>B</strong> that follow a <strong>A</strong>'],
        boardMarkup: `
        <bird class='pilot'></bird>
        <pig class='bubbles'></pig>
        <pig class='vader'></pig>
        <bird class='skywalker'></bird>
        <pig class='snowtrooper'></pig>
        <pig class='frozen'></pig>
      `,
    },
    {
        helpTitle: 'Select direct children of an element',
        selectorName: 'Child Selector',
        doThis: 'Select the pig directly in a cage',
        syntax: 'A > B&nbsp;',
        selector: 'cage > pig',
        help: 'You can select elements that are direct children of other elements. A child element is any element that is nested directly in another element. <br><br>Elements that are nested deeper than that are called descendant elements.',
        examples: [
            '<strong>A > B</strong> selects all <strong>B</strong> that are a direct children <strong>A</strong>',
        ],
        boardMarkup: `
      <cage>
        <pig id='officer'></pig>
      </cage>
        <bird></bird>
      <cage>
        <pig id='officer'></pig>
      </cage>
      `,
    },
    {
        helpTitle: "Select elements that don't have children",
        selectorName: 'Empty Selector',
        doThis: 'Select the empty cages',
        selector: 'cage:empty',
        syntax: ':empty',
        help: "Selects elements that don't have any other elements inside of them.",
        examples: ['<strong>div:empty</strong> selects all empty <tag>div</tag> elements.'],
        boardMarkup: `
      <cage></cage>
      <cage>
        <egg class="yellow"></egg>
      </cage>
      <cage></cage>`,
    },
    {
        helpTitle: 'Select a first child element inside of another element',
        selectorName: 'First Child Pseudo-selector',
        doThis: 'Select the top egg',
        selector: 'egg:first-child',
        syntax: ':first-child',
        help: 'You can select the first child element. A child element is any element that is directly nested in another element. You can combine this pseudo-selector with other selectors.',
        examples: [
            '<strong>:first-child</strong> selects all first child elements.',
            '<strong>p:first-child</strong> selects all first child <tag>p</tag> elements.',
            '<strong>div p:first-child</strong> selects all first child <tag>p</tag> elements that are in a <tag>div</tag>.',
        ],
        boardMarkup: `
        <bird></bird>
        <ship>
          <egg class='white' id='egg'></egg>
          <egg class='yellow'></egg>
        </ship>
        <bird></bird>
      `,
    },
    {
        helpTitle: 'Select an element by its order in another element',
        selectorName: 'Nth Child Pseudo-selector',
        doThis: 'Select the 4th pig',
        selector: ':nth-child(4)',
        syntax: ':nth-child(A)',
        help: 'Selects the <strong>nth</strong> (Ex: 1st, 3rd, 12th etc.) child element in another element.',
        examples: [
            '<strong>:nth-child(8)</strong> selects every element that is the 8th child of another element.',
            '<strong>div p:nth-child(2)</strong> selects the second <strong>p</strong> in every <strong>div</strong>',
        ],
        boardMarkup: `
        <pig class='officer'></pig>
        <pig class='snowtrooper'></pig>
        <pig class='vader'></pig>
        <pig class='bubbles'></pig>
        <pig class='frozen'></pig>
      `,
    },
    {
        helpTitle: 'Select an element that are the only element inside of another one.',
        selectorName: 'Only Child Pseudo-selector',
        doThis: 'Select the robot and the pig on the ship',
        selector: 'ship :only-child',
        syntax: ':only-child',
        help: 'You can select any element that is the only element inside of another one.',
        examples: [
            '<strong>span:only-child</strong> selects the <tag>span</tag> elements that are the only child of some other element.',
            '<strong>ul li:only-child</strong> selects the only <tag>li</tag> element that are in a <tag>ul</tag>.',
        ],
        boardMarkup: `
        <ship>
          <robot id="r2"></robot>
        </ship>
        <ship>
          <egg class='white' id='egg'></egg>
          <egg class='yellow'></egg>
        </ship>
        <ship>
          <pig class='vader' id="black"></pig>
        </ship>
      `,
    },
    {
        selectorName: 'Attribute Selector',
        helpTitle: 'Select all elements that have a specific attribute',
        doThis: 'Select the characters with name',
        selector: '[name]',
        syntax: '[attribute]',
        help: 'Attributes appear inside the opening tag of an element, like this: <tag>span attribute="value"</tag>. An attribute does not always have a value, it can be blank!',
        examples: [
            '<strong>a[href]</strong> selects all <tag>a</tag> elements that have a <strong>href="anything"</strong> attribute.',
            '<strong>[type]</strong> selects all elements that have a <strong>type="anything"</strong>. attribute',
        ],
        boardMarkup: `
        <bird class='pilot'></bird>
        <robot name='R2-D2'></robot>
        <pig class='bubbles'></pig>
        <pig class='vader' name='Darth Vader'></pig>
        <pig class='snowtrooper'></pig>
        <pig></pig>
        <bird name='Luke Skywalker'></bird>
`,
    },
    {
        selectorName: 'Attribute Selector',
        helpTitle: 'Select all elements that have a specific attribute',
        doThis: 'Select the bird with name Luke Skywalker',
        selector: '[name="Luke Skywalker"]',
        syntax: '[attribute="value"]',
        help: 'Attributes appear inside the opening tag of an element, like this: <tag>span attribute="value"</tag>. An attribute does not always have a value, it can be blank!',
        examples: [
            '<strong>a[href]</strong> selects all <tag>a</tag> elements that have a <strong>href="anything"</strong> attribute.',
            '<strong>[type]</strong> selects all elements that have a <strong>type="anything"</strong>. attribute',
        ],
        boardMarkup: `
        <bird class='pilot' name='Blue Squadron'></bird>
        <pig class='vader' name='Darth Vader'></pig>
        <robot name='R2-D2'></robot>
        <pig class='bubbles'></pig>
        <bird name='Luke Skywalker' ></bird>
        <pig class='snowtrooper' name='Snowtrooper'></pig>
        <pig name='Officer Pig'></pig>
`,
    },
];
/* harmony default export */ const data_levelsData = (levelsData);

;// CONCATENATED MODULE: ./src/index.ts



window.onload = () => {
    const game = new Game(data_levelsData);
    game.initApp();
};

/******/ })()
;