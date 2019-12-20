import {render, RenderPosition} from "../utils";
import FilmCardComponent from "../components/film-card";
import FilmDetailsComponent from "../components/film-details";
import UserRatingComponent from "../components/user-rating";
import CommentsController from "./comments";
import CommentModel from "../models/comment";

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

  render(movieModel) {
    const filmCard = new FilmCardComponent(movieModel);
    const filmDetails = new FilmDetailsComponent(movieModel);
    const footerElement = document.querySelector(`.footer`);
    new CommentsController(filmDetails).render(movieModel);
    const userRatingComponent = new UserRatingComponent();
    let pressedKey = new Set();

    const submitDetailForm = () => {
      const formData = new FormData(filmDetails.getFormElement());
      const comment = formData.get(`comment`);
      const emoji = formData.get(`comment-emoji`);

      if (comment !== `` && emoji) {
        const commentModel = new CommentModel();
        commentModel.id = movieModel.comments.getMaxId() + 1;
        commentModel.text = comment;
        commentModel.emoji = emoji;
        commentModel.date = new Date();
        movieModel.comments.addComment(commentModel);
      }
    };

    document.addEventListener(`commentAdded`, () => {
      filmDetails.updateCommentsCount();
      filmDetails.resetComment();
    });

    const onCtrlEnterKeyDown = (evt) => {
      pressedKey.add(evt.key);
      if (!((pressedKey.has(`Control`) || pressedKey.has(`Meta`)) && pressedKey.has(`Enter`))) {
        return;
      }
      pressedKey.clear();
      submitDetailForm();
    };

    const onCtrlEnterKeyUp = (evt) => {
      pressedKey.delete(evt.key);
    };

    const closeDetails = () => {
      filmDetails.remove();
      document.removeEventListener(`keydown`, onEscKeyDown);
      document.removeEventListener(`keydown`, onCtrlEnterKeyDown);
      document.removeEventListener(`keyup`, onCtrlEnterKeyUp);
      pressedKey.clear();
    };

    const onEscKeyDown = (evt) => {
      const isEscKey = evt.key === `Escape` || evt.key === `Esc`;

      if (isEscKey) {
        closeDetails();
      }
    };

    const onWatchlistClick = (evt) => {
      evt.preventDefault();
      movieModel.isAddedToWatchlist = !movieModel.isAddedToWatchlist;
    };

    document.addEventListener(`watchlistChange`, () => {
      filmCard.watchlistChecked = movieModel.isAddedToWatchlist;
      filmDetails.watchlistChecked = movieModel.isAddedToWatchlist;
    });

    const onWatchedClick = (evt) => {
      evt.preventDefault();
      movieModel.isAlreadyWatched = !movieModel.isAlreadyWatched;
    };

    document.addEventListener(`watchedChange`, () => {
      filmCard.watchedChecked = movieModel.isAlreadyWatched;
      filmDetails.watchedChecked = movieModel.isAlreadyWatched;
      this._renderUserRating(movieModel.isAlreadyWatched, filmDetails, userRatingComponent);
    });

    const onFavoriteClick = (evt) => {
      evt.preventDefault();
      movieModel.isAddedToFavorites = !movieModel.isAddedToFavorites;
    };

    document.addEventListener(`favoriteChange`, () => {
      filmCard.favoriteChecked = movieModel.isAddedToFavorites;
      filmDetails.favoriteChecked = movieModel.isAddedToFavorites;
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
      document.addEventListener(`keydown`, onCtrlEnterKeyDown);
      document.addEventListener(`keyup`, onCtrlEnterKeyUp);
    };

    const setFilmCardHandlers = () => {
      filmCard.setOpenDetailsClickHandler(onOpenDetailsClick);
      filmCard.setWatchlistClickHandler(onWatchlistClick);
      filmCard.setWatchedClickHandler(onWatchedClick);
      filmCard.setFavoriteClickHandler(onFavoriteClick);
    };

    setFilmCardHandlers();
    this._renderUserRating(movieModel.isAlreadyWatched, filmDetails, userRatingComponent);
    render(this._parentComponent.getContainerElement(), filmCard.getElement());
  }
}
