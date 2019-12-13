import {getCheckedParametersCount} from '../utils';
import AbstractComponent from './abstract-component';

export default class SiteMenuComponent extends AbstractComponent {
  constructor(films) {
    super();
    this._films = films;
  }

  getTemplate() {
    return (
      `<nav class="main-navigation">
      <a href="#all" class="main-navigation__item main-navigation__item--active">All movies</a>
      <a href="#watchlist" class="main-navigation__item">Watchlist <span class="main-navigation__item-count">${getCheckedParametersCount(this._films, `isAddedToWatchlist`).toString()}</span></a>
      <a href="#history" class="main-navigation__item">History <span class="main-navigation__item-count">${getCheckedParametersCount(this._films, `isAlreadyWatched`).toString()}</span></a>
      <a href="#favorites" class="main-navigation__item">Favorites <span class="main-navigation__item-count">${getCheckedParametersCount(this._films, `isAddedToFavorites`).toString()}</span></a>
      <a href="#stats" class="main-navigation__item main-navigation__item--additional">Stats</a>
    </nav>`
    );
  }
}
