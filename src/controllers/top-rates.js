import {render, RenderPosition} from "../utils";
import TopRatesComponent from "../components/top-rates";
import MovieController from "./movie";

const TOP_RATED_FILMS_COUNT = 2;

export default class TopRatesController {
  constructor(parentComponent, apiWithProvider) {
    this._parentComponent = parentComponent;
    this._apiWithProvider = apiWithProvider;
  }

  render(moviesModel, commentsModel) {
    const topRatesComponent = new TopRatesComponent();
    const topRated = moviesModel.getTopRated(TOP_RATED_FILMS_COUNT);

    if (topRated[0].totalRating > 0) {
      topRated.forEach((movieModel) => {
        new MovieController(movieModel, commentsModel, this._apiWithProvider).render(topRatesComponent);
      });

      this._renderElement(this._parentComponent.getElement(), topRatesComponent.getElement());

      this._topRatesComponent = topRatesComponent;
    }
  }

  _renderElement(containerElement, element, place = RenderPosition.BEFOREEND) {
    if (!this._topRatesComponent) {
      render(containerElement, element, place);
    } else {
      const topRatesElement = this._topRatesComponent.getElement();
      if (containerElement.contains(topRatesElement)) {
        topRatesElement.replaceWith(element);
      }
    }
  }
}
