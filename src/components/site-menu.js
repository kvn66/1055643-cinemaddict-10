import AbstractComponent from './abstract-component';
import {FilterType} from '../utils';

export default class SiteMenuComponent extends AbstractComponent {
  constructor() {
    super();
    this._currentFilterType = FilterType.ALL;
  }

  set watchlistCount(count) {
    this.getElement().querySelector(`.watchlist-count`).textContent = count.toString();
  }

  set historyCount(count) {
    this.getElement().querySelector(`.history-count`).textContent = count.toString();
  }

  set favoritesCount(count) {
    this.getElement().querySelector(`.favorites-count`).textContent = count.toString();
  }

  setFilterTypeChangeHandler(handler) {
    const listItems = this.getElement().querySelectorAll(`.main-navigation__item`);
    listItems.forEach((item) => {
      item.addEventListener(`click`, (evt) => {
        evt.preventDefault();

        const filterType = evt.target.dataset.filterType;

        if (this._currentFilterType === filterType) {
          return;
        }

        this._currentFilterType = filterType;
        listItems.forEach((elem) => {
          if (!elem.classList.contains(`main-navigation__item--additional`)) {
            const attr = elem.getAttribute(`data-filter-type`);
            if (attr.includes(this._currentFilterType)) {
              elem.classList.add(`main-navigation__item--active`);
            } else {
              elem.classList.remove(`main-navigation__item--active`);
            }
          }
        });

        handler(this._currentFilterType);
      });
    });
  }

  getTemplate() {
    return (
      `<nav class="main-navigation">
      <a href="#all" data-filter-type="${FilterType.ALL}" class="main-navigation__item main-navigation__item--active">All movies</a>
      <a href="#watchlist" data-filter-type="${FilterType.WATCHLIST}" class="main-navigation__item">Watchlist <span class="main-navigation__item-count watchlist-count"></span></a>
      <a href="#history" data-filter-type="${FilterType.HISTORY}" class="main-navigation__item">History <span class="main-navigation__item-count history-count"></span></a>
      <a href="#favorites" data-filter-type="${FilterType.FAVORITES}" class="main-navigation__item">Favorites <span class="main-navigation__item-count favorites-count"></span></a>
      <a href="#stats" class="main-navigation__item main-navigation__item--additional">Stats</a>
    </nav>`
    );
  }
}
