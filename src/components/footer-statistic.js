import AbstractComponent from './abstract-component';

export default class FooterStatisticComponent extends AbstractComponent {
  constructor(moviesModel) {
    super();
    this._moviesModel = moviesModel;
  }

  getTemplate() {
    return (
      `<section class="footer__statistics">
        <p>${this._moviesModel.length.toString()} movies inside</p>
      </section>`
    );
  }
}
