import he from 'he';
import {render, RenderPosition} from "../utils";
import FilmCardComponent from "../components/film-card";
import FilmDetailsComponent from "../components/film-details";
import UserRatingComponent from "../components/user-rating";
import CommentsController from "./comments";
import CommentsModel from "../models/comments";

const RADIX = 10;

const localComment = {
  'comment': ``,
  'date': null,
  'emotion': ``
};

export default class MovieController {
  constructor(movieModel, api) {
    this._movieModel = movieModel;
    this._api = api;
    this._filmCard = new FilmCardComponent(this._movieModel);
    this._filmDetails = new FilmDetailsComponent(this._movieModel);
    this._footerElement = document.querySelector(`.footer`);
    this._userRatingComponent = new UserRatingComponent();
    this._pressedKey = new Set();
    this._detailsIsOpened = false;
    this._commentsController = new CommentsController(this._filmDetails, this._movieModel, this._api);

    this._onCtrlEnterKeyDown = this._onCtrlEnterKeyDown.bind(this);
    this._onCtrlEnterKeyUp = this._onCtrlEnterKeyUp.bind(this);
    this._onEscKeyDown = this._onEscKeyDown.bind(this);
    this._onWatchlistClick = this._onWatchlistClick.bind(this);
    this._onWatchedClick = this._onWatchedClick.bind(this);
    this._onFavoriteClick = this._onFavoriteClick.bind(this);
    this._onOpenDetailsClick = this._onOpenDetailsClick.bind(this);
  }

