import {render} from "../utils";
import ProfileRatingComponent from "../components/profile-rating";

const NOVICE_RATING_LIMIT = 0;
const FAN_RATING_LIMIT = 10;
const MOVIE_BUFF_RATING_LIMIT = 20;

export default class ProfileRatingController {
  constructor(parentElement) {
    this._parentElement = parentElement;
    this._rating = null;
  }

  createRatingStr(rating) {
    if (rating > MOVIE_BUFF_RATING_LIMIT) {
      return `Movie Buff`;
    } else if (rating > FAN_RATING_LIMIT) {
      return `Fan`;
    } else if (rating > NOVICE_RATING_LIMIT) {
      return `Novice`;
    }
    return ``;
  }

  render(moviesModel) {
    this._rating = moviesModel.getCheckedParametersCount(`isAlreadyWatched`);
    const profileRatingComponent = new ProfileRatingComponent();
    profileRatingComponent.profileRating = this.createRatingStr(this._rating);
    render(this._parentElement, profileRatingComponent.getElement());

    document.addEventListener(`watchedChange`, (evt) => {
      if (evt.detail) {
        this._rating++;
      } else {
        this._rating--;
      }
      profileRatingComponent.profileRating = this.createRatingStr(this._rating);
    });
  }
}
