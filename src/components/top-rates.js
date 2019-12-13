import AbstractComponent from './abstract-component';

export default class TopRatesComponent extends AbstractComponent {
  getContainerElement() {
    return this.getElement().querySelector(`.films-list__container`);
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
