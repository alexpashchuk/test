import './sources.css';
import { Source } from '../../app/types';
import { getElement } from '../../../utils/utils';
class Sources {
    draw(data: Source[]) {
        const fragment = document.createDocumentFragment();
        const sourceItemTemp: HTMLTemplateElement | null = document.querySelector('#sourceItemTemp');

        data.forEach((item: Source) => {
            const sourceClone = sourceItemTemp?.content.cloneNode(true) as HTMLElement;
            getElement<HTMLTemplateElement>(sourceClone, '.source__item-name').textContent = item.name;
            getElement<HTMLTemplateElement>(sourceClone, '.source__item').setAttribute('data-source-id', item.id);

            fragment.append(sourceClone);
        });
        const sourcesElem: HTMLElement | null = document.querySelector('.sources');
        sourcesElem?.append(fragment);
    }
}

export default Sources;
