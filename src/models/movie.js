import CommentsModel from "./comments";

export default class MovieModel {
  constructor(film) {
    this._id = film.id;
    this._title = film.title;
    this._titleOriginal = film.titleOriginal;
    this._rating = film.rating;
    this._userRating = film.userRating;
    this._releaseDate = film.releaseDate;
    this._duration = film.duration;
    this._genres = film.genres;
    this._poster = film.poster;
    this._description = film.description;
    this._comments = new CommentsModel(film.comments);
    this._director = film.director;
    this._writers = film.writers;
    this._actors = film.actors;
    this._country = film.country;
    this._age = film.age;
    this._isAddedToWatchlist = film.isAddedToWatchlist;
    this._isAlreadyWatched = film.isAlreadyWatched;
    this._isAddedToFavorites = film.isAddedToFavorites;
  }

  get id() {
    return this._id;
  }

  get title() {
    return this._title;
  }

  get titleOriginal() {
    return this._titleOriginal;
  }

  get rating() {
    return this._rating;
  }

  get userRating() {
    return this._userRating;
  }

  get releaseDate() {
    return this._releaseDate;
  }

  get duration() {
    return this._duration;
  }

  get genres() {
    return this._genres;
  }

  get poster() {
    return this._poster;
  }

  get description() {
    return this._description;
  }

  get comments() {
    return this._comments;
  }

  get director() {
    return this._director;
  }

  get writers() {
    return this._writers;
  }

  get actors() {
    return this._actors;
  }

  get country() {
    return this._country;
  }

  get age() {
    return this._age;
  }

  get isAddedToWatchlist() {
    return this._isAddedToWatchlist;
  }

  set isAddedToWatchlist(watchlist) {
    if (watchlist !== this._isAddedToWatchlist) {
      this._isAddedToWatchlist = watchlist;
      document.dispatchEvent(new CustomEvent(`watchlistChange`, {'detail': watchlist}));
    }
  }

  get isAlreadyWatched() {
    return this._isAlreadyWatched;
  }

  set isAlreadyWatched(watched) {
    if (watched !== this._isAlreadyWatched) {
      this._isAlreadyWatched = watched;
      document.dispatchEvent(new CustomEvent(`watchedChange`, {'detail': watched}));
    }
  }

  get isAddedToFavorites() {
    return this._isAddedToFavorites;
  }

  set isAddedToFavorites(favorite) {
    if (favorite !== this._isAddedToFavorites) {
      this._isAddedToFavorites = favorite;
      document.dispatchEvent(new CustomEvent(`favoriteChange`, {'detail': favorite}));
    }
  }

  getMovie() {
    return {
      id: this._id,
      title: this._title,
      titleOriginal: this._titleOriginal,
      rating: this._rating,
      userRating: this._userRating,
      releaseDate: this._releaseDate,
      duration: this._duration,
      genres: this._genres,
      poster: this._poster,
      description: this._description,
      comments: this._comments,
      director: this._director,
      writers: this._writers,
      actors: this._actors,
      country: this._country,
      age: this._age,
      isAddedToWatchlist: this._isAddedToWatchlist,
      isAlreadyWatched: this._isAlreadyWatched,
      isAddedToFavorites: this._isAddedToFavorites
    };
  }
}
