import {getCheckedParametersCount} from '../utils.js';

export const createProfileRatingTemplate = (films) => {
  const rating = getCheckedParametersCount(films, `isAlreadyWatched`);
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
};
