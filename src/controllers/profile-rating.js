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
    this._profileRatingComponent.profileRating = ProfileRatingController.createRatingStr(this._profileRating);

    document.addEventListener(`modelLoaded`, () => {
      this._profileRating = this._moviesModel.getCheckedParametersCount(`isAlreadyWatched`);
      this._profileRatingComponent.profileRating = ProfileRatingController.createRatingStr(this._profileRating);
    });

    document.addEventListener(`watchedChange`, () => {
      this._profileRating = this._moviesModel.getCheckedParametersCount(`isAlreadyWatched`);
      this._profileRatingComponent.profileRating = ProfileRatingController.createRatingStr(this._profileRating);
    });
  }

  render(parentElement) {
    render(parentElement, this._profileRatingComponent.getElement());
  }

  static createRatingStr(profileRating) {
    switch (true) {
      case profileRating > MOVIE_BUFF_RATING_LIMIT:
        return `Movie Buff`;
      case profileRating > FAN_RATING_LIMIT:
        return `Fan`;
      case profileRating > NOVICE_RATING_LIMIT:
        return `Novice`;
      default:
        return ``;
    }
  }
}
