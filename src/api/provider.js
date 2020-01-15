import nanoid from "nanoid";
import MoviesModel from "../models/movies";
import CommentsModel from "../models/comments";

export default class Provider {
  constructor(api, moviesStore, commentsStore) {
    this._api = api;
    this._moviesStore = moviesStore;
    this._commentsStore = commentsStore;
    this._isSynchronized = true;
  }

  getComments(movies) {
    if (this._isOnLine()) {
      const commentsModel = new CommentsModel();
      const promises = movies.map((item) => this._api.getComments(item.id));
      return Promise.all(promises).then((results) => {
        this._commentsStore.clear();
        results.forEach((result) => {
          commentsModel.addComments(result);
          result.forEach((comment) => this._commentsStore.setItem(comment.id, comment.toRAW()));
        });
        return commentsModel.getComments();
      });
    }

    this._isSynchronized = false;

    const storeComments = Object.values(this._commentsStore.getAll());

    return Promise.resolve(CommentsModel.parseComments(storeComments));
  }

  createComment(movieId, comment) {
    if (this._isOnLine()) {
      return this._api.createComment(movieId, comment).then(
          (movieAndComments) => {
            this._moviesStore.setItem(movieAndComments.movie.id, movieAndComments.movie);
            movieAndComments.comments.forEach((item) => this._commentsStore.setItem(item.id, item));
            return movieAndComments;
          }
      );
    }

    this._isSynchronized = false;

    const fakeNewCommentId = nanoid();
    const fakeNewCommentModel = CommentsModel.parseComment(Object.assign({}, comment, {id: fakeNewCommentId}, {author: `My comment`}));

    this._commentsStore.setItem(fakeNewCommentModel.id, Object.assign({}, fakeNewCommentModel.toRAW(), {offline: true}));

    const fakeMovie = this._moviesStore.getItem(movieId);
    const movieCommentsSet = new Set(fakeMovie.comments);
    movieCommentsSet.add(fakeNewCommentId);
    fakeMovie.comments = Array.from(movieCommentsSet);
    this._moviesStore.setItem(movieId, fakeMovie);


    const commentsSet = new Set();
    fakeMovie.comments.forEach((id) => {
      commentsSet.add(this._commentsStore.getItem(id));
    });
    const fakeMovieAndComments = Object.assign({}, {movie: fakeMovie}, {comments: Array.from(commentsSet)});


    return Promise.resolve(fakeMovieAndComments);
  }

  deleteComment(id) {
    if (this._isOnLine()) {
      return this._api.deleteComment(id).then(
          () => {
            this._commentsStore.removeItem(id);
            this._deleteCommentFromMovie(id);
          }
      );
    }

    this._isSynchronized = false;

    const storeComment = this._commentsStore.getItem(id);
    if (storeComment.offline) {
      this._commentsStore.removeItem(id);
    } else {
      const comment = Object.assign({}, storeComment, {delited: true});
      this._commentsStore.setItem(id, comment);
    }

    this._deleteCommentFromMovie(id);

    return Promise.resolve();
  }

  getMovies() {
    if (this._isOnLine()) {
      return this._api.getMovies()
        .then((movies) => {
          this._moviesStore.clear();
          movies.forEach((movie) => this._moviesStore.setItem(movie.id, movie.toRAW()));
          return movies;
        });
    }

    this._isSynchronized = false;

    const storeMovies = Object.values(this._moviesStore.getAll());

    return Promise.resolve(MoviesModel.parseMovies(storeMovies));
  }

  updateMovie(id, movie) {
    if (this._isOnLine()) {
      return this._api.updateMovie(id, movie).then(
          (updatedMovie) => {
            this._moviesStore.setItem(updatedMovie.id, updatedMovie);
            return updatedMovie;
          }
      );
    }

    this._isSynchronized = false;

    const movieModel = MoviesModel.parseMovie(movie);
    const storeMovie = this._moviesStore.getItem(id);
    const fakeRating = (storeMovie.film_info.total_rating + movieModel.userRating) / 2.0;
    movieModel.totalRating = parseFloat(fakeRating.toFixed(1));
    this._moviesStore.setItem(id, Object.assign({}, movieModel.toRAW(), {offline: true}));

    return Promise.resolve(movieModel.toRAW());
  }

  sync() {
    if (this._isOnLine()) {

      return this._syncComments().then(() => {
        return this._syncUpdatedMovies().then(() => {
          this._isSynchronized = true;
        });
      });

    }
    return Promise.reject(new Error(`Sync data failed`));
  }

  getSynchronize() {
    return this._isSynchronized;
  }

  _isOnLine() {
    return window.navigator.onLine;
  }

  _syncDelitedComments() {
    const storeComments = Object.values(this._commentsStore.getAll());
    const delitedComments = storeComments.filter((item) => item.delited);
    const delitedCommentsModel = CommentsModel.parseComments(delitedComments);
    const promises = delitedCommentsModel.map((item) => this.deleteComment(item.id));
    return Promise.all(promises);
  }

  _syncCreatedComments() {
    const storeComments = Object.values(this._commentsStore.getAll());
    const storeCreatedComments = storeComments.filter((item) => item.offline);
    const createdCommentsModel = CommentsModel.parseComments(storeCreatedComments);
    const createdComments = createdCommentsModel.map((item) => Object.assign({}, {movieId: this._findMovieForComment(item.id).id}, {localComment: item.toLocalComment()}));
    const promises = createdComments.map((item) => this.createComment(item.movieId, item.localComment));
    return Promise.all(promises).then(() => {
      createdCommentsModel.forEach((item) => this._commentsStore.removeItem(item.id));
    });
  }

  _syncComments() {
    const promises = [this._syncDelitedComments(), this._syncCreatedComments()];
    return Promise.all(promises);
  }

  _syncUpdatedMovies() {
    const storeMovies = Object.values(this._moviesStore.getAll());
    const storeUpdatedMovies = storeMovies.filter((item) => item.offline);
    const updatedMoviesModel = MoviesModel.parseMovies(storeUpdatedMovies);
    const promises = updatedMoviesModel.map((item) => this.updateMovie(item.id, item.toRAW()));
    return Promise.all(promises);
  }

  _findMovieForComment(commentId) {
    const movies = Object.values(this._moviesStore.getAll());
    return movies.find((item) => item.comments.indexOf(commentId) !== -1);
  }

  _deleteCommentFromMovie(commentId) {
    const movie = this._findMovieForComment(commentId);
    if (movie !== undefined) {
      movie.comments.splice(movie.comments.indexOf(commentId), 1);
      this._moviesStore.setItem(movie.id, movie);
    }
  }
}
