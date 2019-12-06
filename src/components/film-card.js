import AbstractComponent from './abstract-component.js';


const MAX_DESCRIPTION_LENGTH = 140;

export default class FilmCardComponent extends AbstractComponent {
  constructor(film) {
    super();
    this._film = film;
    this._description = this._film.description.length > MAX_DESCRIPTION_LENGTH ? this._film.description.slice(0, MAX_DESCRIPTION_LENGTH - 1) + `...` : this._film.description;
  }

  getTemplate() {
    return (
      `<article class="film-card">
      <h3 class="film-card__title">${this._film.title}</h3>
      <p class="film-card__rating">${this._film.rating}</p>
      <p class="film-card__info">
        <span class="film-card__year">${this._film.releaseDate.getFullYear().toString()}</span>
        <span class="film-card__duration">${this._film.duration}</span>
        <span class="film-card__genre">${this._film.genres[0]}</span>
      </p>
      <img src="./images/posters/${this._film.poster}" alt="" class="film-card__poster">
      <p class="film-card__description">${this._description}</p>
      <a class="film-card__comments">${this._film.comments.length} comments</a>
      <form class="film-card__controls">
        <button class="film-card__controls-item button film-card__controls-item--add-to-watchlist">Add to watchlist</button>
        <button class="film-card__controls-item button film-card__controls-item--mark-as-watched">Mark as watched</button>
        <button class="film-card__controls-item button film-card__controls-item--favorite">Mark as favorite</button>
      </form>
    </article>`
    );
  }
}
