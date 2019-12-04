import FilmCard from './film-card.js';
import FilmDetails from './film-details.js';
import {render, RenderPosition} from "../utils";

export const createFilmElement = (film) => {
  const filmCard = new FilmCard(film);
  const filmDetails = new FilmDetails(film);
  const footer = document.querySelector(`.footer`);
  const cardElement = filmCard.getElement();
  const detailsElement = filmDetails.getElement();

  const onEscKeyDown = (evt) => {
    const isEscKey = evt.key === `Escape` || evt.key === `Esc`;

    if (isEscKey) {
      document.querySelector(`.film-details`).remove();
      document.removeEventListener(`click`, onCloseClick);
      document.removeEventListener(`keydown`, onEscKeyDown);
    }
  };

  const onCloseClick = () => {
    document.querySelector(`.film-details`).remove();
    document.removeEventListener(`click`, onCloseClick);
    document.removeEventListener(`keydown`, onEscKeyDown);
  };

  const onClick = () => {
    detailsElement.querySelector(`.film-details__close-btn`).addEventListener(`click`, onCloseClick);
    render(footer, detailsElement, RenderPosition.AFTEREND);
    document.addEventListener(`keydown`, onEscKeyDown);
  };

  cardElement.querySelector(`.film-card__title`).addEventListener(`click`, onClick);
  cardElement.querySelector(`.film-card__poster`).addEventListener(`click`, onClick);
  cardElement.querySelector(`.film-card__comments`).addEventListener(`click`, onClick);

  return cardElement;
};
