import {render} from "../utils";
import ProfileRatingComponent from "../components/profile-rating";

const NOVICE_RATING_LIMIT = 0;
const FAN_RATING_LIMIT = 10;
const MOVIE_BUFF_RATING_LIMIT = 20;

export default class ProfileRatingController {
  constructor(moviesModel) {
    this._moviesModel = moviesModel;
    this._profileRating = this._moviesModel.getCheckedParametersCount(`isAlreadyWatched`);
    this._profileRatingComponent = new ProfileRatingComponent();
    this._profileRatingComponent.profileRating = this._createRatingStr(this._profileRating);

    document.addEventListener(`watchedChange`, (evt) => {
      if (evt.detail) {
        this._profileRating++;
      } else {
        this._profileRating--;
      }
      this._profileRatingComponent.profileRating = this._createRatingStr();
    });
  }

  render(parentElement) {
    render(parentElement, this._profileRatingComponent.getElement());
  }

  _createRatingStr() {
    switch (true) {
      case this._profileRating > MOVIE_BUFF_RATING_LIMIT:
        return `Movie Buff`;
      case this._profileRating > FAN_RATING_LIMIT:
        return `Fan`;
      case this._profileRating > NOVICE_RATING_LIMIT:
        return `Novice`;
      default:
        return ``;
    }
  }
}
