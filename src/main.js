import CodeRain from 'coderain';
import API from './api';
import PageController from './controllers/page';
import MoviesModel from './models/movies';

const AUTHORIZATION = `Basic ` + new CodeRain(`###################`).next();
const END_POINT = `https://htmlacademy-es-10.appspot.com/cinemaddict`;


const api = new API(END_POINT, AUTHORIZATION);

const moviesModel = new MoviesModel();

new PageController(moviesModel, api).render(document);
