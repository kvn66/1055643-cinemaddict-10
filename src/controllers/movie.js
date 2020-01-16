import he from 'he';
import {render, RenderPosition} from '../utils';
import FilmCardComponent from '../components/film-card';
import FilmDetailsComponent from '../components/film-details';
import UserRatingComponent from '../components/user-rating';
import CommentsController from './comments';
import CommentsModel from '../models/comments';
import MovieModel from '../models/movie';
import CommentModel from '../models/comment';

const RADIX = 10;
const SHAKE_ANIMATION_TIMEOUT = 600;
const SHADOW_STYLE = `inset 0 0 5px 2px red`;
const DEBOUNCE_TIMEOUT = 500;

export default class MovieController {
  constructor(movieModel, commentsModel, apiWithProvider) {
    this._movieModel = movieModel;
    this._commentsModel = commentsModel;
    this._apiWithProvider = apiWithProvider;
    this._filmCard = new FilmCardComponent(this._movieModel);
    this._filmDetails = new FilmDetailsComponent(this._movieModel);
    this._footerElement = document.querySelector(`.footer`);
    this._userRatingComponent = new UserRatingComponent();
    this._pressedKey = new Set();
    this._detailsIsOpened = false;
    this._commentsController = new CommentsController(this._filmDetails, movieModel, commentsModel, this._apiWithProvider);

    this._onCtrlEnterKeyDown = this._onCtrlEnterKeyDown.bind(this);
    this._onCtrlEnterKeyUp = this._onCtrlEnterKeyUp.bind(this);
    this._onEscKeyDown = this._onEscKeyDown.bind(this);
    this._onWatchlistClick = this._onWatchlistClick.bind(this);
    this._onWatchedClick = this._onWatchedClick.bind(this);
    this._onFavoriteClick = this._onFavoriteClick.bind(this);
    this._onOpenDetailsClick = this._onOpenDetailsClick.bind(this);
    this._debounce = this._debounce.bind(this);

    document.addEventListener(`commentsChanged`, (evt) => {
      if (evt.detail === this._movieModel.id) {
        this._filmDetails.updateCommentsCount();
        this._filmCard.updateCommentsCount();
      }
    });

    document.addEventListener(`userRatingChanged`, (evt) => {
      if (evt.detail === this._movieModel.id) {
        this._filmDetails.updateRating();
        this._filmCard.updateRating();
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
  }

  render(parentComponent) {
    this._setFilmCardHandlers();
    this._renderUserRating(this._movieModel.isAlreadyWatched);
    render(parentComponent.getContainerElement(), this._filmCard.getElement());
  }

  _shakeElement(element) {
    element.style.animation = `shake ${SHAKE_ANIMATION_TIMEOUT / 1000}s`;

    setTimeout(() => {
      element.style.animation = ``;
    }, SHAKE_ANIMATION_TIMEOUT);
  }

  _setUserRating(rating) {
    this._userRatingComponent.disableInputs();
    this._userRatingComponent.removeErrorStyle();
    const movieModel = MovieModel.clone(this._movieModel);
    movieModel.userRating = rating;
    this._apiWithProvider.updateMovie(this._movieModel.id, movieModel.toRAW())
      .then((movieJson) => {
        this._movieModel.update(movieJson);
        this._userRatingComponent.setChecked(this._movieModel.userRating);
        this._userRatingComponent.enableInputs();
        document.dispatchEvent(new CustomEvent(`userRatingChanged`, {'detail': this._movieModel.id}));
      })
      .catch(() => {
        this._userRatingComponent.setErrorStyle();
        this._shakeElement(this._userRatingComponent.getUserRatingWrapElement());
        this._userRatingComponent.enableInputs();
      });
  }

  _renderUserRating(datafield) {
    if (datafield && !this._filmDetails.getUserRatingElement()) {

      this._userRatingComponent.setChecked(this._movieModel.userRating);
      this._userRatingComponent.setUserRatingClickHandler((evt) => {
        evt.preventDefault();
        this._setUserRating(parseInt(evt.target.value, RADIX));
      });
      this._userRatingComponent.setUndoUserRatingClickHandler(() => {
        this._setUserRating(0);
      });
      render(this._filmDetails.getControlsElement(), this._userRatingComponent.getElement(), RenderPosition.AFTEREND);

    } else if (!datafield && this._filmDetails.getUserRatingElement()) {

      this._userRatingComponent.getElement().remove();
      this._setUserRating(0);
      this._userRatingComponent.setChecked(this._movieModel.userRating);

    }
  }

  _createComment() {
    const formData = new FormData(this._filmDetails.getFormElement());
    const commentText = he.encode(formData.get(`comment`));
    const emoji = formData.get(`comment-emoji`);
    this._filmDetails.getCommentEmojiElement().style.boxShadow = ``;
    this._filmDetails.getCommentInputElement().style.boxShadow = ``;

    if (commentText !== `` && emoji) {
      const newComment = new CommentModel();
      newComment.text = commentText;
      newComment.emoji = emoji;
      newComment.date = new Date();
      this._filmDetails.disableCommentInputs();
      this._apiWithProvider.createComment(this._movieModel.id, newComment.toLocalComment())
        .then((movieAndComments) => {
          this._movieModel.update(movieAndComments.movie);
          this._commentsModel.addComments(CommentsModel.parseComments(movieAndComments.comments));
          this._commentsController.render();
          this._filmDetails.resetComment();
          this._filmDetails.enableCommentInputs();
          document.dispatchEvent(new CustomEvent(`commentsChanged`, {'detail': this._movieModel.id}));
        })
        .catch(() => {
          this._filmDetails.getCommentInputElement().style.boxShadow = SHADOW_STYLE;
          this._shakeElement(this._filmDetails.getCommentInputElement());
          this._filmDetails.enableCommentInputs();
        });
    } else if (commentText !== `` && !emoji) {
      this._filmDetails.getCommentEmojiElement().style.boxShadow = SHADOW_STYLE;
    } else if (commentText === `` && emoji) {
      this._filmDetails.getCommentInputElement().style.boxShadow = SHADOW_STYLE;
    }
  }

  _closeDetails() {
    this._filmDetails.resetComment();
    this._filmDetails.remove();
    document.removeEventListener(`keydown`, this._onEscKeyDown);
    document.removeEventListener(`keydown`, this._onCtrlEnterKeyDown);
    document.removeEventListener(`keyup`, this._onCtrlEnterKeyUp);
    this._pressedKey.clear();
    this._detailsIsOpened = false;
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

  _setFilmCardHandlers() {
    this._filmCard.setOpenDetailsClickHandler(this._onOpenDetailsClick);
    this._filmCard.setWatchlistClickHandler(this._onWatchlistClick);
    this._filmCard.setWatchedClickHandler(this._onWatchedClick);
    this._filmCard.setFavoriteClickHandler(this._onFavoriteClick);
  }

  _debounce(callback, wait) {
    let timerId;
    const timefn = (...args) => {
      const context = this;
      window.clearTimeout(timerId);
      timerId = window.setTimeout(() => callback.apply(context, args), wait);
    };
    return timefn();
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

  _onEscKeyDown(evt) {
    const isEscKey = evt.key === `Escape` || evt.key === `Esc`;

    if (isEscKey) {
      this._closeDetails();
    }
  }

  _onWatchlistClick(evt) {
    evt.preventDefault();

    const _watchlistClick = () => {
      this._movieModel.isAddedToWatchlist = !this._movieModel.isAddedToWatchlist;
      this._apiWithProvider.updateMovie(this._movieModel.id, this._movieModel.toRAW()).then((movieJson) => {
        this._movieModel.update(movieJson);
        document.dispatchEvent(new Event(`watchlistChange`));
      });
    };

    this._debounce(_watchlistClick, DEBOUNCE_TIMEOUT);
  }

  _onWatchedClick(evt) {
    evt.preventDefault();

    const _watchedClick = () => {
      this._movieModel.isAlreadyWatched = !this._movieModel.isAlreadyWatched;
      if (this._movieModel.isAlreadyWatched) {
        this._movieModel.watchingDate = new Date();
      }
      this._apiWithProvider.updateMovie(this._movieModel.id, this._movieModel.toRAW()).then((movieJson) => {
        this._movieModel.update(movieJson);
        document.dispatchEvent(new Event(`watchedChange`));
      });
    };

    this._debounce(_watchedClick, DEBOUNCE_TIMEOUT);
  }

  _onFavoriteClick(evt) {
    evt.preventDefault();

    const _favoriteClick = () => {
      this._movieModel.isAddedToFavorites = !this._movieModel.isAddedToFavorites;
      this._apiWithProvider.updateMovie(this._movieModel.id, this._movieModel.toRAW()).then((movieJson) => {
        this._movieModel.update(movieJson);
        document.dispatchEvent(new Event(`favoriteChange`));
      });
    };

    this._debounce(_favoriteClick, DEBOUNCE_TIMEOUT);
  }

  _onOpenDetailsClick() {
    document.dispatchEvent(new CustomEvent(`openDetails`, {'detail': this._movieModel.id}));
    this._openDetails();
    this._commentsController.render();
  }
}
