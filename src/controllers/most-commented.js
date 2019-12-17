import {render} from "../utils";
import MovieController from "./movie";
import MostCommentedComponent from "../components/most-commented";

const MOST_COMMENTED_FILMS_COUNT = 2;

export default class MostCommentedController {
  constructor(parentComponent) {
    this._parentComponent = parentComponent;
  }

  render(moviesModel) {
    const mostCommentedComponent = new MostCommentedComponent();
    const movieController = new MovieController(mostCommentedComponent);
    const mostCommented = moviesModel.getMostCommented(MOST_COMMENTED_FILMS_COUNT);

    if (mostCommented[0].comments.length > 0) {
      mostCommented.forEach((movieModel) => {
        movieController.render(movieModel);
      });

      render(this._parentComponent.getElement(), mostCommentedComponent.getElement());
    }
  }
}
