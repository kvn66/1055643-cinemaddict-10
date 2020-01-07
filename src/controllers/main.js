import FilmsComponent from "../components/films";
import FilmsListController from "./films-list";
import TopRatesController from "./top-rates";
import MostCommentedController from "./most-commented";
import StatisticController from "./statistic";
import {FilterType, render} from "../utils";
import SiteMenuController from "./site-menu";
import SiteSortComponent from "../components/site-sort";

export default class MainController {
  constructor(moviesModel, api) {
    this._moviesModel = moviesModel;
    this._api = api;

    this._siteSortComponent = new SiteSortComponent();
    this._filmsComponent = new FilmsComponent();
    this._filmsListController = new FilmsListController(this._filmsComponent, this._api);
    this._topRatesController = new TopRatesController(this._filmsComponent, this._api);
    this._mostCommentedController = new MostCommentedController(this._filmsComponent, this._api);
    this._statisticController = new StatisticController(this._moviesModel);
  }

  siteSortRender(parentElement) {
    const siteSortElement = this._siteSortComponent.getElement();
    render(parentElement, siteSortElement);

    this._siteSortComponent.setSortTypeChangeHandler((sortType) => {
      this._moviesModel.sortType = sortType;
    });
  }

  render(parentElement) {
    new SiteMenuController(parentElement).render(this._moviesModel);

    this.siteSortRender(parentElement);

    this._filmsListController.render(this._moviesModel);

    if (this._moviesModel.length) {
      this._topRatesController.render(this._moviesModel);
      this._mostCommentedController.render(this._moviesModel);
    }

    render(parentElement, this._filmsComponent.getElement());

    this._statisticController.hide();
    this._statisticController.render(parentElement);

    document.addEventListener(`filterChange`, () => {
      if (this._moviesModel.filterType === FilterType.STATISTIC) {
        this._siteSortComponent.hide();
        this._filmsComponent.hide();
        this._statisticController.update();
        this._statisticController.show();
      } else {
        this._filmsListController.render(this._moviesModel);
        this._siteSortComponent.show();
        this._filmsComponent.show();
        this._statisticController.hide();
      }
    });
  }
}
