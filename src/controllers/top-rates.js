import {render} from "../utils";
import TopRatesComponent from "../components/top-rates";
import FilmController from "./film";

const TOP_RATED_FILMS_COUNT = 2;

export default class TopRatesController {
  constructor(parentElement) {
    this._parentElement = parentElement;
  }

  getTopRated(films) {
    return films.slice().sort((a, b) => b.rating - a.rating).slice(0, TOP_RATED_FILMS_COUNT);
  }

  render(films) {
    const topRates = new TopRatesComponent();
    const topRatedFilmsListContainerElement = topRates.getElement().querySelector(`.films-list__container`);
    const filmController = new FilmController(topRatedFilmsListContainerElement);
    const topRated = this.getTopRated(films);

    if (topRated[0].rating > 0) {
      topRated.forEach((film) => {
        filmController.render(film);
      });

      render(this._parentElement, topRates.getElement());
    }
  }
}
