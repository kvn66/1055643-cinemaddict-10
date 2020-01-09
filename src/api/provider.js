import nanoid from "nanoid";
import MoviesModel from "../models/movies";
import CommentsModel from "../models/comments";

const getSyncedMovies =
  (items) => items.filter(({success}) => success).map(({payload}) => payload.movie);

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
      let promises = [];
      promises = movies.map((item) => this._api.getComments(item.id));
      return Promise.all(promises).then((results) => {
        this._commentsStore.clear();
        results.forEach((result) => {
          commentsModel.addComments(result);
          result.forEach((comment) => this._commentsStore.setItem(comment.id, comment.toRAW()));
        });
        return commentsModel.getComments();
      });
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
          this._moviesStore.clear();
          movies.forEach((movie) => this._moviesStore.setItem(movie.id, movie.toRAW()));
          return movies;
        });
    }

    const storeMovies = Object.values(this._moviesStore.getAll());

    this._isSynchronized = false;

    return Promise.resolve(MoviesModel.parseMovies(storeMovies));
  }

  createComment(movieId, comment) {
    if (false) {
      return this._api.createComment(movieId, comment).then(
          (movieAndComments) => {
            console.log(movieAndComments);
            this._moviesStore.setItem(movieAndComments.movie.id, movieAndComments.movie);
            movieAndComments.comments.forEach((item) => this._commentsStore.setItem(item.id, item));
            return movieAndComments;
          }
      );
    }

    // Нюанс в том, что при создании мы не указываем id задачи, нам его в ответе присылает сервер.
    // Но на случай временного хранения мы должны позаботиться и о временном id
    const fakeNewCommentId = nanoid();
    const fakeNewComment = CommentsModel.parseComment(Object.assign({}, comment, {id: fakeNewCommentId}));
    console.log(fakeNewComment);

    this._isSynchronized = false;
    this._commentsStore.setItem(fakeNewComment.id, Object.assign({}, fakeNewComment.toRAW(), {offline: true}));

    console.log(this._moviesStore.getAll());
    const fakeMovie = this._moviesStore.getItem(movieId);
    console.log(fakeMovie);


    return Promise.resolve(fakeNewComment);
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
    this._moviesStore.setItem(id, Object.assign({}, movie, {offline: true}));

    return Promise.resolve(movie);
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
