import {render} from "../utils";
import FilmController from "./film";
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
    const mostCommentedFilmsListContainerElement = mostCommentedComponent.getElement().querySelector(`.films-list__container`);
    const filmController = new FilmController(mostCommentedFilmsListContainerElement);
    const mostCommented = this.getMostCommented(films);

    if (mostCommented[0].comments.length > 0) {
      mostCommented.forEach((film) => {
        filmController.render(film);
      });

      render(this._parentElement, mostCommentedComponent.getElement());
    }
  }
}
