import {render, RenderPosition} from "../utils";
import MovieController from "./movie";
import MostCommentedComponent from "../components/most-commented";

const MOST_COMMENTED_FILMS_COUNT = 2;

export default class MostCommentedController {
  constructor(parentComponent, api) {
    this._parentComponent = parentComponent;
    this._api = api;
    this._mostCommentedComponent = null;
  }

  render(moviesModel) {
    const mostCommentedComponent = new MostCommentedComponent();
    const mostCommented = moviesModel.getMostCommented(MOST_COMMENTED_FILMS_COUNT);

    if (mostCommented[0].comments.length > 0) {
      mostCommented.forEach((movieModel) => {
        new MovieController(movieModel, this._api).render(mostCommentedComponent);
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
