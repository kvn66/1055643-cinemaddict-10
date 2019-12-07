import FilmsComponent from "../components/films.js";
import FilmsListController from "./films-list.js";
import TopRatesController from "./top-rates.js";
import MostCommentedController from "./most-commented.js";
import {render, SortType} from "../utils.js";
import SiteMenuComponent from "../components/site-menu";
import SiteSortComponent from "../components/site-sort";

export default class PageController {
  constructor(parentElement) {
    this._parentElement = parentElement;

    this._filmsElement = new FilmsComponent().getElement();
    this._filmsListController = new FilmsListController(this._filmsElement);
  }

  siteSortRender(films, sortedFilms) {
    const siteSortComponent = new SiteSortComponent();
    const siteSortElement = siteSortComponent.getElement();
    render(this._parentElement, siteSortElement);

    siteSortComponent.setSortTypeChangeHandler((sortType) => {
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
      new TopRatesController(this._filmsElement).render(films);
      new MostCommentedController(this._filmsElement).render(films);
    }

    render(this._parentElement, this._filmsElement);
  }
}
