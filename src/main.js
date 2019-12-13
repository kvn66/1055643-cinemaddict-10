import {render} from './utils';
import ProfileRatingComponent from './components/profile-rating';
import PageController from './controllers/page';
import FooterStatisticComponent from './components/footer-statistic';
import {generateFilms} from './mock/films';


const FILMS_COUNT = 22;

const films = generateFilms(FILMS_COUNT);

render(document.querySelector(`.header`), new ProfileRatingComponent(films).getElement());

new PageController(document.querySelector(`.main`)).render(films);

document.querySelector(`.footer__statistics`).replaceWith(new FooterStatisticComponent(films).getElement());
