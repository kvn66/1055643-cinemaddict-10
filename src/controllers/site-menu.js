import {render} from "../utils";
import SiteMenuComponent from "../components/site-menu";

export default class SiteMenuController {
  constructor(parentElement) {
    this._parentElement = parentElement;
  }

  render(moviesModel) {
    const siteMenuComponent = new SiteMenuComponent();
    siteMenuComponent.watchlistCount = moviesModel.getCheckedParametersCount(`isAddedToWatchlist`);
    siteMenuComponent.historyCount = moviesModel.getCheckedParametersCount(`isAlreadyWatched`);
    siteMenuComponent.favoritesCount = moviesModel.getCheckedParametersCount(`isAddedToFavorites`);
    siteMenuComponent.setFilterTypeChangeHandler((filterType) => {
      moviesModel.filterType = filterType;
    });
    render(this._parentElement, siteMenuComponent.getElement());

    document.addEventListener(`watchlistChange`, () => {
      siteMenuComponent.watchlistCount = moviesModel.getCheckedParametersCount(`isAddedToWatchlist`);
    });

    document.addEventListener(`watchedChange`, () => {
      siteMenuComponent.historyCount = moviesModel.getCheckedParametersCount(`isAlreadyWatched`);
    });

    document.addEventListener(`favoriteChange`, () => {
      siteMenuComponent.favoritesCount = moviesModel.getCheckedParametersCount(`isAddedToFavorites`);
    });

    document.addEventListener(`modelLoaded`, () => {
      siteMenuComponent.watchlistCount = moviesModel.getCheckedParametersCount(`isAddedToWatchlist`);
      siteMenuComponent.historyCount = moviesModel.getCheckedParametersCount(`isAlreadyWatched`);
      siteMenuComponent.favoritesCount = moviesModel.getCheckedParametersCount(`isAddedToFavorites`);
    });
  }
}
