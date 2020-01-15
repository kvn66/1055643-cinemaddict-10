import AbstractComponent from './abstract-component';

const RatingColor = {
  CHECKED: `#ffe800`,
  UNCHECKED: `#d8d8d8`,
  ERROR: `#ff0000`
};

export default class UserRatingComponent extends AbstractComponent {
  constructor() {
    super();
    this._userRatingWrap = this.getElement().querySelector(`.film-details__user-rating-wrap`);
    this._inputs = this.getElement().querySelectorAll(`.film-details__user-rating-input`);
    this._labels = this.getElement().querySelectorAll(`.film-details__user-rating-label`);
    this._undoButton = this.getElement().querySelector(`.film-details__watched-reset`);
    this.isError = false;
  }

  _getTemplate() {
    return (
      `<div class="form-details__middle-container">
        <section class="film-details__user-rating-wrap">
          <div class="film-details__user-rating-controls">
            <button class="film-details__watched-reset" type="button">Undo</button>
          </div>
  
          <div class="film-details__user-score">
            <div class="film-details__user-rating-poster">
              <img src="./images/posters/the-great-flamarion.jpg" alt="film-poster" class="film-details__user-rating-img">
            </div>
  
            <section class="film-details__user-rating-inner">
              <h3 class="film-details__user-rating-title">The Great Flamarion</h3>
  
              <p class="film-details__user-rating-feelings">How you feel it?</p>
  
              <div class="film-details__user-rating-score">
                <input type="radio" name="score" class="film-details__user-rating-input visually-hidden" value="1" id="rating-1">
                <label class="film-details__user-rating-label" for="rating-1">1</label>
  
                <input type="radio" name="score" class="film-details__user-rating-input visually-hidden" value="2" id="rating-2">
                <label class="film-details__user-rating-label" for="rating-2">2</label>
  
                <input type="radio" name="score" class="film-details__user-rating-input visually-hidden" value="3" id="rating-3">
                <label class="film-details__user-rating-label" for="rating-3">3</label>
  
                <input type="radio" name="score" class="film-details__user-rating-input visually-hidden" value="4" id="rating-4">
                <label class="film-details__user-rating-label" for="rating-4">4</label>
  
                <input type="radio" name="score" class="film-details__user-rating-input visually-hidden" value="5" id="rating-5">
                <label class="film-details__user-rating-label" for="rating-5">5</label>
  
                <input type="radio" name="score" class="film-details__user-rating-input visually-hidden" value="6" id="rating-6">
                <label class="film-details__user-rating-label" for="rating-6">6</label>
  
                <input type="radio" name="score" class="film-details__user-rating-input visually-hidden" value="7" id="rating-7">
                <label class="film-details__user-rating-label" for="rating-7">7</label>
  
                <input type="radio" name="score" class="film-details__user-rating-input visually-hidden" value="8" id="rating-8">
                <label class="film-details__user-rating-label" for="rating-8">8</label>
  
                <input type="radio" name="score" class="film-details__user-rating-input visually-hidden" value="9" id="rating-9" checked>
                <label class="film-details__user-rating-label" for="rating-9">9</label>
  
              </div>
            </section>
          </div>
        </section>
      </div>`
    );
  }

  enableInputs() {
    this._inputs.forEach((item) => {
      item.disabled = false;
    });
  }

  disableInputs() {
    this._inputs.forEach((item) => {
      item.disabled = true;
    });
  }

  getUserRatingWrapElement() {
    return this._userRatingWrap;
  }

  setChecked(index) {
    this._inputs.forEach((input, inputIndex) => {
      input.checked = !index ? false : index === inputIndex + 1;
    });

    if (window.navigator.onLine) {
      this.removeRatingStyle();
    } else {
      this.setCheckedRatingStyle();
    }
  }

  setCheckedRatingStyle() {
    this._labels.forEach((label) => {
      label.style.backgroundColor = RatingColor.UNCHECKED;
    });
    const checkedLabel = this.getElement().querySelector(`.film-details__user-rating-input:checked + .film-details__user-rating-label`);
    if (this.isError) {
      checkedLabel.style.backgroundColor = RatingColor.ERROR;
    } else {
      checkedLabel.style.backgroundColor = RatingColor.CHECKED;
    }
  }

  removeRatingStyle() {
    this._labels.forEach((label) => {
      label.style.backgroundColor = ``;
    });
  }

  setErrorStyle() {
    this.removeErrorStyle();
    const checkedLabel = this.getElement().querySelector(`.film-details__user-rating-input:checked + .film-details__user-rating-label`);
    checkedLabel.classList.add(`film-details__user-rating-label--error`);
    this.isError = true;
  }

  removeErrorStyle() {
    this._labels.forEach((label) => {
      if (label.classList.contains(`film-details__user-rating-label--error`)) {
        label.classList.remove(`film-details__user-rating-label--error`);
      }
    });
    this.isError = false;
  }

  setUserRatingClickHandler(handler) {
    this._inputs.forEach((input) => {
      input.addEventListener(`click`, handler);
    });
  }

  setUndoUserRatingClickHandler(handler) {
    this._undoButton.addEventListener(`click`, handler);
  }
}
