import {createElement} from '../utils.js';
import {render} from "../utils";
import FilmsList from "./films-list.js";
import TopRates from "./top-rates";
import MostCommented from "./most-commented";

export default class Films {
  constructor(films) {
    this._films = films;
    this._element = null;
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());

      render(this._element, new FilmsList(this._films).getElement());

      const topRatesComponent = new TopRates(this._films);
      const mostCommentedComponent = new MostCommented(this._films);

      if (this._films.length) {
        if ((topRatesComponent.getTopRated())[0].rating > 0) {
          render(this._element, topRatesComponent.getElement());
        }
        if ((mostCommentedComponent.getMostCommented())[0].comments.length > 0) {
          render(this._element, mostCommentedComponent.getElement());
        }
      }
    }

    return this._element;
  }

  removeElement() {
    this._element = null;
  }

  getTemplate() {
    return (
      `<section class="films"></section>`
    );
  }
}
