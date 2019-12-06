import AbstractComponent from './abstract-component.js';

const MOST_COMMENTED_FILMS_COUNT = 2;

export default class MostCommented extends AbstractComponent {
  constructor(films) {
    super();
    this._films = films;
  }

  getMostCommented() {
    return this._films.slice().sort((a, b) => b.comments.length - a.comments.length).slice(0, MOST_COMMENTED_FILMS_COUNT);
  }

  getTemplate() {
    return (
      `<section class="films-list--extra">
      <h2 class="films-list__title">Most commented</h2>

      <div class="films-list__container"></div>
      </section>`
    );
  }
}
