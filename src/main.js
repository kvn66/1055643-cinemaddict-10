import CodeRain from 'coderain';
import API from './api';
import PageController from './controllers/page';
import MoviesModel from './models/movies';
import {generateFilms} from './mock/films';

const cr = new CodeRain(`###################`);
const AUTHORIZATION = `Basic ` + cr.next();
const END_POINT = `https://htmlacademy-es-10.appspot.com/cinemaddict`;


const MOVIES_COUNT = 22;

const api = new API(END_POINT, AUTHORIZATION);

const movies = generateFilms(MOVIES_COUNT);
const moviesModel = new MoviesModel(movies);

new PageController(document, moviesModel).render();

api.getTasks()
  .then((tasks) => {
    console.log(tasks);
  });

console.log(AUTHORIZATION);

