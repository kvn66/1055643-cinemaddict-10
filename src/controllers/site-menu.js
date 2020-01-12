import {render} from "../utils";
import SiteMenuComponent from "../components/site-menu";

export default class SiteMenuController {
  constructor(moviesModel, parentElement) {
    this._moviesModel = moviesModel;
    this._parentElement = parentElement;
    this._siteMenuComponent = new SiteMenuComponent();

    document.addEventListener(`watchlistChange`, () => {
      this._siteMenuComponent.watchlistCount = moviesModel.getCheckedParametersCount(`isAddedToWatchlist`);
    });

    document.addEventListener(`watchedChange`, () => {
      this._siteMenuComponent.historyCount = moviesModel.getCheckedParametersCount(`isAlreadyWatched`);
    });

    document.addEventListener(`favoriteChange`, () => {
      this._siteMenuComponent.favoritesCount = moviesModel.getCheckedParametersCount(`isAddedToFavorites`);
    });

    document.addEventListener(`modelLoaded`, () => {
      this._siteMenuComponent.watchlistCount = moviesModel.getCheckedParametersCount(`isAddedToWatchlist`);
      this._siteMenuComponent.historyCount = moviesModel.getCheckedParametersCount(`isAlreadyWatched`);
      this._siteMenuComponent.favoritesCount = moviesModel.getCheckedParametersCount(`isAddedToFavorites`);
    });

    document.addEventListener(`modelLoaded`, () => {
      this._watchlistCount = moviesModel.getCheckedParametersCount(`isAddedToWatchlist`);
      this._historyCount = moviesModel.getCheckedParametersCount(`isAlreadyWatched`);
      this._favoritesCount = moviesModel.getCheckedParametersCount(`isAddedToFavorites`);
      this._siteMenuComponent.watchlistCount = this._watchlistCount;
      this._siteMenuComponent.historyCount = this._historyCount;
      this._siteMenuComponent.favoritesCount = this._favoritesCount;
    });
  }

  render() {
    this._siteMenuComponent.watchlistCount = this._moviesModel.getCheckedParametersCount(`isAddedToWatchlist`);
    this._siteMenuComponent.historyCount = this._moviesModel.getCheckedParametersCount(`isAlreadyWatched`);
    this._siteMenuComponent.favoritesCount = this._moviesModel.getCheckedParametersCount(`isAddedToFavorites`);
    this._siteMenuComponent.setFilterTypeChangeHandler((filterType) => {
      this._moviesModel.filterType = filterType;
    });
    render(this._parentElement, this._siteMenuComponent.getElement());
  }
}
