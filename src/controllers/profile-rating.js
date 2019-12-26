import {render} from "../utils";
import ProfileRatingComponent from "../components/profile-rating";

const NOVICE_RATING_LIMIT = 0;
const FAN_RATING_LIMIT = 10;
const MOVIE_BUFF_RATING_LIMIT = 20;

export default class ProfileRatingController {
  constructor(moviesModel) {
    this._moviesModel = moviesModel;
    this._rating = this._moviesModel.getCheckedParametersCount(`isAlreadyWatched`);
    this._profileRatingComponent = new ProfileRatingComponent();
    this._profileRatingComponent.profileRating = this.createRatingStr(this._rating);

    document.addEventListener(`watchedChange`, (evt) => {
      if (evt.detail) {
        this._rating++;
      } else {
        this._rating--;
      }
      this._profileRatingComponent.profileRating = this.createRatingStr(this._rating);
    });
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

  render(parentElement) {
    render(parentElement, this._profileRatingComponent.getElement());
  }
}
