import AbstractComponent from './abstract-component';


const MAX_DESCRIPTION_LENGTH = 140;

export default class FilmCardComponent extends AbstractComponent {
  constructor(film) {
    super();
    this._film = film;
    this._description = this._film.description.length > MAX_DESCRIPTION_LENGTH ? this._film.description.slice(0, MAX_DESCRIPTION_LENGTH - 1) + `...` : this._film.description;
    this._watchlistElement = this.getElement().querySelector(`.film-card__controls-item--add-to-watchlist`);
    this._watchedElement = this.getElement().querySelector(`.film-card__controls-item--mark-as-watched`);
    this._favoriteElement = this.getElement().querySelector(`.film-card__controls-item--favorite`);
  }

  get watchlistChecked() {
    return this._watchlistElement.classList.contains(`film-card__controls-item--active`);
  }

  set watchlistChecked(checked) {
    if (checked) {
      if (!this.watchlistChecked) {
        this._watchlistElement.classList.add(`film-card__controls-item--active`);
      }
    } else {
      if (this.watchlistChecked) {
        this._watchlistElement.classList.remove(`film-card__controls-item--active`);
      }
    }
  }

  get watchedChecked() {
    return this._watchedElement.classList.contains(`film-card__controls-item--active`);
  }

  set watchedChecked(checked) {
    if (checked) {
      if (!this.watchedChecked) {
        this._watchedElement.classList.add(`film-card__controls-item--active`);
      }
    } else {
      if (this.watchedChecked) {
        this._watchedElement.classList.remove(`film-card__controls-item--active`);
      }
    }
  }

  get favoriteChecked() {
    return this._favoriteElement.classList.contains(`film-card__controls-item--active`);
  }

  set favoriteChecked(checked) {
    if (checked) {
      if (!this.favoriteChecked) {
        this._favoriteElement.classList.add(`film-card__controls-item--active`);
      }
    } else {
      if (this.favoriteChecked) {
        this._favoriteElement.classList.remove(`film-card__controls-item--active`);
      }
    }
  }

  setOpenDetailsClickHandler(handler) {
    this.getElement().querySelector(`.film-card__title`).addEventListener(`click`, handler);
    this.getElement().querySelector(`.film-card__poster`).addEventListener(`click`, handler);
    this.getElement().querySelector(`.film-card__comments`).addEventListener(`click`, handler);
  }

  setWatchlistClickHandler(handler) {
    this.getElement().querySelector(`.film-card__controls-item--add-to-watchlist`).addEventListener(`click`, handler);
  }

  setWatchedClickHandler(handler) {
    this.getElement().querySelector(`.film-card__controls-item--mark-as-watched`).addEventListener(`click`, handler);
  }

  setFavoriteClickHandler(handler) {
    this.getElement().querySelector(`.film-card__controls-item--favorite`).addEventListener(`click`, handler);
  }

  _getTemplate() {
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
      <a class="film-card__comments">${this._film.comments.length.toString()} comments</a>
      <form class="film-card__controls">
        <button class="film-card__controls-item button film-card__controls-item--add-to-watchlist${this._film.isAddedToWatchlist ? ` film-card__controls-item--active` : ``}">Add to watchlist</button>
        <button class="film-card__controls-item button film-card__controls-item--mark-as-watched${this._film.isAlreadyWatched ? ` film-card__controls-item--active` : ``}">Mark as watched</button>
        <button class="film-card__controls-item button film-card__controls-item--favorite${this._film.isAddedToFavorites ? ` film-card__controls-item--active` : ``}">Mark as favorite</button>
      </form>
    </article>`
    );
  }
}
