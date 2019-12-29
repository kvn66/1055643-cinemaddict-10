import {FilterType, SortType} from "../utils";
import MovieModel from "./movie";

export default class MoviesModel {
  constructor() {
    this._filterType = FilterType.ALL;
    this._sortType = SortType.DEFAULT;
    this._movies = [];
  }

  get length() {
    return this._movies.length;
  }

  fillModel(movies) {
    this._movies = Array.from(movies);
  }

  get filterType() {
    return this._filterType;
  }

  set filterType(type) {
    if (type !== this._filterType) {
      this._filterType = type;
      document.dispatchEvent(new Event(`filterChange`));
    }
  }

  setSortType(type) {
    if (type !== this._sortType) {
      this._sortType = type;
      document.dispatchEvent(new Event(`filterChange`));
    }
  }

  getMovies() {
    return this._sortMovies(this._filterMovies(this._movies));
  }

  getTopRated(count) {
    return this._movies.slice().sort((a, b) => b.totalRating - a.totalRating).slice(0, count);
  }

  getMostCommented(count) {
    return this._movies.slice().sort((a, b) => b.comments.length - a.comments.length).slice(0, count);
  }

  getCheckedParametersCount(parametr) {
    let count = 0;
    this._movies.forEach((item) => {
      if (item[parametr]) {
        count++;
      }
    });
    return count;
  }

  _filterMovies(movies) {
    switch (this._filterType) {
      case FilterType.WATCHLIST:
        return movies.slice().filter((movieModel) => movieModel.isAddedToWatchlist);
      case FilterType.HISTORY:
        return movies.slice().filter((movieModel) => movieModel.isAlreadyWatched);
      case FilterType.FAVORITES:
        return movies.slice().filter((movieModel) => movieModel.isAddedToFavorites);
      case FilterType.ALL:
        return movies;
    }
    return movies;
  }

  _sortMovies(movies) {
    switch (this._sortType) {
      case SortType.RATING:
        return movies.slice().sort((a, b) => b.totalRating - a.totalRating);
      case SortType.DATE:
        return movies.slice().sort((a, b) => b.releaseDate - a.releaseDate);
      case SortType.DEFAULT:
        return movies;
    }
    return movies;
  }

  static parseMovie(movie) {
    return new MovieModel(movie);
  }

  static parseMovies(movies) {
    return movies.map(MoviesModel.parseMovie);
  }
}