  render(parentComponent) {
    document.addEventListener(`commentAdded`, (evt) => {
      if (evt.detail === this._movieModel.id) {
        this._filmDetails.updateCommentsCount();
        this._filmCard.commentsCount = this._movieModel.comments.length;
      }
    });

    document.addEventListener(`commentRemoved`, (evt) => {
      if (evt.detail === this._movieModel.id) {
        this._filmDetails.updateCommentsCount();
        this._filmCard.commentsCount = this._movieModel.comments.length;
      }
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

    document.addEventListener(`openDetails`, () => {
      if (this._detailsIsOpened) {
        this._closeDetails();
      }
    });

    this._setFilmCardHandlers();
    this._renderUserRating(this._movieModel.isAlreadyWatched);
    render(parentComponent.getContainerElement(), this._filmCard.getElement());
  }

  _setUserRating(rating) {
    this._movieModel.userRating = rating;
    this._api.updateMovie(this._movieModel.id, this._movieModel.toRAW()).then((movieJson) => {
      this._movieModel.update(movieJson);
    });
  }

  _resetUserRating() {
    this._movieModel.userRating = 0;
    this._api.updateMovie(this._movieModel.id, this._movieModel.toRAW()).then((movieJson) => {
      this._movieModel.update(movieJson);
    });
  }

  _renderUserRating(datafield) {
    if (datafield) {
      if (!this._filmDetails.getUserRatingElement()) {
        this._userRatingComponent.setChecked(this._movieModel.userRating);
        this._userRatingComponent.setUserRatingClickHandler((evt) => {
          this._setUserRating(parseInt(evt.target.value, RADIX));
        });
        this._userRatingComponent.setUndoUserRatingClickHandler(() => {
          this._resetUserRating();
          this._userRatingComponent.setChecked(this._movieModel.userRating);
        });
        render(this._filmDetails.getControlsElement(), this._userRatingComponent.getElement(), RenderPosition.AFTEREND);
      }
    } else {
      if (this._filmDetails.getUserRatingElement()) {
        this._userRatingComponent.getElement().remove();
        this._resetUserRating();
        this._userRatingComponent.setChecked(this._movieModel.userRating);
      }
    }
  }

  _createComment() {
    const formData = new FormData(this._filmDetails.getFormElement());
    const commentText = he.encode(formData.get(`comment`));
    const emoji = formData.get(`comment-emoji`);

    if (commentText !== `` && emoji) {
      localComment.comment = commentText;
      localComment.emotion = emoji;
      localComment.date = new Date();
      this._api.createComment(this._movieModel.id, localComment)
        .then((out) => out.comments)
        .then(CommentsModel.parseComments)
        .then((comments) => {
          this._movieModel.comments.fillModel(comments);
          this._commentsController.render();
          this._filmDetails.resetComment();
          document.dispatchEvent(new CustomEvent(`commentAdded`, {'detail': this._movieModel.id}));
        });
    }
  }

  _onCtrlEnterKeyDown(evt) {
    this._pressedKey.add(evt.key);
    if (!((this._pressedKey.has(`Control`) || this._pressedKey.has(`Meta`)) && this._pressedKey.has(`Enter`))) {
      return;
    }
    this._pressedKey.clear();
    this._createComment();
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
    this._detailsIsOpened = false;
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
    this._api.updateMovie(this._movieModel.id, this._movieModel.toRAW()).then((movieJson) => {
      this._movieModel.update(movieJson);
      document.dispatchEvent(new CustomEvent(`watchlistChange`, {'detail': this._movieModel.isAddedToWatchlist}));
    });
  }

  _onWatchedClick(evt) {
    evt.preventDefault();
    this._movieModel.isAlreadyWatched = !this._movieModel.isAlreadyWatched;
    if (this._movieModel.isAlreadyWatched) {
      this._movieModel.watchingDate = new Date();
    }
    this._api.updateMovie(this._movieModel.id, this._movieModel.toRAW()).then((movieJson) => {
      this._movieModel.update(movieJson);
      document.dispatchEvent(new CustomEvent(`watchedChange`, {'detail': this._movieModel.isAlreadyWatched}));
    });
  }

  _onFavoriteClick(evt) {
    evt.preventDefault();
    this._movieModel.isAddedToFavorites = !this._movieModel.isAddedToFavorites;
    this._api.updateMovie(this._movieModel.id, this._movieModel.toRAW()).then((movieJson) => {
      this._movieModel.update(movieJson);
      document.dispatchEvent(new CustomEvent(`favoriteChange`, {'detail': this._movieModel.isAddedToFavorites}));
    });
  }

  _setDetailHandlers() {
    this._filmDetails.setCloseClickHandler(() => {
      this._closeDetails();
    });
    this._filmDetails.setWatchlistClickHandler(this._onWatchlistClick);
    this._filmDetails.setWatchedClickHandler(this._onWatchedClick);
    this._filmDetails.setFavoriteClickHandler(this._onFavoriteClick);
  }

  _openDetails() {
    if (!this._detailsIsOpened) {
      this._detailsIsOpened = true;
      this._setDetailHandlers();
      render(this._footerElement, this._filmDetails.getElement(), RenderPosition.AFTEREND);
      document.addEventListener(`keydown`, this._onEscKeyDown);
      document.addEventListener(`keydown`, this._onCtrlEnterKeyDown);
      document.addEventListener(`keyup`, this._onCtrlEnterKeyUp);
    }
  }

  _onOpenDetailsClick() {
    document.dispatchEvent(new CustomEvent(`openDetails`, {'detail': this._movieModel.id}));
    this._openDetails();
    this._api.getComments(this._movieModel.id)
      .then(CommentsModel.parseComments)
      .then((comments) => {
        const commentsModel = new CommentsModel();
        commentsModel.fillModel(comments);
        this._movieModel.comments = commentsModel;
        this._commentsController.render();
      });
  }

  _setFilmCardHandlers() {
    this._filmCard.setOpenDetailsClickHandler(this._onOpenDetailsClick);
    this._filmCard.setWatchlistClickHandler(this._onWatchlistClick);
    this._filmCard.setWatchedClickHandler(this._onWatchedClick);
    this._filmCard.setFavoriteClickHandler(this._onFavoriteClick);
  }
}
