import {createElement} from '../utils.js';

export default class FooterStatistic {
  constructor(films) {
    this._films = films;
    this._element = null;
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

  getTemplate() {
    return (
      `<section class="footer__statistics">
        <p>${this._films.length.toString()} movies inside</p>
      </section>`
    );
  }
}
