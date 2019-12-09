import AbstractComponent from './abstract-component';
import {SortType} from '../utils';

export default class SiteSortComponent extends AbstractComponent {
  constructor() {
    super();
    this._currenSortType = SortType.DEFAULT;
  }

  setSortTypeChangeHandler(handler) {
    this.getElement().addEventListener(`click`, (evt) => {
      evt.preventDefault();

      if (evt.target.tagName !== `A`) {
        return;
      }

      const sortType = evt.target.dataset.sortType;

      if (this._currenSortType === sortType) {
        return;
      }

      this._currenSortType = sortType;
      const listItems = this._element.querySelectorAll(`.sort__button`);
      listItems.forEach((item) => {
        let attr = item.getAttribute(`data-sort-type`);
        if (attr.includes(this._currenSortType)) {
          item.classList.add(`sort__button--active`);
        } else {
          item.classList.remove(`sort__button--active`);
        }
      });

      handler(this._currenSortType);
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
