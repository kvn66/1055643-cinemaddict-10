import {render, RenderPosition} from "../utils";
import MovieController from "./movie";
import MostCommentedComponent from "../components/most-commented";

const MOST_COMMENTED_FILMS_COUNT = 2;

export default class MostCommentedController {
  constructor(parentComponent, apiWithProvider) {
    this._parentComponent = parentComponent;
    this._apiWithProvider = apiWithProvider;
    this._mostCommentedComponent = null;
  }

  render(moviesModel, commentsModel) {
    const mostCommentedComponent = new MostCommentedComponent();
    const mostCommented = moviesModel.getMostCommented(MOST_COMMENTED_FILMS_COUNT);

    if (mostCommented[0].comments.length > 0) {
      mostCommented.forEach((movieModel) => {
        new MovieController(movieModel, commentsModel, this._apiWithProvider).render(mostCommentedComponent);
      });

      this._renderElement(this._parentComponent.getElement(), mostCommentedComponent.getElement());

      this._mostCommentedComponent = mostCommentedComponent;
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
