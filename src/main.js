import {createFilmCardTemplate} from './components/film-card.js';
import {createFilmDetailsTemplate} from './components/film-details.js';
import {createFilmsTemplate} from './components/films.js';
import {createFilmsListTemplate} from './components/films-list.js';
import {createMostCommentedTemplate, getMostCommented} from './components/most-commented.js';
import {createProfileRatingTemplate} from './components/profile-rating.js';
import {createSiteMenuTemplate} from './components/site-menu.js';
import {createSiteSortTemplate} from './components/site-sort.js';
import {createTopRatedsTemplate, getTopRated} from './components/top-rates.js';
import {generateFilms} from './mock/film.js';
import {getRandomIntegerNumber} from './mock/util.js';


const FILMS_COUNT = 17;

const profileRating = getRandomIntegerNumber(0, 30);
const films = generateFilms(FILMS_COUNT);

const createShowMoreTemplate = () => {
  return (
    `<button class="films-list__show-more">Show more</button>`
  );
};

const render = (container, template, place = `beforeend`) => {
  container.insertAdjacentHTML(place, template);
};

const siteHeaderElement = document.querySelector(`.header`);
const siteMainElement = document.querySelector(`.main`);

render(siteHeaderElement, createProfileRatingTemplate(profileRating));
render(siteMainElement, createSiteMenuTemplate());
render(siteMainElement, createSiteSortTemplate());
render(siteMainElement, createFilmsTemplate());

const filmsElement = siteMainElement.querySelector(`.films`);

render(filmsElement, createFilmsListTemplate());
render(filmsElement, createTopRatedsTemplate());
render(filmsElement, createMostCommentedTemplate());

const filmsListElement = filmsElement.querySelector(`.films-list`);
const filmsListContainerElement = filmsListElement.querySelector(`.films-list__container`);

films.forEach((film) => {
  render(filmsListContainerElement, createFilmCardTemplate(film));
});

render(filmsListElement, createShowMoreTemplate());

const filmsListExtraElements = filmsElement.querySelectorAll(`.films-list--extra`);

const topRatedFilmsListContainerElement = filmsListExtraElements[0].querySelector(`.films-list__container`);

const topRated = getTopRated(films);
if (topRated[0].rating > 0) {
  topRated.forEach((film) => {
    render(topRatedFilmsListContainerElement, createFilmCardTemplate(film));
  });
}

const mostCommentedFilmsListContainerElement = filmsListExtraElements[1].querySelector(`.films-list__container`);

const mostCommented = getMostCommented(films);
if (mostCommented[0].commentsCount > 0) {
  mostCommented.forEach((film) => {
    render(mostCommentedFilmsListContainerElement, createFilmCardTemplate(film));
  });
}

const footer = document.querySelector(`.footer`);
const footerText = footer.querySelector(`p`);

footerText.textContent = `${films.length.toString()} movies inside`;

//render(footer, createFilmDetailsTemplate(films[0]), `afterend`);
