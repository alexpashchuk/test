import CreateElements from './createElements';
import { Classes, Tags, Text } from '../interface/enums';
import { DataLevels } from '../interface/interface';

class CreateLevel extends CreateElements {
    isPrintText = true;
    isGame = true;
    levelActive = Number(localStorage.getItem('level')) || 0;
    levels;

    constructor(data: DataLevels[]) {
        super();
        this.levels = data;
    }

    createLevelHeader = (): HTMLDivElement => {
        this.levelHeader.classList.add(Classes.LEVEL_HEADER);

        this.levelNumber.classList.add(Classes.LEVEL_TITLE);
        this.levelNumber.textContent = `Level ${this.levelActive + 1} of ${this.levels.length}`;

        this.levelHeader.append(
            this.createButton(
                [Classes.BUTTON_MENU],
                'button',
                this.toggleMenu,
                '',
                this.createElement(Tags.DIV, [Classes.BURGER])
            )
        );
        this.levelHeader.append(this.levelNumber);
        this.levelHeader.append(this.createElement(Tags.SPAN, [Classes.CHECK_MARK, Classes.CHECK]));
        this.levelHeader.append(this.createButton([Classes.BUTTON_PREV], 'button', this.showPrevLevel, ''));
        this.levelHeader.append(this.createButton([Classes.BUTTON_NEXT], 'button', this.showNextLevel, ''));

        return this.levelHeader;
    };

