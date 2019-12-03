import {createElement} from '../utils.js';

const TOP_RATED_FILMS_COUNT = 2;

const createTopRatedsTemplate = () => {
  return (
    `<section class="films-list--extra">
      <h2 class="films-list__title">Top rated</h2>

      <div class="films-list__container"></div>
      </section>`
  );
};

export default class TopRates {
  constructor(films) {
    this._films = films;

    this._element = null;
  }

  getTopRated() {
    return this._films.slice().sort((a, b) => b.rating - a.rating).slice(0, TOP_RATED_FILMS_COUNT);
  }

  getTemplate() {
    return createTopRatedsTemplate();
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }

    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}
