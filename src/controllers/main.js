import FilmsComponent from "../components/films";
import FilmsListController from "./films-list";
import TopRatesController from "./top-rates";
import MostCommentedController from "./most-commented";
import {render, SortType} from "../utils";
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

  siteSortRender(films, sortedFilms) {
    const siteSortElement = this._siteSortComponent.getElement();
    render(this._parentElement, siteSortElement);

    this._siteSortComponent.setSortTypeChangeHandler((sortType) => {
      switch (sortType) {
        case SortType.RATING:
          sortedFilms = films.slice().sort((a, b) => b.rating - a.rating);
          break;
        case SortType.DATE:
          sortedFilms = films.slice().sort((a, b) => b.releaseDate - a.releaseDate);
          break;
        case SortType.DEFAULT:
          sortedFilms = films.slice();
          break;
      }
      this._filmsListController.render(sortedFilms);
    });
  }

  render(films) {
    new SiteMenuController(this._parentElement).render(films);

    let sortedFilms = films.slice();

    this.siteSortRender(films, sortedFilms);

    this._filmsListController.render(sortedFilms);

    if (films.length) {
      this._topRatesController.render(films);
      this._mostCommentedController.render(films);
    }

    render(this._parentElement, this._filmsComponent.getElement());
  }
}
