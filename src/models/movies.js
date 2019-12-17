import MovieModel from "./movie";

export default class MoviesModel {
  constructor(films) {
    this._movies = [];
    films.map((item) => {
      this._movies.push(new MovieModel(item));
    });
  }

  get length() {
    return this._movies.length;
  }

  getMovies() {
    return this._movies;
  }
}
