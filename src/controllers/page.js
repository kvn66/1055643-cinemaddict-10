import FilmsList from "../components/films-list.js";
import FilmsListController from "./films-list.js";
import {render} from "../utils.js";

export default class PageController {
  constructor(container) {
    this._filmsComponent = container;
  }

  render(films) {
    const filmsElement = this._filmsComponent.getElement();

    render(filmsElement, new FilmsListController(new FilmsList()).render(films));

/*
    const topRatesComponent = new TopRates(films);
    const mostCommentedComponent = new MostCommented(films);

    if (films.length) {
      if ((topRatesComponent.getTopRated())[0].rating > 0) {
        render(filmsElement, topRatesComponent.getElement());
      }
      if ((mostCommentedComponent.getMostCommented())[0].comments.length > 0) {
        render(filmsElement, mostCommentedComponent.getElement());
      }
    }
*/
    return filmsElement;
  }
}
