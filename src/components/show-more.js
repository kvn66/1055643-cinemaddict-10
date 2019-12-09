import AbstractComponent from './abstract-component';

export default class ShowMoreComponent extends AbstractComponent {
  setClickHandler(handler) {
    this.getElement().addEventListener(`click`, handler);
  }

  getTemplate() {
    return (
      `<button class="films-list__show-more">Show more</button>`
    );
  }
}
