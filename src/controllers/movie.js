import {render, RenderPosition} from "../utils";
import FilmCardComponent from "../components/film-card";
import FilmDetailsComponent from "../components/film-details";
import CommentsController from "./comments";

export default class MovieController {
  constructor(parentElement) {
    this._parentElement = parentElement;
  }

  render(film) {
    let filmCard = new FilmCardComponent(film);
    let filmDetails = new FilmDetailsComponent(film);
    const footer = document.querySelector(`.footer`);
    new CommentsController(filmDetails.getElement()).render(film);

    const rerenderFilmCard = () => {
      const newFilmCard = new FilmCardComponent(film);
      filmCard.getElement().replaceWith(newFilmCard.getElement());
      filmCard = newFilmCard;
      setFilmCardHandlers();
    };

    const rerenderDetails = () => {
      const newFilmDetails = new FilmDetailsComponent(film);
      filmDetails.getElement().replaceWith(newFilmDetails.getElement());
      filmDetails = newFilmDetails;
      setDetailHandlers();
      new CommentsController(filmDetails.getElement()).render(film);
    };

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

    const onWatchlistClick = () => {
      film.isAddedToWatchlist = !film.isAddedToWatchlist;
      rerenderFilmCard();
      rerenderDetails();
    };

    const onWatchedClick = () => {
      film.isAlreadyWatched = !film.isAlreadyWatched;
      rerenderFilmCard();
      rerenderDetails();
    };

    const onFavoriteClick = () => {
      film.isAddedToFavorites = !film.isAddedToFavorites;
      rerenderFilmCard();
      rerenderDetails();
    };

    const setDetailHandlers = () => {
      filmDetails.setCloseClickHandler(() => {
        closeDetails();
      });
      filmDetails.setWatchlistClickHandler(onWatchlistClick);
      filmDetails.setWatchedClickHandler(onWatchedClick);
      filmDetails.setFavoriteClickHandler(onFavoriteClick);
    };

    const onOpenDetailsClick = () => {
      setDetailHandlers();
      render(footer, filmDetails.getElement(), RenderPosition.AFTEREND);
      document.addEventListener(`keydown`, onEscKeyDown);
    };

    const setFilmCardHandlers = () => {
      filmCard.setOpenDetailsClickHandler(onOpenDetailsClick);
      filmCard.setWatchlistClickHandler(onWatchlistClick);
      filmCard.setWatchedClickHandler(onWatchedClick);
      filmCard.setFavoriteClickHandler(onFavoriteClick);
    };

    setFilmCardHandlers();
    render(this._parentElement, filmCard.getElement());
  }
}
