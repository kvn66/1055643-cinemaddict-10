import {render, RenderPosition} from '../utils';
import MovieController from './movie';
import MostCommentedComponent from '../components/most-commented';

const MOST_COMMENTED_FILMS_COUNT = 2;

export default class MostCommentedController {
  constructor(moviesModel, commentsModel, parentComponent, apiWithProvider) {
    this._moviesModel = moviesModel;
    this._commentsModel = commentsModel;
    this._parentComponent = parentComponent;
    this._apiWithProvider = apiWithProvider;
    this._mostCommentedComponent = null;
  }

  render() {
    const mostCommented = this._moviesModel.getMostCommented(MOST_COMMENTED_FILMS_COUNT);

    if (this._moviesModel.getMovies().length) {
      if (mostCommented[0].comments.length > 0) {
        const mostCommentedComponent = new MostCommentedComponent();
        mostCommented.forEach((movieModel) => {
          new MovieController(movieModel, this._commentsModel, this._apiWithProvider).render(mostCommentedComponent);
        });

        this._renderElement(this._parentComponent.getElement(), mostCommentedComponent.getElement());

        this._mostCommentedComponent = mostCommentedComponent;
      } else {
        this._removeElement();
      }
    } else {
      this._removeElement();
    }
  }

  _removeElement() {
    if (this._mostCommentedComponent) {
      this._mostCommentedComponent.remove();
      this._mostCommentedComponent = null;
    }
  }

  _renderElement(containerElement, element, place = RenderPosition.BEFOREEND) {
    if (!this._mostCommentedComponent) {
      render(containerElement, element, place);
    } else {
      const mostCommentedElement = this._mostCommentedComponent.getElement();
      if (containerElement.contains(mostCommentedElement)) {
        mostCommentedElement.replaceWith(element);
      }
    }
  }
}