    createMenuLevel = (): HTMLDivElement => {
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

    createLevelHelp = (): HTMLDivElement => {
        this.rootHelp.innerHTML = '';
        this.rootHelp.classList.add(Classes.LEVEL_HELP);
        this.rootHelp.append(
            this.createElement(Tags.H2, [Classes.SELECTOR_NAME], this.levels[this.levelActive].selectorName),
            this.createElement(Tags.H3, [Classes.TITLE], this.levels[this.levelActive].helpTitle),
            this.createElement(Tags.H2, [Classes.SYNTAX], this.levels[this.levelActive].syntax),
            this.createElement(Tags.P, [Classes.DESCRIPTION], this.levels[this.levelActive].help),
            this.createButton([Classes.RESET], 'button', this.reset, Text.RESET)
        );
        if (this.levels[this.levelActive].examples) {
            this.rootHelp.append(this.createElement(Tags.H3, [Classes.EXAMPLES], Text.EXAMPLES));
            this.levels[this.levelActive].examples?.forEach((el) =>
                this.rootHelp.append(this.createElement(Tags.DIV, [Classes.EXAMPLE], el))
            );
        }

        return this.rootHelp;
    };

    reset = (): void => {
        this.levelActive = 0;
        localStorage.clear();
        this.getNewLevel();
    };

    showNextLevel = (): void => {
        if (+this.levelActive <= this.levels.length - 1) {
            this.levelActive += 1;
            this.getNewLevel();
        }
    };

    showPrevLevel = (): void => {
        if (this.levelActive > 0) {
            this.levelActive -= 1;
            this.getNewLevel();
        }
    };

    toggleMenu = (): void => {
        const burgerLevel = document.querySelector('.button-menu') as HTMLElement;
        const menuLevel = document.querySelector('.level-menu') as HTMLElement;
        burgerLevel.classList.toggle(Classes.OPEN);
        menuLevel.classList.toggle(Classes.OPEN);
    };

    toggleListActives = (): void => {
        this.levelHeader.children[2].classList.remove(Classes.NOT_PASSED, Classes.PASSED);
        this.levelNumber.textContent = `Level ${this.levelActive + 1} of ${this.levels.length}`;

        const objProgress = JSON.parse(localStorage.getItem('progress') || '{}') || {};
        if (objProgress[this.levelActive] && objProgress[this.levelActive].correct) {
            this.levelHeader.children[2].classList.add(Classes.PASSED);
        }
        if (objProgress[this.levelActive] && objProgress[this.levelActive].incorrect) {
            this.levelHeader.children[2].classList.add(Classes.NOT_PASSED);
        }
        this.listMenu.querySelectorAll(`.${Classes.LIST_ITEM}`).forEach((item: Element, i: number) => {
            item.classList.remove(Classes.LIST_ACTIVE);
            if (+item.id === this.levelActive + 1) item.classList.add(Classes.LIST_ACTIVE);
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

    getNewLevel = (): void => {
        if (this.levelActive < this.levels.length) {
            this.isGame = true;
            this.htmlCode.innerHTML = ``;
            this.input.value = '';
            this.input.classList.add(Classes.BLINK);
            this.input.focus();
            this.isPrintText = true;
            this.htmlCode.append(this.getViewerCode(this.levels[this.levelActive].boardMarkup));
            this.table.innerHTML = this.levels[this.levelActive].boardMarkup;
            const elem = document.querySelector('.layout-header') as HTMLElement;
            elem.innerHTML = this.levels[this.levelActive].doThis;
            this.table.querySelectorAll('*').forEach((item: Element) => {
                if (item.closest(this.levels[this.levelActive].selector)) {
                    item.closest(`${this.levels[this.levelActive].selector}`)?.classList.add(Classes.SELECTED);
                }
            });
            this.rootLevel.removeChild(this.rootHelp);
            this.rootLevel.append(this.createLevelHelp());
            this.toggleListActives();
            localStorage.setItem('level', `${this.levelActive}`);
        } else {
            this.isGame = false;
            this.input.value = '';
            this.table.innerHTML = '';
            this.showWinningResult();
        }
    };

    showWinningResult = (): void => {
        const layout = document.querySelector(`.${Classes.LAYOUT}`) as HTMLElement;
        const objProgress = JSON.parse(localStorage.getItem('progress') || '{}');
        let countCorrect = 0;
        let countIncorrect = 0;
        Object.keys(objProgress).forEach((e) => {
            if (objProgress[e].correct) countCorrect += 1;
            if (objProgress[e].incorrect) countIncorrect += 1;
        });
        const winMessage = this.createElement(Tags.DIV, [Classes.GAME_WIN], Text.YOU_WIN);
        const missedMessage = this.createElement(
            Tags.P,
            [Classes.MISSED],
            `${Text.MISSED}: ${this.levels.length - countCorrect - countIncorrect}`
        );
        const correctMessage = this.createElement(Tags.P, [Classes.CORRECT], `${Text.CORRECT}: ${countCorrect}`);

        const incorrectMessage = this.createElement(
            Tags.P,
            [Classes.INCORRECT],
            `${Text.INCORRECT}: ${countIncorrect}`
        );
        const resultScore =
            countCorrect === this.levels.length
                ? winMessage
                : this.createBlock(
                      Tags.DIV,
                      [Classes.SCORE],
                      this.createElement(Tags.H2, [Classes.TITLE_RESULTS], Text.RESULTS),
                      correctMessage,
                      incorrectMessage,
                      missedMessage
                  );

        layout.append(resultScore);
    };

    getAttributes = (child: HTMLElement): string => {
        let childClass;
        const elemChild = child.getAttribute('class');
        if (elemChild) {
            childClass = elemChild
                .split(' ')
                .filter((e: string) => e !== 'selected')
                .join('');
        }
        const childId = child.getAttribute('id');
        const childName = child.getAttribute('name');
        return `${childClass ? ` class="${childClass}"` : ''}${childName ? ` name="${childName}"` : ''}${
            childId ? ` id="${childId}"` : ''
        }`;
    };

    getViewerCode = (item: Element | string): DocumentFragment | Element => {
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
                    const elemChildNode: ChildNode = elemChild && this.getViewerCode(elemChild).firstChild;
                    div.append(elemChildNode);
                }
                div.append(`</${child.nodeName.toLocaleLowerCase()}>`);
            } else {
                div.append(child.outerHTML);
            }
            result.append(div);
        }
        return result;
    };

    createBlockLevel = (): HTMLDivElement => {
        this.rootLevel.classList.add(Classes.LEVEL);
        this.rootLevel.append(this.createLevelHeader(), this.createMenuLevel(), this.createLevelHelp());
        this.toggleListActives();
        return this.rootLevel;
    };
}

export default CreateLevel;
