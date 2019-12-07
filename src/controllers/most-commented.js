import {render} from "../utils";
import FilmController from "./film";
import MostCommentedComponent from "../components/most-commented";

export default class MostCommentedController {
  constructor(parentElement) {
    this._parentElement = parentElement;
  }

  render(films) {
    const mostCommentedComponent = new MostCommentedComponent(films);
    const mostCommentedFilmsListContainerElement = mostCommentedComponent.getElement().querySelector(`.films-list__container`);
    const filmController = new FilmController(mostCommentedFilmsListContainerElement);
    const mostCommented = mostCommentedComponent.getMostCommented();

    if (mostCommented[0].comments.length > 0) {
      mostCommented.forEach((film) => {
        filmController.render(film);
      });

      render(this._parentElement, mostCommentedComponent.getElement());
    }
  }
}
