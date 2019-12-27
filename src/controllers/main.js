import FilmsComponent from "../components/films";
import FilmsListController from "./films-list";
import TopRatesController from "./top-rates";
import MostCommentedController from "./most-commented";
import {render} from "../utils";
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
  }

  siteSortRender(parentElement) {
    const siteSortElement = this._siteSortComponent.getElement();
    render(parentElement, siteSortElement);

    this._siteSortComponent.setSortTypeChangeHandler((sortType) => {
      this._moviesModel.setSortType(sortType);
    });
  }

  render(parentElement) {
    new SiteMenuController(parentElement).render(this._moviesModel);

    this.siteSortRender(parentElement);

    this._filmsListController.render(this._moviesModel.getMovies());

    if (this._moviesModel.length) {
      this._topRatesController.render(this._moviesModel);
      this._mostCommentedController.render(this._moviesModel);
    }

    render(parentElement, this._filmsComponent.getElement());

    document.addEventListener(`filterChange`, () => {
      this._filmsListController.render(this._moviesModel.getMovies());
    });
  }
}
