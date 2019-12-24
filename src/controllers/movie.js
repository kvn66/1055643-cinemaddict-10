import he from 'he';
import {render, RenderPosition} from "../utils";
import FilmCardComponent from "../components/film-card";
import FilmDetailsComponent from "../components/film-details";
import UserRatingComponent from "../components/user-rating";
import CommentsController from "./comments";
import CommentModel from "../models/comment";

export default class MovieController {
  constructor(parentComponent, movieModel) {
    this._parentComponent = parentComponent;
    this._movieModel = movieModel;
    this._filmCard = new FilmCardComponent(this._movieModel);
    this._filmDetails = new FilmDetailsComponent(this._movieModel);
    this._footerElement = document.querySelector(`.footer`);
    this._userRatingComponent = new UserRatingComponent();
    this._pressedKey = new Set();

    this._onCtrlEnterKeyDown = this._onCtrlEnterKeyDown.bind(this);
    this._onCtrlEnterKeyUp = this._onCtrlEnterKeyUp.bind(this);
    this._onEscKeyDown = this._onEscKeyDown.bind(this);
    this._onWatchlistClick = this._onWatchlistClick.bind(this);
    this._onWatchedClick = this._onWatchedClick.bind(this);
    this._onFavoriteClick = this._onFavoriteClick.bind(this);
    this._onOpenDetailsClick = this._onOpenDetailsClick.bind(this);
  }

  render() {
    new CommentsController(this._filmDetails, this._movieModel).render();

    document.addEventListener(`commentAdded`, () => {
      this._filmDetails.updateCommentsCount();
      this._filmDetails.resetComment();
    });

    document.addEventListener(`commentRemoved`, () => {
      this._filmDetails.updateCommentsCount();
    });

    document.addEventListener(`watchlistChange`, () => {
      this._filmCard.watchlistChecked = this._movieModel.isAddedToWatchlist;
      this._filmDetails.watchlistChecked = this._movieModel.isAddedToWatchlist;
    });

    document.addEventListener(`watchedChange`, () => {
      this._filmCard.watchedChecked = this._movieModel.isAlreadyWatched;
      this._filmDetails.watchedChecked = this._movieModel.isAlreadyWatched;
      this._renderUserRating(this._movieModel.isAlreadyWatched);
    });

    document.addEventListener(`favoriteChange`, () => {
      this._filmCard.favoriteChecked = this._movieModel.isAddedToFavorites;
      this._filmDetails.favoriteChecked = this._movieModel.isAddedToFavorites;
    });

    this._setFilmCardHandlers();
    this._renderUserRating(this._movieModel.isAlreadyWatched);
    render(this._parentComponent.getContainerElement(), this._filmCard.getElement());
  }

  _renderUserRating(datafield) {
    if (datafield) {
      if (!this._filmDetails.getUserRatingElement()) {
        render(this._filmDetails.getControlsElement(), this._userRatingComponent.getElement(), RenderPosition.AFTEREND);
      }
    } else {
      if (this._filmDetails.getUserRatingElement()) {
        this._userRatingComponent.getElement().remove();
      }
    }
  }

  _submitDetailForm() {
    const formData = new FormData(this._filmDetails.getFormElement());
    const comment = he.encode(formData.get(`comment`));
    const emoji = formData.get(`comment-emoji`);

    if (comment !== `` && emoji) {
      const commentModel = new CommentModel();
      commentModel.id = this._movieModel.comments.getMaxId() + 1;
      commentModel.text = comment;
      commentModel.emoji = emoji;
      commentModel.date = new Date();
      this._movieModel.comments.addComment(commentModel);
    }
  }

  _onCtrlEnterKeyDown(evt) {
    this._pressedKey.add(evt.key);
    if (!((this._pressedKey.has(`Control`) || this._pressedKey.has(`Meta`)) && this._pressedKey.has(`Enter`))) {
      return;
    }
    this._pressedKey.clear();
    this._submitDetailForm();
  }

  _onCtrlEnterKeyUp(evt) {
    this._pressedKey.delete(evt.key);
  }

  _closeDetails() {
    this._filmDetails.remove();
    document.removeEventListener(`keydown`, this._onEscKeyDown);
    document.removeEventListener(`keydown`, this._onCtrlEnterKeyDown);
    document.removeEventListener(`keyup`, this._onCtrlEnterKeyUp);
    this._pressedKey.clear();
  }

  _onEscKeyDown(evt) {
    const isEscKey = evt.key === `Escape` || evt.key === `Esc`;

    if (isEscKey) {
      this._closeDetails();
    }
  }

  _onWatchlistClick(evt) {
    evt.preventDefault();
    this._movieModel.isAddedToWatchlist = !this._movieModel.isAddedToWatchlist;
  }

  _onWatchedClick(evt) {
    evt.preventDefault();
    this._movieModel.isAlreadyWatched = !this._movieModel.isAlreadyWatched;
  }

  _onFavoriteClick(evt) {
    evt.preventDefault();
    this._movieModel.isAddedToFavorites = !this._movieModel.isAddedToFavorites;
  }

  _setDetailHandlers() {
    this._filmDetails.setCloseClickHandler(() => {
      this._closeDetails();
    });
    this._filmDetails.setWatchlistClickHandler(this._onWatchlistClick);
    this._filmDetails.setWatchedClickHandler(this._onWatchedClick);
    this._filmDetails.setFavoriteClickHandler(this._onFavoriteClick);
  }

  _onOpenDetailsClick() {
    this._setDetailHandlers();
    render(this._footerElement, this._filmDetails.getElement(), RenderPosition.AFTEREND);
    document.addEventListener(`keydown`, this._onEscKeyDown);
    document.addEventListener(`keydown`, this._onCtrlEnterKeyDown);
    document.addEventListener(`keyup`, this._onCtrlEnterKeyUp);
  }

  _setFilmCardHandlers() {
    this._filmCard.setOpenDetailsClickHandler(this._onOpenDetailsClick);
    this._filmCard.setWatchlistClickHandler(this._onWatchlistClick);
    this._filmCard.setWatchedClickHandler(this._onWatchedClick);
    this._filmCard.setFavoriteClickHandler(this._onFavoriteClick);
  }
}
