import {render, RenderPosition} from "../utils";
import FilmCardComponent from "../components/film-card";
import FilmDetailsComponent from "../components/film-details";
import CommentsController from "./comments";

export default class FilmController {
  constructor(parentElement) {
    this._parentElement = parentElement;
  }

  render(film) {
    const filmCard = new FilmCardComponent(film);
    const filmDetails = new FilmDetailsComponent(film);
    const footer = document.querySelector(`.footer`);
    const cardElement = filmCard.getElement();
    const detailsElement = filmDetails.getElement();
    const commentsController = new CommentsController(detailsElement);

    commentsController.render(film);

    const closeDetails = () => {
      filmDetails.remove();
      document.removeEventListener(`keydown`, onEscKeyDown);
    };

    const onEscKeyDown = (evt) => {
      const isEscKey = evt.key === `Escape` || evt.key === `Esc`;

      if (isEscKey) {
        closeDetails();
      }
    };

    const onCloseClick = () => {
      closeDetails();
    };

    const onClick = () => {
      filmDetails.setClickHandler(onCloseClick);
      render(footer, detailsElement, RenderPosition.AFTEREND);
      document.addEventListener(`keydown`, onEscKeyDown);
    };

    filmCard.setClickHandler(onClick);

    render(this._parentElement, cardElement);
  }
}
