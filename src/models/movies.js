import {render, SortType} from "../utils";
import MovieModel from "./movie";

export default class MoviesModel {
  constructor(movies) {
    this._movies = [];
    movies.map((item) => {
      this._movies.push(new MovieModel(item));
    });
  }

  get length() {
    return this._movies.length;
  }

  sortMovies(sortType) {
    switch (sortType) {
      case SortType.RATING:
        return this._movies.slice().sort((a, b) => b.rating - a.rating);
      case SortType.DATE:
        return this._movies.slice().sort((a, b) => b.releaseDate - a.releaseDate);
      case SortType.DEFAULT:
        return this._movies.slice();
    }
    return this._movies.slice();
  }

  getMovies(sortType) {
    return this.sortMovies(sortType);
  }

  getTopRated(count) {
    return this._movies.slice().sort((a, b) => b.rating - a.rating).slice(0, count);
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
}
