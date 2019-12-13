import {getCheckedParametersCount} from '../utils';
import AbstractComponent from './abstract-component';

const NOVICE_RATING_LIMIT = 0;
const FAN_RATING_LIMIT = 10;
const MOVIE_BUFF_RATING_LIMIT = 20;

export default class ProfileRatingComponent extends AbstractComponent {
  constructor(films) {
    super();
    this._films = films;
    this._rating = getCheckedParametersCount(this._films, `isAlreadyWatched`);
    this._ratingStr = ``;
    this.createRatingStr();
  }

  createRatingStr() {
    if (this._rating > MOVIE_BUFF_RATING_LIMIT) {
      this._ratingStr = `Movie Buff`;
    } else if (this._rating > FAN_RATING_LIMIT) {
      this._ratingStr = `Fan`;
    } else if (this._rating > NOVICE_RATING_LIMIT) {
      this._ratingStr = `Novice`;
    }
  }

  getTemplate() {
    return (
      `<section class="header__profile profile">
      <p class="profile__rating">${this._ratingStr}</p>
      <img class="profile__avatar" src="images/bitmap@2x.png" alt="Avatar" width="35" height="35">
    </section>`
    );
  }
}
