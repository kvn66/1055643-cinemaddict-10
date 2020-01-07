import {render} from "../utils";
import MovieController from "./movie";
import MostCommentedComponent from "../components/most-commented";

const MOST_COMMENTED_FILMS_COUNT = 2;

export default class MostCommentedController {
  constructor(parentComponent, apiWithProvider) {
    this._parentComponent = parentComponent;
    this._apiWithProvider = apiWithProvider;
  }

  render(moviesModel, commentsModel) {
    const mostCommentedComponent = new MostCommentedComponent();
    const mostCommented = moviesModel.getMostCommented(MOST_COMMENTED_FILMS_COUNT);

    if (mostCommented[0].comments.length > 0) {
      mostCommented.forEach((movieModel) => {
        new MovieController(movieModel, commentsModel, this._apiWithProvider).render(mostCommentedComponent);
      });

      render(this._parentComponent.getElement(), mostCommentedComponent.getElement());
    }
  }
}
