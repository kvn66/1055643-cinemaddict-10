import PageController from './controllers/page';
import {generateFilms} from './mock/films';


const FILMS_COUNT = 22;

const films = generateFilms(FILMS_COUNT);

new PageController(document).render(films);
