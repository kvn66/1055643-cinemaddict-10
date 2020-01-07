import {render} from "../utils";
import TopRatesComponent from "../components/top-rates";
import MovieController from "./movie";

const TOP_RATED_FILMS_COUNT = 2;

export default class TopRatesController {
  constructor(parentComponent, apiWithProvider) {
    this._parentComponent = parentComponent;
    this._apiWithProvider = apiWithProvider;
  }

  render(moviesModel, commentsModel) {
    const topRates = new TopRatesComponent();
    const topRated = moviesModel.getTopRated(TOP_RATED_FILMS_COUNT);

    if (topRated[0].totalRating > 0) {
      topRated.forEach((movieModel) => {
        new MovieController(movieModel, commentsModel, this._apiWithProvider).render(topRates);
      });

      render(this._parentComponent.getElement(), topRates.getElement());
    }
  }
}
