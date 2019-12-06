import {render, RenderPosition} from "../utils";

const SHOWING_FILMS_COUNT_ON_START = 5;
const SHOWING_FILMS_COUNT_BY_BUTTON = 5;

export default class FilmsListController {
  constructor(container) {
    this._filmsListComponent = container;
    this._showingFilmsCount = SHOWING_FILMS_COUNT_ON_START;
  }

  render(films) {
    const filmsListElement = this._filmsListComponent.getElement();

    const title = filmsListElement.querySelector(`.films-list__title`);

    if (films.length) {
      title.classList.add(`visually-hidden`);

      const filmsListContainerElement = filmsListElement.querySelector(`.films-list__container`);

      films.slice(0, this._showingFilmsCount).forEach((film) => {
        render(filmsListContainerElement, createFilmElement(film));
      });

      render(filmsListContainerElement, new ShowMore().getElement(), RenderPosition.AFTEREND);

      upgradeElement(filmsListElement, films);

    } else {
      title.textContent = `There are no movies in our database`;
      title.classList.remove(`visually-hidden`);
    }
    return filmsListElement;
  }
}
