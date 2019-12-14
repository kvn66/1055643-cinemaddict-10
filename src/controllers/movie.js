import {render, RenderPosition} from "../utils";
import FilmCardComponent from "../components/film-card";
import FilmDetailsComponent from "../components/film-details";
import UserRatingComponent from "../components/user-rating";
import CommentsController from "./comments";

export default class MovieController {
  constructor(parentComponent) {
    this._parentComponent = parentComponent;
  }

  _renderUserRating(datafield, filmDetails, userRatingComponent) {
    if (datafield) {
      if (!filmDetails.getUserRatingElement()) {
        render(filmDetails.getControlsElement(), userRatingComponent.getElement(), RenderPosition.AFTEREND);
      }
    } else {
      if (filmDetails.getUserRatingElement()) {
        userRatingComponent.getElement().remove();
      }
    }
  }

  render(film) {
    const filmCard = new FilmCardComponent(film);
    const filmDetails = new FilmDetailsComponent(film);
    const footerElement = document.querySelector(`.footer`);
    new CommentsController(filmDetails).render(film);
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
      document.dispatchEvent(new Event(`watchlistChange`));
    };

    document.addEventListener(`watchlistChange`, () => {
      filmCard.watchlistChecked = film.isAddedToWatchlist;
      filmDetails.watchlistChecked = film.isAddedToWatchlist;
    });

    const onWatchedClick = (evt) => {
      evt.preventDefault();
      film.isAlreadyWatched = !film.isAlreadyWatched;
      document.dispatchEvent(new Event(`watchedChange`));
    };

    document.addEventListener(`watchedChange`, () => {
      filmCard.watchedChecked = film.isAlreadyWatched;
      filmDetails.watchedChecked = film.isAlreadyWatched;
      this._renderUserRating(film.isAlreadyWatched, filmDetails, userRatingComponent);
    });

    const onFavoriteClick = (evt) => {
      evt.preventDefault();
      film.isAddedToFavorites = !film.isAddedToFavorites;
      document.dispatchEvent(new Event(`favoriteChange`));
    };

    document.addEventListener(`favoriteChange`, () => {
      filmCard.favoriteChecked = film.isAddedToFavorites;
      filmDetails.favoriteChecked = film.isAddedToFavorites;
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
      render(footerElement, filmDetails.getElement(), RenderPosition.AFTEREND);
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
    render(this._parentComponent.getContainerElement(), filmCard.getElement());
  }
}
