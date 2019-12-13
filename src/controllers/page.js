import FilmsComponent from "../components/films";
import FilmsListController from "./films-list";
import TopRatesController from "./top-rates";
import MostCommentedController from "./most-commented";
import {render, SortType} from "../utils";
import SiteMenuComponent from "../components/site-menu";
import SiteSortComponent from "../components/site-sort";

export default class PageController {
  constructor(parentElement) {
    this._parentElement = parentElement;

    this._siteSortComponent = new SiteSortComponent();
    this._filmsComponent = new FilmsComponent();
    this._filmsElement = this._filmsComponent.getElement();
    this._filmsListController = new FilmsListController(this._filmsElement);
    this._topRatesController = new TopRatesController(this._filmsElement);
    this._mostCommentedController = new MostCommentedController(this._filmsElement);
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
    render(this._parentElement, new SiteMenuComponent(films).getElement());

    let sortedFilms = films.slice();

    this.siteSortRender(films, sortedFilms);

    this._filmsListController.render(sortedFilms);

    if (films.length) {
      this._topRatesController.render(films);
      this._mostCommentedController.render(films);
    }

    render(this._parentElement, this._filmsElement);
  }
}
