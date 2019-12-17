import PageController from './controllers/page';
import MoviesModel from './models/movies';
import {generateFilms} from './mock/films';


const MOVIES_COUNT = 22;

const movies = generateFilms(MOVIES_COUNT);
const moviesModel = new MoviesModel(movies);

new PageController(document, moviesModel).render();
