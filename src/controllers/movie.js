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

    const onCardWatchlistClick = () => {
      film.isAddedToWatchlist = !film.isAddedToWatchlist;
      const cardWatchlist = filmCard.getElement().querySelector(`.film-card__controls-item--add-to-watchlist`);
      const detailWatchlist = filmDetails.getElement().querySelector(`#watchlist`);
      if (film.isAddedToWatchlist) {
        cardWatchlist.classList.add(`film-card__controls-item--active`);
        detailWatchlist.checked = true;
      } else {
        cardWatchlist.classList.remove(`film-card__controls-item--active`);
        detailWatchlist.checked = false;
      }
    };

    const onDetailWatchlistClick = () => {
      film.isAddedToWatchlist = !film.isAddedToWatchlist;
      rerenderFilmCard();
      rerenderDetails();
    };

    const onCardWatchedClick = () => {
      film.isAlreadyWatched = !film.isAlreadyWatched;
      const cardWatched = filmCard.getElement().querySelector(`.film-card__controls-item--mark-as-watched`);
      const detailWatched = filmDetails.getElement().querySelector(`#watched`);
      if (film.isAlreadyWatched) {
        cardWatched.classList.add(`film-card__controls-item--active`);
        detailWatched.checked = true;
      } else {
        cardWatched.classList.remove(`film-card__controls-item--active`);
        detailWatched.checked = false;
      }
    };

    const onDetailWatchedClick = () => {
      film.isAlreadyWatched = !film.isAlreadyWatched;
      rerenderFilmCard();
      rerenderDetails();
    };

    const onCardFavoriteClick = () => {
      film.isAddedToFavorites = !film.isAddedToFavorites;
      const cardFavorite = filmCard.getElement().querySelector(`.film-card__controls-item--favorite`);
      const detailFavorite = filmDetails.getElement().querySelector(`#favorite`);
      if (film.isAddedToFavorites) {
        cardFavorite.classList.add(`film-card__controls-item--active`);
        detailFavorite.checked = true;
      } else {
        cardFavorite.classList.remove(`film-card__controls-item--active`);
        detailFavorite.checked = false;
      }
    };

    const onDetailFavoriteClick = () => {
      film.isAddedToFavorites = !film.isAddedToFavorites;
      rerenderFilmCard();
      rerenderDetails();
    };

    const setDetailHandlers = () => {
      filmDetails.setCloseClickHandler(() => {
        closeDetails();
      });
      filmDetails.setWatchlistClickHandler(onDetailWatchlistClick);
      filmDetails.setWatchedClickHandler(onDetailWatchedClick);
      filmDetails.setFavoriteClickHandler(onDetailFavoriteClick);
    };

    const onOpenDetailsClick = () => {
      setDetailHandlers();
      render(footer, filmDetails.getElement(), RenderPosition.AFTEREND);
      document.addEventListener(`keydown`, onEscKeyDown);
    };

    const setFilmCardHandlers = () => {
      filmCard.setOpenDetailsClickHandler(onOpenDetailsClick);
      filmCard.setWatchlistClickHandler(onCardWatchlistClick);
      filmCard.setWatchedClickHandler(onCardWatchedClick);
      filmCard.setFavoriteClickHandler(onCardFavoriteClick);
    };

    setFilmCardHandlers();
    render(this._parentElement, filmCard.getElement());
  }
}
