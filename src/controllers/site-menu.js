import {render} from "../utils";
import SiteMenuComponent from "../components/site-menu";

export default class SiteMenuController {
  constructor(parentElement) {
    this._parentElement = parentElement;
    this._watchlistCount = null;
    this._historyCount = null;
    this._favoritesCount = null;
  }

  render(moviesModel) {
    this._watchlistCount = moviesModel.getCheckedParametersCount(`isAddedToWatchlist`);
    this._historyCount = moviesModel.getCheckedParametersCount(`isAlreadyWatched`);
    this._favoritesCount = moviesModel.getCheckedParametersCount(`isAddedToFavorites`);
    const siteMenuComponent = new SiteMenuComponent();
    siteMenuComponent.watchlistCount = this._watchlistCount;
    siteMenuComponent.historyCount = this._historyCount;
    siteMenuComponent.favoritesCount = this._favoritesCount;
    siteMenuComponent.setFilterTypeChangeHandler((filterType) => {
      moviesModel.filterType = filterType;
    });
    render(this._parentElement, siteMenuComponent.getElement());

    document.addEventListener(`watchlistChange`, (evt) => {
      if (evt.detail) {
        this._watchlistCount++;
      } else {
        this._watchlistCount--;
      }
      siteMenuComponent.watchlistCount = this._watchlistCount;
    });

    document.addEventListener(`watchedChange`, (evt) => {
      if (evt.detail) {
        this._historyCount++;
      } else {
        this._historyCount--;
      }
      siteMenuComponent.historyCount = this._historyCount;
    });

    document.addEventListener(`favoriteChange`, (evt) => {
      if (evt.detail) {
        this._favoritesCount++;
      } else {
        this._favoritesCount--;
      }
      siteMenuComponent.favoritesCount = this._favoritesCount;
    });

    document.addEventListener(`modelLoaded`, () => {
      this._watchlistCount = moviesModel.getCheckedParametersCount(`isAddedToWatchlist`);
      this._historyCount = moviesModel.getCheckedParametersCount(`isAlreadyWatched`);
      this._favoritesCount = moviesModel.getCheckedParametersCount(`isAddedToFavorites`);
      siteMenuComponent.watchlistCount = this._watchlistCount;
      siteMenuComponent.historyCount = this._historyCount;
      siteMenuComponent.favoritesCount = this._favoritesCount;
    });
  }
}
