import AbstractComponent from './abstract-component';
import {SortType} from '../utils';

export default class SiteSortComponent extends AbstractComponent {
  constructor() {
    super();
    this._currentSortType = SortType.DEFAULT;
  }

  setSortTypeChangeHandler(handler) {
    const listItems = this.getElement().querySelectorAll(`.sort__button`);
    listItems.forEach((item) => {
      item.addEventListener(`click`, (evt) => {
        evt.preventDefault();

        const sortType = evt.target.dataset.sortType;

        if (this._currentSortType === sortType) {
          return;
        }

        this._currentSortType = sortType;
        listItems.forEach((elem) => {
          const attr = elem.getAttribute(`data-sort-type`);
          if (attr.includes(this._currentSortType)) {
            elem.classList.add(`sort__button--active`);
          } else {
            elem.classList.remove(`sort__button--active`);
          }
        });

        handler(this._currentSortType);
      });
    });
  }

  getTemplate() {
    return (
      `<ul class="sort">
        <li><a href="#" data-sort-type="${SortType.DEFAULT}" class="sort__button sort__button--active">Sort by default</a></li>
        <li><a href="#" data-sort-type="${SortType.DATE}" class="sort__button">Sort by date</a></li>
        <li><a href="#" data-sort-type="${SortType.RATING}" class="sort__button">Sort by rating</a></li>
      </ul>`
    );
  }
}
