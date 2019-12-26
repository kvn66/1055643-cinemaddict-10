import {render} from "../utils";
import TopRatesComponent from "../components/top-rates";
import MovieController from "./movie";

const TOP_RATED_FILMS_COUNT = 2;

export default class TopRatesController {
  constructor(parentComponent, api) {
    this._parentComponent = parentComponent;
    this._api = api;
  }

  render(moviesModel) {
    const topRates = new TopRatesComponent();
    const topRated = moviesModel.getTopRated(TOP_RATED_FILMS_COUNT);

    if (topRated[0].rating > 0) {
      topRated.forEach((movieModel) => {
        new MovieController(movieModel, this._api).render(topRates);
      });

      render(this._parentComponent.getElement(), topRates.getElement());
    }
  }
}
