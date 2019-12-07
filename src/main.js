import {render} from './utils.js';
import ProfileRatingComponent from './components/profile-rating.js';
import SiteMenuComponent from './components/site-menu.js';
import SiteSortComponent from './components/site-sort.js';
import PageController from './controllers/page.js';
import FooterStatisticComponent from './components/footer-statistic.js';
import {generateFilms} from './mock/films.js';


const FILMS_COUNT = 17;

const films = generateFilms(FILMS_COUNT);

const siteHeaderElement = document.querySelector(`.header`);
const siteMainElement = document.querySelector(`.main`);

render(siteHeaderElement, new ProfileRatingComponent(films).getElement());
render(siteMainElement, new SiteMenuComponent(films).getElement());
render(siteMainElement, new SiteSortComponent().getElement());
new PageController(siteMainElement).render(films);

const footer = document.querySelector(`.footer`);
const footerStatistics = footer.querySelector(`.footer__statistics`);
footer.replaceChild(new FooterStatisticComponent(films).getElement(), footerStatistics);
