import AbstractComponent from './abstract-component.js';

const TOP_RATED_FILMS_COUNT = 2;

export default class TopRates extends AbstractComponent {
  constructor(films) {
    super();
    this._films = films;
  }

  getTopRated() {
    return this._films.slice().sort((a, b) => b.rating - a.rating).slice(0, TOP_RATED_FILMS_COUNT);
  }

  getTemplate() {
    return (
      `<section class="films-list--extra">
      <h2 class="films-list__title">Top rated</h2>

      <div class="films-list__container"></div>
      </section>`
    );
  }
}
