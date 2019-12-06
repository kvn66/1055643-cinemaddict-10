import AbstractComponent from './abstract-component.js';

export default class FooterStatisticComponent extends AbstractComponent {
  constructor(films) {
    super();
    this._films = films;
  }

  getTemplate() {
    return (
      `<section class="footer__statistics">
        <p>${this._films.length.toString()} movies inside</p>
      </section>`
    );
  }
}
