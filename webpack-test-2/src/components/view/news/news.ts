import './news.css';
import { Article } from '../../app/types';
import { getElement } from '../../../utils/utils';

class News {
    draw(data: Article[]) {
        const news = data.length >= 10 ? data.filter((_item, idx) => idx < 10) : data;

        const fragment = document.createDocumentFragment();
        const newsItemTemp: HTMLTemplateElement | null = document.querySelector('#newsItemTemp');

        news.forEach((item: Article, idx) => {
            const newsClone = newsItemTemp?.content.cloneNode(true) as HTMLElement;

            if (idx % 2) getElement<HTMLTemplateElement>(newsClone, '.news__item').classList.add('alt');
            getElement<HTMLTemplateElement>(newsClone, '.news__meta-photo').style.backgroundImage = `url(${
                item.urlToImage || './assets/news_placeholder.jpg'
            })`;
            getElement<HTMLTemplateElement>(newsClone, '.news__meta-author').textContent =
                item.author || item.source.name;
            getElement<HTMLTemplateElement>(newsClone, '.news__meta-date').textContent = item.publishedAt
                .slice(0, 10)
                .split('-')
                .reverse()
                .join('-');
            getElement<HTMLTemplateElement>(newsClone, '.news__description-title').textContent = item.title;
            getElement<HTMLTemplateElement>(newsClone, '.news__description-source').textContent = item.source.name;
            getElement<HTMLTemplateElement>(newsClone, '.news__description-content').textContent = item.description;
            getElement<HTMLTemplateElement>(newsClone, '.news__read-more a').setAttribute('href', item.url);

            fragment.append(newsClone);
        });
        const el = document.querySelector<HTMLElement>('.news');
        if (el) {
            el.innerHTML = '';
            el.appendChild(fragment);
        }
    }
}

export default News;
