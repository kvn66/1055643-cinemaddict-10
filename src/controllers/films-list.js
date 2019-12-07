import {render, RenderPosition} from "../utils";
import FilmController from "./film.js";
import ShowMoreComponent from "../components/show-more";
import FilmsListComponent from "../components/films-list";

const SHOWING_FILMS_COUNT_ON_START = 5;
const SHOWING_FILMS_COUNT_BY_BUTTON = 5;

export default class FilmsListController {
  constructor(parentElement) {
    this._parentElement = parentElement;
  }

  render(films) {
    const docFilmsListElement = document.querySelector(`.films-list`);
    if (docFilmsListElement) {
      docFilmsListElement.remove();
    }
    let showingFilmsCount = SHOWING_FILMS_COUNT_ON_START;
    const filmsListComponent = new FilmsListComponent();
    const filmsListElement = filmsListComponent.getElement();
    const title = filmsListElement.querySelector(`.films-list__title`);
    const filmsListContainerElement = filmsListElement.querySelector(`.films-list__container`);
    const filmController = new FilmController(filmsListContainerElement);
    const showMoreComponent = new ShowMoreComponent();

    const onClick = () => {
      const prevFilmsCount = showingFilmsCount;
      showingFilmsCount = showingFilmsCount + SHOWING_FILMS_COUNT_BY_BUTTON;

      films.slice(prevFilmsCount, showingFilmsCount)
        .forEach((film) => filmController.render(film));

      if (showingFilmsCount >= films.length) {
        showMoreComponent.remove();
      }
    };

    if (films.length) {
      title.classList.add(`visually-hidden`);

      films.slice(0, showingFilmsCount).forEach((film) => {
        filmController.render(film);
      });

      render(filmsListContainerElement, showMoreComponent.getElement(), RenderPosition.AFTEREND);

      showMoreComponent.setClickHandler(onClick);
    } else {
      title.textContent = `There are no movies in our database`;
      title.classList.remove(`visually-hidden`);
    }

    render(this._parentElement, filmsListElement, RenderPosition.AFTERBEGIN);
  }
}
