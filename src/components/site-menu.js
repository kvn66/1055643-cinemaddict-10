import {createElement, getCheckedParametersCount} from '../utils.js';

const createSiteMenuTemplate = (films) => {
  return (
    `<nav class="main-navigation">
      <a href="#all" class="main-navigation__item main-navigation__item--active">All movies</a>
      <a href="#watchlist" class="main-navigation__item">Watchlist <span class="main-navigation__item-count">${getCheckedParametersCount(films, `isAddedToWatchlist`)}</span></a>
      <a href="#history" class="main-navigation__item">History <span class="main-navigation__item-count">${getCheckedParametersCount(films, `isAlreadyWatched`)}</span></a>
      <a href="#favorites" class="main-navigation__item">Favorites <span class="main-navigation__item-count">${getCheckedParametersCount(films, `isAddedToFavorites`)}</span></a>
      <a href="#stats" class="main-navigation__item main-navigation__item--additional">Stats</a>
    </nav>`
  );
};

export default class SiteMenu {
  constructor(films) {
    this._films = films;

    this._element = null;
  }

  getTemplate() {
    return createSiteMenuTemplate(this._films);
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }

    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}
