import {createElement} from '../utils.js';
import {render, RenderPosition} from "../utils";
import {createFilmElement} from "./film";
import ShowMore from "./show-more";

const SHOWING_FILMS_COUNT_ON_START = 5;
const SHOWING_FILMS_COUNT_BY_BUTTON = 5;

let showingFilmsCount = SHOWING_FILMS_COUNT_ON_START;

const upgradeElement = (element, films) => {
  const filmsListContainerElement = element.querySelector(`.films-list__container`);
  const showMoreButton = element.querySelector(`.films-list__show-more`);
  showMoreButton.addEventListener(`click`, () => {
    const prevFilmsCount = showingFilmsCount;
    showingFilmsCount = showingFilmsCount + SHOWING_FILMS_COUNT_BY_BUTTON;

    films.slice(prevFilmsCount, showingFilmsCount)
      .forEach((film) => render(filmsListContainerElement, createFilmElement(film)));

    if (showingFilmsCount >= films.length) {
      showMoreButton.remove();
    }
  });
};

export default class FilmsList {
  constructor(films) {
    this._films = films;
    this._element = null;
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
      const title = this._element.querySelector(`.films-list__title`);
      if (this._films.length) {
        title.classList.add(`visually-hidden`);

        const filmsListContainerElement = this._element.querySelector(`.films-list__container`);

        this._films.slice(0, showingFilmsCount).forEach((film) => {
          render(filmsListContainerElement, createFilmElement(film));
        });

        render(filmsListContainerElement, new ShowMore().getElement(), RenderPosition.AFTEREND);

        upgradeElement(this._element, this._films);
      } else {
        title.textContent = `There are no movies in our database`;
        title.classList.remove(`visually-hidden`);
      }
    }

    return this._element;
  }

  removeElement() {
    this._element = null;
  }

  getTemplate() {
    return (
      `<section class="films-list">
      <h2 class="films-list__title visually-hidden">All movies. Upcoming</h2>

      <div class="films-list__container"></div>
      </section>`
    );
  }
}
