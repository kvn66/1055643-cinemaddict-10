import {render} from './utils.js';
import Films from './components/films.js';
import ProfileRating from './components/profile-rating.js';
import SiteMenu from './components/site-menu.js';
import SiteSort from './components/site-sort.js';
import FooterStatistic from './components/footer-statistic.js';
import {generateFilms} from './mock/films.js';


const FILMS_COUNT = 17;

const films = generateFilms(FILMS_COUNT);

const siteHeaderElement = document.querySelector(`.header`);
const siteMainElement = document.querySelector(`.main`);

render(siteHeaderElement, new ProfileRating(films).getElement());
render(siteMainElement, new SiteMenu(films).getElement());
render(siteMainElement, new SiteSort().getElement());
render(siteMainElement, new Films(films).getElement());

const footer = document.querySelector(`.footer`);
const footerStatistics = footer.querySelector(`.footer__statistics`);
footer.replaceChild(new FooterStatistic(films).getElement(), footerStatistics);
