import {render} from './utils';
import ProfileRatingComponent from './components/profile-rating';
import PageController from './controllers/page';
import FooterStatisticComponent from './components/footer-statistic';
import {generateFilms} from './mock/films';


const FILMS_COUNT = 17;

const films = generateFilms(FILMS_COUNT);

const siteHeaderElement = document.querySelector(`.header`);
const siteMainElement = document.querySelector(`.main`);

render(siteHeaderElement, new ProfileRatingComponent(films).getElement());
new PageController(siteMainElement).render(films);

const footer = document.querySelector(`.footer`);
const footerStatistics = footer.querySelector(`.footer__statistics`);
footer.replaceChild(new FooterStatisticComponent(films).getElement(), footerStatistics);
