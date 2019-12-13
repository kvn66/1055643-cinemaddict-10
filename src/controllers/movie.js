import {render, RenderPosition} from "../utils";
import FilmCardComponent from "../components/film-card";
import FilmDetailsComponent from "../components/film-details";
import UserRatingComponent from "../components/user-rating";
import CommentsController from "./comments";

export default class MovieController {
  constructor(parentElement) {
    this._parentElement = parentElement;
  }

  _applayChangeToView(datafield, cardElement, detailElement) {
    if (datafield) {
      if (!cardElement.classList.contains(`film-card__controls-item--active`)) {
        cardElement.classList.add(`film-card__controls-item--active`);
      }
      if (!detailElement.checked) {
        detailElement.checked = true;
      }
    } else {
      if (cardElement.classList.contains(`film-card__controls-item--active`)) {
        cardElement.classList.remove(`film-card__controls-item--active`);
      }
      if (detailElement.checked) {
        detailElement.checked = false;
      }
    }
  }

  _renderUserRating(datafield, filmDetails, userRatingComponent) {
    const controls = filmDetails.getElement().querySelector(`.film-details__controls`);
    const userRatingElement = filmDetails.getElement().querySelector(`.form-details__middle-container`);
    if (datafield) {
      if (!userRatingElement) {
        render(controls, userRatingComponent.getElement(), RenderPosition.AFTEREND);
      }
    } else {
      if (userRatingElement) {
        userRatingComponent.getElement().remove();
      }
    }
  }

  render(film) {
    let filmCard = new FilmCardComponent(film);
    let filmDetails = new FilmDetailsComponent(film);
    const footer = document.querySelector(`.footer`);
    new CommentsController(filmDetails.getElement()).render(film);
    const userRatingComponent = new UserRatingComponent();

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

    const onWatchlistClick = (evt) => {
      evt.preventDefault();
      film.isAddedToWatchlist = !film.isAddedToWatchlist;
      const event = new Event(`watchlistChange`);
      document.dispatchEvent(event);
    };

    document.addEventListener(`watchlistChange`, () => {
      const cardWatchlist = filmCard.getElement().querySelector(`.film-card__controls-item--add-to-watchlist`);
      const detailWatchlist = filmDetails.getElement().querySelector(`#watchlist`);
      this._applayChangeToView(film.isAddedToWatchlist, cardWatchlist, detailWatchlist);
    });

    const onWatchedClick = (evt) => {
      evt.preventDefault();
      film.isAlreadyWatched = !film.isAlreadyWatched;
      const event = new Event(`watchedChange`);
      document.dispatchEvent(event);
    };

    document.addEventListener(`watchedChange`, () => {
      const cardWatched = filmCard.getElement().querySelector(`.film-card__controls-item--mark-as-watched`);
      const detailWatched = filmDetails.getElement().querySelector(`#watched`);
      this._applayChangeToView(film.isAlreadyWatched, cardWatched, detailWatched);
      this._renderUserRating(film.isAlreadyWatched, filmDetails, userRatingComponent);
    });

    const onFavoriteClick = (evt) => {
      evt.preventDefault();
      film.isAddedToFavorites = !film.isAddedToFavorites;
      const event = new Event(`favoriteChange`);
      document.dispatchEvent(event);
    };

    document.addEventListener(`favoriteChange`, () => {
      const cardFavorite = filmCard.getElement().querySelector(`.film-card__controls-item--favorite`);
      const detailFavorite = filmDetails.getElement().querySelector(`#favorite`);
      this._applayChangeToView(film.isAddedToFavorites, cardFavorite, detailFavorite);
    });

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
    this._renderUserRating(film.isAlreadyWatched, filmDetails, userRatingComponent);
    render(this._parentElement, filmCard.getElement());
  }
}
