import {createElement, getCheckedParametersCount} from '../utils.js';

export default class ProfileRating {
  constructor(films) {
    this._films = films;

    this._element = null;
  }

  createProfileRatingTemplate() {
    const rating = getCheckedParametersCount(this._films, `isAlreadyWatched`);
    let ratingStr = ``;
    if (rating > 20) {
      ratingStr = `Movie Buff`;
    } else if (rating > 10) {
      ratingStr = `Fan`;
    } else if (rating > 0) {
      ratingStr = `Novice`;
    }

    return (
      `<section class="header__profile profile">
      <p class="profile__rating">${ratingStr}</p>
      <img class="profile__avatar" src="images/bitmap@2x.png" alt="Avatar" width="35" height="35">
    </section>`
    );
  }

  getTemplate() {
    return this.createProfileRatingTemplate();
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }

    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}
