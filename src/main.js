import {render} from './utils.js';
import {createFilmElement} from './components/film.js';
import FilmsComponent from './components/films.js';
import FilmsListComponent from './components/films-list.js';
import MostCommentedComponent from './components/most-commented.js';
import ProfileRatingComponent from './components/profile-rating.js';
import SiteMenuComponent from './components/site-menu.js';
import SiteSortComponent from './components/site-sort.js';
import TopRatesComponent from './components/top-rates.js';
import ShowMoreComponent from './components/show-more.js';
import FooterStatisticComponent from './components/footer-statistic.js';
import {generateFilms} from './mock/films.js';


const FILMS_COUNT = 17;
const SHOWING_FILMS_COUNT_ON_START = 5;
const SHOWING_FILMS_COUNT_BY_BUTTON = 5;

const films = generateFilms(FILMS_COUNT);

const siteHeaderElement = document.querySelector(`.header`);
const siteMainElement = document.querySelector(`.main`);

render(siteHeaderElement, new ProfileRatingComponent(films).getElement());
render(siteMainElement, new SiteMenuComponent(films).getElement());
render(siteMainElement, new SiteSortComponent().getElement());
render(siteMainElement, new FilmsComponent().getElement());

const filmsElement = siteMainElement.querySelector(`.films`);
render(filmsElement, new FilmsListComponent().getElement());

const topRatesComponent = new TopRatesComponent(films);
render(filmsElement, topRatesComponent.getElement());

const mostCommentedComponent = new MostCommentedComponent(films);
render(filmsElement, mostCommentedComponent.getElement());

const filmsListElement = filmsElement.querySelector(`.films-list`);
const filmsListContainerElement = filmsListElement.querySelector(`.films-list__container`);

let showingFilmsCount = SHOWING_FILMS_COUNT_ON_START;
films.slice(0, showingFilmsCount).forEach((film) => {
  render(filmsListContainerElement, createFilmElement(film));
});

render(filmsListElement, new ShowMoreComponent().getElement());

const showMoreButton = filmsListElement.querySelector(`.films-list__show-more`);
showMoreButton.addEventListener(`click`, () => {
  const prevFilmsCount = showingFilmsCount;
  showingFilmsCount = showingFilmsCount + SHOWING_FILMS_COUNT_BY_BUTTON;

  films.slice(prevFilmsCount, showingFilmsCount)
    .forEach((film) => render(filmsListContainerElement, createFilmElement(film)));

  if (showingFilmsCount >= films.length) {
    showMoreButton.remove();
  }
});

const filmsListExtraElements = filmsElement.querySelectorAll(`.films-list--extra`);

const topRatedFilmsListContainerElement = filmsListExtraElements[0].querySelector(`.films-list__container`);

const topRated = topRatesComponent.getTopRated();
if (topRated[0].rating > 0) {
  topRated.forEach((film) => {
    render(topRatedFilmsListContainerElement, createFilmElement(film));
  });
}

const mostCommentedFilmsListContainerElement = filmsListExtraElements[1].querySelector(`.films-list__container`);

const mostCommented = mostCommentedComponent.getMostCommented();
if (mostCommented[0].comments.length > 0) {
  mostCommented.forEach((film) => {
    render(mostCommentedFilmsListContainerElement, createFilmElement(film));
  });
}

const footer = document.querySelector(`.footer`);
const footerStatistics = footer.querySelector(`.footer__statistics`);
footer.replaceChild(new FooterStatisticComponent(films).getElement(), footerStatistics);
