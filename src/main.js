const FILMS_COUNT = 5;
const TOP_RATED_FILMS_COUNT = 2;
const MOST_COMMENTED_FILMS_COUNT = 2;

import {createFilmCardTemplate} from './components/film-card.js';
import {createFilmDetailsTemplate} from './components/film-details.js';
import {createFilmsTemplate} from './components/films.js';
import {createFilmsListTemplate} from './components/films-list.js';
import {createMostCommentedTemplate} from './components/most-commented.js';
import {createProfileRating} from './components/profile-rating.js';
import {createSiteMenuTemplate} from './components/site-menu.js';
import {createSiteSortTemplate} from './components/site-sort.js';
import {createTopRatedsTemplate} from './components/top-rates.js';

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

render(siteHeaderElement, createProfileRating());
render(siteMainElement, createSiteMenuTemplate());
render(siteMainElement, createSiteSortTemplate());
render(siteMainElement, createFilmsTemplate());

const filmsElement = siteMainElement.querySelector(`.films`);

render(filmsElement, createFilmsListTemplate());
render(filmsElement, createTopRatedsTemplate());
render(filmsElement, createMostCommentedTemplate());

const filmsListElement = filmsElement.querySelector(`.films-list`);
const filmsListContainerElement = filmsListElement.querySelector(`.films-list__container`);

new Array(FILMS_COUNT)
  .fill(``)
  .forEach(() => render(filmsListContainerElement, createFilmCardTemplate())
  );

render(filmsListElement, createShowMoreTemplate());

const filmsListExtraElements = filmsElement.querySelectorAll(`.films-list--extra`);

const topRatedFilmsListContainerElement = filmsListExtraElements[0].querySelector(`.films-list__container`);

new Array(TOP_RATED_FILMS_COUNT)
  .fill(``)
  .forEach(() => render(topRatedFilmsListContainerElement, createFilmCardTemplate())
  );

const mostCommentedFilmsListContainerElement = filmsListExtraElements[1].querySelector(`.films-list__container`);

new Array(MOST_COMMENTED_FILMS_COUNT)
  .fill(``)
  .forEach(() => render(mostCommentedFilmsListContainerElement, createFilmCardTemplate())
  );

const bodyElement = document.querySelector(`.footer`);

render(bodyElement, createFilmDetailsTemplate(), `afterend`);
