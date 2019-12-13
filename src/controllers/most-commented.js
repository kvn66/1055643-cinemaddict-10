import {render} from "../utils";
import MovieController from "./movie";
import MostCommentedComponent from "../components/most-commented";

const MOST_COMMENTED_FILMS_COUNT = 2;

export default class MostCommentedController {
  constructor(parentElement) {
    this._parentElement = parentElement;
  }

  getMostCommented(films) {
    return films.slice().sort((a, b) => b.comments.length - a.comments.length).slice(0, MOST_COMMENTED_FILMS_COUNT);
  }

  render(films) {
    const mostCommentedComponent = new MostCommentedComponent();
    const movieController = new MovieController(mostCommentedComponent.getContainerElement());
    const mostCommented = this.getMostCommented(films);

    if (mostCommented[0].comments.length > 0) {
      mostCommented.forEach((film) => {
        movieController.render(film);
      });

      render(this._parentElement, mostCommentedComponent.getElement());
    }
  }
}
