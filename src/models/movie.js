import CommentsModel from "./comments";

export default class MovieModel {
  constructor(movieJson) {
    this.update(movieJson);
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

  get totalRating() {
    return this._totalRating;
  }

  get userRating() {
    return this._userRating;
  }

  set userRating(userRating) {
    this._userRating = userRating;
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
    }
  }

  get isAlreadyWatched() {
    return this._isAlreadyWatched;
  }

  set isAlreadyWatched(watched) {
    if (watched !== this._isAlreadyWatched) {
      this._isAlreadyWatched = watched;
    }
  }

  get isAddedToFavorites() {
    return this._isAddedToFavorites;
  }

  set isAddedToFavorites(favorite) {
    if (favorite !== this._isAddedToFavorites) {
      this._isAddedToFavorites = favorite;
    }
  }

  get watchingDate() {
    return this._watchingDate;
  }

  set watchingDate(date) {
    this._watchingDate = date;
  }

  update(movieJson) {
    this._id = movieJson.id;
    this._comments = movieJson.comments;
    this._title = movieJson.film_info.title;
    this._titleOriginal = movieJson.film_info.alternative_title;
    this._totalRating = movieJson.film_info.total_rating;
    this._poster = movieJson.film_info.poster;
    this._age = movieJson.film_info.age_rating;
    this._director = movieJson.film_info.director;
    this._writers = movieJson.film_info.writers;
    this._actors = movieJson.film_info.actors;
    this._releaseDate = new Date(movieJson.film_info.release.date);
    this._country = movieJson.film_info.release.release_country;
    this._duration = movieJson.film_info.runtime;
    this._genres = movieJson.film_info.genre;
    this._description = movieJson.film_info.description;
    this._userRating = movieJson.user_details.personal_rating;
    this._isAddedToWatchlist = movieJson.user_details.watchlist;
    this._isAlreadyWatched = movieJson.user_details.already_watched;
    this._watchingDate = movieJson.user_details.watching_date;
    this._isAddedToFavorites = movieJson.user_details.favorite;
  }

  toRAW() {
    const comments = this._comments instanceof CommentsModel ? this._comments.toRAW() : this._comments;
    return {
      'id': this._id,
      'comments': comments,
      'film_info': {
        'title': this._title,
        'alternative_title': this._titleOriginal,
        'total_rating': this._totalRating,
        'poster': this._poster,
        'age_rating': this._age,
        'director': this._director,
        'writers': this._writers,
        'actors': this._actors,
        'release': {
          'date': this._releaseDate,
          'release_country': this._country,
        },
        'runtime': this._duration,
        'genre': this._genres,
        'description': this._description
      },
      'user_details': {
        'personal_rating': this._userRating,
        'watchlist': this._isAddedToWatchlist,
        'already_watched': this._isAlreadyWatched,
        'watching_date': this._watchingDate,
        'favorite': this._isAddedToFavorites
      }
    };
  }

  static clone(movieModel) {
    return new MovieModel(movieModel.toRAW());
  }
}
