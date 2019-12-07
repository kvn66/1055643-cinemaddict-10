import {render} from "../utils";
import TopRatesComponent from "../components/top-rates.js";
import FilmController from "./film";

export default class TopRatesController {
  constructor(parentElement) {
    this._parentElement = parentElement;
  }

  render(films) {
    const topRates = new TopRatesComponent(films);
    const topRatedFilmsListContainerElement = topRates.getElement().querySelector(`.films-list__container`);
    const filmController = new FilmController(topRatedFilmsListContainerElement);
    const topRated = topRates.getTopRated();

    if (topRated[0].rating > 0) {
      topRated.forEach((film) => {
        filmController.render(film);
      });

      render(this._parentElement, topRates.getElement());
    }
  }
}
