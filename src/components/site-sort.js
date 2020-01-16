import AbstractComponent from './abstract-component';
import {SortType} from '../utils';

export default class SiteSortComponent extends AbstractComponent {
  constructor() {
    super();
    this._currentSortType = SortType.DEFAULT;
  }

  _getTemplate() {
    return (
      `<ul class="sort">
        <li><a href="#" data-sort-type="${SortType.DEFAULT}" class="sort__button sort__button--active">Sort by default</a></li>
        <li><a href="#" data-sort-type="${SortType.DATE}" class="sort__button">Sort by date</a></li>
        <li><a href="#" data-sort-type="${SortType.RATING}" class="sort__button">Sort by rating</a></li>
      </ul>`
    );
  }

  setSortTypeChangeHandler(handler) {
    const listItems = this.getElement().querySelectorAll(`.sort__button`);
    listItems.forEach((listItem) => {
      listItem.addEventListener(`click`, (evt) => {
        evt.preventDefault();

        const sortType = evt.target.dataset.sortType;

        if (this._currentSortType === sortType) {
          return;
        }

        this._currentSortType = sortType;
        listItems.forEach((listElement) => {
          const attr = listElement.getAttribute(`data-sort-type`);
          if (attr.includes(this._currentSortType)) {
            listElement.classList.add(`sort__button--active`);
          } else {
            listElement.classList.remove(`sort__button--active`);
          }
        });

        handler(this._currentSortType);
      });
    });
  }
}
