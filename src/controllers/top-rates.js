import {render} from "../utils";
import TopRatesComponent from "../components/top-rates";
import MovieController from "./movie";

const TOP_RATED_FILMS_COUNT = 2;

export default class TopRatesController {
  constructor(parentComponent) {
    this._parentComponent = parentComponent;
  }

  render(moviesModel) {
    const topRates = new TopRatesComponent();
    const movieController = new MovieController(topRates);
    const topRated = moviesModel.getTopRated(TOP_RATED_FILMS_COUNT);

    if (topRated[0].rating > 0) {
      topRated.forEach((movieModel) => {
        movieController.render(movieModel);
      });

      render(this._parentComponent.getElement(), topRates.getElement());
    }
  }
}
