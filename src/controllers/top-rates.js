import {render} from "../utils";
import TopRatesComponent from "../components/top-rates";
import MovieController from "./movie";

const TOP_RATED_FILMS_COUNT = 2;

export default class TopRatesController {
  constructor(parentComponent) {
    this._parentComponent = parentComponent;
  }

  getTopRated(films) {
    return films.slice().sort((a, b) => b.rating - a.rating).slice(0, TOP_RATED_FILMS_COUNT);
  }

  render(films) {
    const topRates = new TopRatesComponent();
    const movieController = new MovieController(topRates);
    const topRated = this.getTopRated(films);

    if (topRated[0].rating > 0) {
      topRated.forEach((film) => {
        movieController.render(film);
      });

      render(this._parentComponent.getElement(), topRates.getElement());
    }
  }
}
