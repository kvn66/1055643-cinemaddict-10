import {render} from "../utils";
import MovieController from "./movie";
import MostCommentedComponent from "../components/most-commented";

const MOST_COMMENTED_FILMS_COUNT = 2;

export default class MostCommentedController {
  constructor(parentComponent, api) {
    this._parentComponent = parentComponent;
    this._api = api;
  }

  render(moviesModel) {
    const mostCommentedComponent = new MostCommentedComponent();
    const mostCommented = moviesModel.getMostCommented(MOST_COMMENTED_FILMS_COUNT);

    if (mostCommented[0].comments.length > 0) {
      mostCommented.forEach((movieModel) => {
        new MovieController(movieModel, this._api).render(mostCommentedComponent);
      });

      render(this._parentComponent.getElement(), mostCommentedComponent.getElement());
    }
  }
}
