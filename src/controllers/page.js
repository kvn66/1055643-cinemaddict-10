import FilmsComponent from "../components/films.js";
import FilmsListController from "./films-list.js";
import TopRatesController from "./top-rates.js";
import MostCommentedController from "./most-commented.js";
import {render} from "../utils.js";

export default class PageController {
  constructor(parentElement) {
    this._parentElement = parentElement;
  }

  render(films) {
    const filmsElement = new FilmsComponent().getElement();
    new FilmsListController(filmsElement).render(films);

    if (films.length) {
      new TopRatesController(filmsElement).render(films);
      new MostCommentedController(filmsElement).render(films);
    }

    render(this._parentElement, filmsElement);
  }
}
