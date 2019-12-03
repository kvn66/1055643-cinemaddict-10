import {createElement} from '../utils.js';

const MOST_COMMENTED_FILMS_COUNT = 2;

const createMostCommentedTemplate = () => {
  return (
    `<section class="films-list--extra">
      <h2 class="films-list__title">Most commented</h2>

      <div class="films-list__container"></div>
      </section>`
  );
};

export default class MostCommented {
  constructor(films) {
    this._films = films;

    this._element = null;
  }

  getMostCommented() {
    return this._films.slice().sort((a, b) => b.comments.length - a.comments.length).slice(0, MOST_COMMENTED_FILMS_COUNT);
  }

  getTemplate() {
    return createMostCommentedTemplate();
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
