import FilmsComponent from "../components/films";
import FilmsListController from "./films-list";
import TopRatesController from "./top-rates";
import MostCommentedController from "./most-commented";
import {render} from "../utils";
import SiteMenuController from "./site-menu";
import SiteSortComponent from "../components/site-sort";

export default class MainController {
  constructor(parentElement) {
    this._parentElement = parentElement;

    this._siteSortComponent = new SiteSortComponent();
    this._filmsComponent = new FilmsComponent();
    this._filmsListController = new FilmsListController(this._filmsComponent);
    this._topRatesController = new TopRatesController(this._filmsComponent);
    this._mostCommentedController = new MostCommentedController(this._filmsComponent);
  }

  siteSortRender(moviesModel) {
    const siteSortElement = this._siteSortComponent.getElement();
    render(this._parentElement, siteSortElement);

    this._siteSortComponent.setSortTypeChangeHandler((sortType) => {
      moviesModel.setSortType(sortType);
    });
  }

  render(moviesModel) {
    new SiteMenuController(this._parentElement).render(moviesModel);

    this.siteSortRender(moviesModel);

    this._filmsListController.render(moviesModel.getMovies());

    if (moviesModel.length) {
      this._topRatesController.render(moviesModel);
      this._mostCommentedController.render(moviesModel);
    }

    render(this._parentElement, this._filmsComponent.getElement());

    document.addEventListener(`filterChange`, () => {
      this._filmsListController.render(moviesModel.getMovies());
    });
  }
}
