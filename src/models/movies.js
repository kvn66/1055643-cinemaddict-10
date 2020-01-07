import {FilterType, SortType, StatisticFilterPeriodName} from "../utils";
import MovieModel from "./movie";
import moment from 'moment';

const FILTER_PERIOD = 1;

export default class MoviesModel {
  constructor() {
    this._movies = [];
    this._filterType = FilterType.ALL;
    this._sortType = SortType.DEFAULT;
    this._statisticFilterType = StatisticFilterPeriodName.ALL_TIME;
  }

  get length() {
    return this._movies.length;
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

  set sortType(type) {
    if (type !== this._sortType) {
      this._sortType = type;
      document.dispatchEvent(new Event(`filterChange`));
    }
  }

  set statisticFilterType(type) {
    this._statisticFilterType = type;
  }

  getMovies() {
    return this._sortMovies(this._filterMovies(this._movies));
  }

  getStatisticMovies() {
    return this._statisticFilter();
  }

  getTopRated(count) {
    return this._movies.slice().sort((a, b) => b.totalRating - a.totalRating).slice(0, count);
  }

  getMostCommented(count) {
    return this._movies.slice().sort((a, b) => b.comments.length - a.comments.length).slice(0, count);
  }

  getCheckedParametersCount(parametr) {
    const movies = this._movies.filter((item) => item[parametr]);
    return movies.length;
  }

  fillModel(movies) {
    this._movies = Array.from(movies);
  }

  _statisticFilter() {
    if (this._statisticFilterType === StatisticFilterPeriodName.ALL_TIME) {
      return this._movies.filter((item) => item.isAlreadyWatched);
    }
    const targetDate = moment().subtract(FILTER_PERIOD, this._statisticFilterType);
    return this._movies.filter((item) => {
      return (moment(item.watchingDate) >= targetDate && item.isAlreadyWatched);
    });
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
