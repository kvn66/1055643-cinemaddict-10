import AbstractComponent from './abstract-component';
import {getFullDate} from '../utils';

const GENRES_NAME_SWITCH_LIMIT = 1;

export default class FilmDetailsComponent extends AbstractComponent {
  constructor(movieModel) {
    super();
    this._movieModel = movieModel;
    this._genreTitle = this._movieModel.genres.length > GENRES_NAME_SWITCH_LIMIT ? `Genres` : `Genre`;
    this._genres = this._movieModel.genres.map((item) => {
      return (`<span class="film-details__genre">` + item + `</span>`);
    }).join(``);
    this._releaseDate = getFullDate(this._movieModel.releaseDate);
    this._watchlistElement = this.getElement().querySelector(`#watchlist`);
    this._watchedElement = this.getElement().querySelector(`#watched`);
    this._favoriteElement = this.getElement().querySelector(`#favorite`);
    this._watchlistLabelElement = this.getElement().querySelector(`.film-details__control-label--watchlist`);
    this._watchedLabelElement = this.getElement().querySelector(`.film-details__control-label--watched`);
    this._favoriteLabelElement = this.getElement().querySelector(`.film-details__control-label--favorite`);
    this._controlsElement = this.getElement().querySelector(`.film-details__controls`);
    this._closeButtonElement = this.getElement().querySelector(`.film-details__close-btn`);
    this._formElement = this.getElement().querySelector(`.film-details__inner`);
    this._commentsCountElement = this.getElement().querySelector(`.film-details__comments-count`);
    this._commentInputElement = this.getElement().querySelector(`.film-details__comment-input`);
    this._commentEmojiListElement = this.getElement().querySelector(`.film-details__emoji-list`);
    this._emojiInputElements = this._commentEmojiListElement.querySelectorAll(`.film-details__emoji-item`);
    this._commentEmojiElement = this.getElement().querySelector(`.film-details__add-emoji-label`);

    this._onCommentEmojiClick = this._onCommentEmojiClick.bind(this);

    this._setEmojiClickHandlers();
  }

  get watchlistChecked() {
    return this._watchlistElement.checked;
  }

  set watchlistChecked(checked) {
    this._watchlistElement.checked = checked;
  }

  get watchedChecked() {
    return this._watchedElement.checked;
  }

  set watchedChecked(checked) {
    this._watchedElement.checked = checked;
  }

  get favoriteChecked() {
    return this._favoriteElement.checked;
  }

  set favoriteChecked(checked) {
    this._favoriteElement.checked = checked;
  }

  updateCommentsCount() {
    this._commentsCountElement.textContent = this._movieModel.comments.length.toString();
  }

  getFormElement() {
    return this._formElement;
  }

  getControlsElement() {
    return this._controlsElement;
  }

  getCommentInputElement() {
    return this._commentInputElement;
  }

  getCommentsListElement() {
    return this.getElement().querySelector(`.film-details__comments-list`);
  }

  getUserRatingElement() {
    return this.getElement().querySelector(`.form-details__middle-container`);
  }

  setChecked(isChecked) {
    return isChecked ? `checked` : ``;
  }

  setCloseClickHandler(handler) {
    this._closeButtonElement.addEventListener(`click`, handler);
  }

  setWatchlistClickHandler(handler) {
    this._watchlistLabelElement.addEventListener(`click`, handler);
  }

  setWatchedClickHandler(handler) {
    this._watchedLabelElement.addEventListener(`click`, handler);
  }

  setFavoriteClickHandler(handler) {
    this._favoriteLabelElement.addEventListener(`click`, handler);
  }

  enableCommentInputs() {
    this._commentInputElement.disabled = false;
    this._emojiInputElements.forEach((item) => {
      item.disabled = false;
    });
    this._commentEmojiElement.addEventListener(`click`, this._onCommentEmojiClick);
  }

  disableCommentInputs() {
    this._commentInputElement.disabled = true;
    this._emojiInputElements.forEach((item) => {
      item.disabled = true;
    });
    this._commentEmojiElement.removeEventListener(`click`, this._onCommentEmojiClick);
  }

  remove() {
    this.getElement().remove();
  }

  resetComment() {
    this._commentInputElement.value = ``;
    this._removeEmojiImageElement();
    this._resetEmojiInputElements();
  }

  _setEmojiClickHandlers() {
    this._emojiInputElements.forEach((item) => {
      item.addEventListener(`click`, (evt) => {
        this._removeEmojiImageElement();
        switch (evt.target.id) {
          case `emoji-smile`:
            this._commentEmojiElement.insertAdjacentHTML(`beforeend`, `<img src="./images/emoji/smile.png" width="55" height="55" alt="emoji">`);
            break;
          case `emoji-sleeping`:
            this._commentEmojiElement.insertAdjacentHTML(`beforeend`, `<img src="./images/emoji/sleeping.png" width="55" height="55" alt="emoji">`);
            break;
          case `emoji-gpuke`:
            this._commentEmojiElement.insertAdjacentHTML(`beforeend`, `<img src="./images/emoji/puke.png" width="55" height="55" alt="emoji">`);
            break;
          case `emoji-angry`:
            this._commentEmojiElement.insertAdjacentHTML(`beforeend`, `<img src="./images/emoji/angry.png" width="55" height="55" alt="emoji">`);
            break;
          default:
            break;
        }
      });
    });

    this._commentEmojiElement.addEventListener(`click`, this._onCommentEmojiClick);
  }

