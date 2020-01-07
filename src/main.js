import CodeRain from 'coderain';
import API from './api/api';
import Store from './api/store';
import Provider from './api/provider';
import PageController from './controllers/page';
import MoviesModel from './models/movies';
import CommentsModel from "./models/comments";

const MOVIES_STORE_PREFIX = `sinemaddict-movies-localstorage`;
const MOVIES_STORE_VER = `v1`;
const MOVIES_STORE_NAME = `${MOVIES_STORE_PREFIX}-${MOVIES_STORE_VER}`;
const COMMENTS_STORE_PREFIX = `sinemaddict-comments-localstorage`;
const COMMENTS_STORE_VER = `v1`;
const COMMENTS_STORE_NAME = `${COMMENTS_STORE_PREFIX}-${COMMENTS_STORE_VER}`;
const AUTHORIZATION = `Basic ` + new CodeRain(`###################`).next();
const END_POINT = `https://htmlacademy-es-10.appspot.com/cinemaddict`;

/*
window.addEventListener(`load`, () => {
  navigator.serviceWorker.register(`/sw.js`)
    .then(() => {
      // Действие, в случае успешной регистрации ServiceWorker
    }).catch(() => {
    // Действие, в случае ошибки при регистрации ServiceWorker
    });
});
*/

const api = new API(END_POINT, AUTHORIZATION);
const moviesStore = new Store(MOVIES_STORE_NAME, window.localStorage);
const commentsStore = new Store(COMMENTS_STORE_NAME, window.localStorage);
const apiWithProvider = new Provider(api, moviesStore, commentsStore);
const moviesModel = new MoviesModel();
const commentsModel = new CommentsModel();

new PageController(moviesModel, commentsModel, apiWithProvider).render(document);


window.addEventListener(`online`, () => {
  document.title = document.title.replace(` [offline]`, ``);

  if (!apiWithProvider.getSynchronize()) {
    apiWithProvider.sync()
      .then(() => {
        // Действие, в случае успешной синхронизации
      })
      .catch(() => {
        // Действие, в случае ошибки синхронизации
      });
  }
});

window.addEventListener(`offline`, () => {
  document.title += ` [offline]`;
});
