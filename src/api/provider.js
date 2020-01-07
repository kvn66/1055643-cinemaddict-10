import nanoid from "nanoid";
import MoviesModel from "../models/movies";
import CommentsModel from "../models/comments";

const getSyncedMovies =
  (items) => items.filter(({success}) => success).map(({payload}) => payload.task);

export default class Provider {
  constructor(api, moviesStore, commentsStore) {
    this._api = api;
    this._moviesStore = moviesStore;
    this._commentsStore = commentsStore;
    this._isSynchronized = true;
    this.movieIndex = 0;
    this.movieMaxIndex = 0;
  }

  loadComments(movies) {
    if (this.movieIndex < this.movieMaxIndex && this._isOnLine()) {
      return this._api.getComments(movies[this.movieIndex].id)
        .then((comments) => {
          const commentsModel = new CommentsModel();
          commentsModel.addComments(comments);
          comments.forEach((comment) => this._commentsStore.setItem(comment.id, comment.toRAW()));
          this.movieIndex++;
          return this.loadComments(movies)
            .then((comments2) => {
              comments2.forEach((comment) => this._commentsStore.setItem(comment.id, comment.toRAW()));
              commentsModel.addComments(comments2);
              return commentsModel.getComments();
            });
        });
    }
    return Promise.resolve(CommentsModel.parseComments(new CommentsModel().getComments()));
  }

  getComments(movies) {
    if (this._isOnLine()) {
      this.movieMaxIndex = movies.length;
      return this.loadComments(movies);
    }
    const storeComments = Object.values(this._commentsStore.getAll());
    return Promise.resolve(CommentsModel.parseComments(storeComments));
  }

  getCommentsForMovie(id) {
    if (this._isOnLine()) {
      return this._api.getComments(id)
        .then((comments) => {
          comments.forEach((comment) => this._commentsStore.setItem(comment.id, comment.toRAW()));
          return comments;
        });
    }

    const storeMovies = Object.values(this._moviesStore.getAll());
    const movies = MoviesModel.parseMovies(storeMovies);
    return Promise.resolve(movies[id].comments);
  }

  getMovies() {
    if (this._isOnLine()) {
      return this._api.getMovies()
        .then((movies) => {
          movies.forEach((movie) => this._moviesStore.setItem(movie.id, movie.toRAW()));
          return movies;
        });
    }

    const storeMovies = Object.values(this._moviesStore.getAll());

    this._isSynchronized = false;

    return Promise.resolve(MoviesModel.parseMovies(storeMovies));
  }

  createComment(movieId, comment) {
    if (this._isOnLine()) {
      return this._api.createComment(movieId, comment).then(
          (movieAndComments) => {
            console.log(movieAndComments);
            const movieModel = MoviesModel.parseMovie(movieAndComments.movie);
            const comments = CommentsModel.parseComments(movieAndComments.comments);
            this._moviesStore.setItem(movieModel.id, movieModel.toRAW());
            comments.forEach((item) => this._commentsStore.setItem(item.id, item.toRAW()));
            return movieAndComments;
          }
      );
    }

    // Нюанс в том, что при создании мы не указываем id задачи, нам его в ответе присылает сервер.
    // Но на случай временного хранения мы должны позаботиться и о временном id
    const fakeNewMovieId = nanoid();
    const fakeNewMovie = MoviesModel.parseMovies(Object.assign({}, movieModel.toRAW(), {id: fakeNewMovieId}));

    this._isSynchronized = false;
    this._moviesStore.setItem(fakeNewMovie.id, Object.assign({}, fakeNewMovie.toRAW(), {offline: true}));

    return Promise.resolve(fakeNewMovie);
  }

  updateMovie(id, task) {
    if (this._isOnLine()) {
      return this._api.updateMovie(id, task).then(
          (newMovie) => {
            this._moviesStore.setItem(newMovie.id, newMovie.toRAW());
            return newMovie;
          }
      );
    }

    const fakeUpdatedMovie = MoviesModel.parseMovie(Object.assign({}, task.toRAW(), {id}));

    this._isSynchronized = false;
    this._moviesStore.setItem(id, Object.assign({}, fakeUpdatedMovie.toRAW(), {offline: true}));

    return Promise.resolve(fakeUpdatedMovie);
  }

  deleteComment(id) {
    if (this._isOnLine()) {
      return this._api.deleteComment(id).then(
          () => {
            this._commentsStore.removeItem(id);
          }
      );
    }

    this._isSynchronized = false;
    this._commentsStore.removeItem(id);

    return Promise.resolve();
  }

  sync() {
    if (this._isOnLine()) {
      const storeMovies = Object.values(this._moviesStore.getAll());

      return this._api.sync(storeMovies)
        .then((response) => {
          // Удаляем из хранилища задачи, что были созданы
          // или изменены в оффлайне. Они нам больше не нужны
          storeMovies.filter((task) => task.offline).forEach((task) => {
            this._moviesStore.removeItem(task.id);
          });

          // Забираем из ответа синхронизированные задачи
          const createdMovies = getSyncedMovies(response.created);
          const updatedMovies = getSyncedMovies(response.updated);

          // Добавляем синхронизированные задачи в хранилище.
          // Хранилище должно быть актуальным в любой момент,
          // вдруг сеть пропадёт
          [...createdMovies, ...updatedMovies].forEach((task) => {
            this._moviesStore.setItem(task.id, task);
          });

          // Помечаем, что всё синхронизировано
          this._isSynchronized = true;

          return Promise.resolve();
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
}