  _removeEmojiImageElement() {
    const emojiImageElement = this._commentEmojiElement.querySelector(`img`);
    if (emojiImageElement) {
      emojiImageElement.remove();
    }
  }

  _resetEmojiInputElements() {
    this._emojiInputElements.forEach((item) => {
      item.checked = false;
    });
  }

  _getTemplate() {
    return (
      `<section class="film-details">
      <form class="film-details__inner" action="" method="get">
        <div class="form-details__top-container">
          <div class="film-details__close">
            <button class="film-details__close-btn" type="button">close</button>
          </div>
          <div class="film-details__info-wrap">
            <div class="film-details__poster">
              <img class="film-details__poster-img" src="${this._movieModel.poster}" alt="">
    
              <p class="film-details__age">${this._movieModel.age.toString()}+</p>
            </div>
    
            <div class="film-details__info">
              <div class="film-details__info-head">
                <div class="film-details__title-wrap">
                  <h3 class="film-details__title">${this._movieModel.title}</h3>
                  <p class="film-details__title-original">Original: ${this._movieModel.titleOriginal}</p>
                </div>
    
                <div class="film-details__rating">
                  <p class="film-details__total-rating">${this._movieModel.totalRating.toString()}</p>
                </div>
              </div>
    
              <table class="film-details__table">
                <tr class="film-details__row">
                  <td class="film-details__term">Director</td>
                  <td class="film-details__cell">${this._movieModel.director}</td>
                </tr>
                <tr class="film-details__row">
                  <td class="film-details__term">Writers</td>
                  <td class="film-details__cell">${this._movieModel.writers}</td>
                </tr>
                <tr class="film-details__row">
                  <td class="film-details__term">Actors</td>
                  <td class="film-details__cell">${this._movieModel.actors}</td>
                </tr>
                <tr class="film-details__row">
                  <td class="film-details__term">Release Date</td>
                  <td class="film-details__cell">${this._releaseDate}</td>
                </tr>
                <tr class="film-details__row">
                  <td class="film-details__term">Runtime</td>
                  <td class="film-details__cell">${this._movieModel.duration}</td>
                </tr>
                <tr class="film-details__row">
                  <td class="film-details__term">Country</td>
                  <td class="film-details__cell">${this._movieModel.country}</td>
                </tr>
                <tr class="film-details__row">
                  <td class="film-details__term">${this._genreTitle}</td>
                  <td class="film-details__cell">${this._genres}</td>
                </tr>
              </table>
    
              <p class="film-details__film-description">
                ${this._movieModel.description}
              </p>
            </div>
          </div>
    
          <section class="film-details__controls">
            <input type="checkbox" class="film-details__control-input visually-hidden" id="watchlist" name="watchlist" ${this.setChecked(this._movieModel.isAddedToWatchlist)}>
            <label for="watchlist" class="film-details__control-label film-details__control-label--watchlist">Add to watchlist</label>
    
            <input type="checkbox" class="film-details__control-input visually-hidden" id="watched" name="watched" ${this.setChecked(this._movieModel.isAlreadyWatched)}>
            <label for="watched" class="film-details__control-label film-details__control-label--watched">Already watched</label>
    
            <input type="checkbox" class="film-details__control-input visually-hidden" id="favorite" name="favorite" ${this.setChecked(this._movieModel.isAddedToFavorites)}>
            <label for="favorite" class="film-details__control-label film-details__control-label--favorite">Add to favorites</label>
          </section>
        </div>
        
        <div class="form-details__bottom-container">
          <section class="film-details__comments-wrap">
            <h3 class="film-details__comments-title">Comments <span class="film-details__comments-count">${this._movieModel.comments.length}</span></h3>
    
            <ul class="film-details__comments-list"></ul>
    
            <div class="film-details__new-comment">
              <div for="add-emoji" class="film-details__add-emoji-label"></div>
    
              <label class="film-details__comment-label">
                <textarea class="film-details__comment-input" placeholder="Select reaction below and write comment here" name="comment"></textarea>
              </label>
    
              <div class="film-details__emoji-list">
                <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-smile" value="smile">
                <label class="film-details__emoji-label" for="emoji-smile">
                  <img src="./images/emoji/smile.png" width="30" height="30" alt="emoji">
                </label>
    
                <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-sleeping" value="sleeping">
                <label class="film-details__emoji-label" for="emoji-sleeping">
                  <img src="./images/emoji/sleeping.png" width="30" height="30" alt="emoji">
                </label>
    
                <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-gpuke" value="puke">
                <label class="film-details__emoji-label" for="emoji-gpuke">
                  <img src="./images/emoji/puke.png" width="30" height="30" alt="emoji">
                </label>
    
                <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-angry" value="angry">
                <label class="film-details__emoji-label" for="emoji-angry">
                  <img src="./images/emoji/angry.png" width="30" height="30" alt="emoji">
                </label>
              </div>
            </div>
          </section>
        </div>
      </form>
    </section>`
    );
  }

  _onCommentEmojiClick() {
    this._removeEmojiImageElement();
    this._resetEmojiInputElements();
  }
}
