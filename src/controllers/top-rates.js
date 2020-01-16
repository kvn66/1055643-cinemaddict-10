import {render, RenderPosition} from '../utils';
import TopRatesComponent from '../components/top-rates';
import MovieController from './movie';

const TOP_RATED_FILMS_COUNT = 2;

export default class TopRatesController {
  constructor(moviesModel, commentsModel, parentComponent, apiWithProvider) {
    this._moviesModel = moviesModel;
    this._commentsModel = commentsModel;
    this._parentComponent = parentComponent;
    this._apiWithProvider = apiWithProvider;
    this._topRatesComponent = null;
  }

  render() {
    const topRated = this._moviesModel.getTopRated(TOP_RATED_FILMS_COUNT);

    if (this._moviesModel.getMovies().length) {
      if (topRated[0].totalRating > 0) {
        const topRatesComponent = new TopRatesComponent();
        topRated.forEach((movieModel) => {
          new MovieController(movieModel, this._commentsModel, this._apiWithProvider).render(topRatesComponent);
        });

        this._renderElement(this._parentComponent.getElement(), topRatesComponent.getElement());

        this._topRatesComponent = topRatesComponent;
      } else {
        this._removeElement();
      }
    } else {
      this._removeElement();
    }
  }

  _removeElement() {
    if (this._topRatesComponent) {
      this._topRatesComponent.remove();
      this._topRatesComponent = null;
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
