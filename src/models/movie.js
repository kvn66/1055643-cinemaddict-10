export default class MovieModel {
  constructor(movie) {
    this._id = movie.id;
    this._comments = movie.comments;
    this._title = movie.film_info.title;
    this._titleOriginal = movie.film_info.alternative_title;
    this._rating = movie.film_info.total_rating;
    this._poster = movie.film_info.poster;
    this._age = movie.film_info.age_rating;
    this._director = movie.film_info.director;
    this._writers = movie.film_info.writers;
    this._actors = movie.film_info.actors;
    this._releaseDate = new Date(movie.film_info.release.date);
    this._country = movie.film_info.release.release_country;
    this._duration = movie.film_info.runtime;
    this._genres = movie.film_info.genre;
    this._description = movie.film_info.description;
    this._userRating = movie.user_details.personal_rating;
    this._isAddedToWatchlist = movie.user_details.watchlist;
    this._isAlreadyWatched = movie.user_details.already_watched;
    this._watchingDate = movie.user_details.watching_date;
    this._isAddedToFavorites = movie.user_details.favorite;
  }

  get id() {
    return this._id;
  }

  get comments() {
    return this._comments;
  }

  set comments(comments) {
    this._comments = comments;
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
