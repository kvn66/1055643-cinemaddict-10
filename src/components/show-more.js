import AbstractComponent from './abstract-component';

export default class ShowMoreComponent extends AbstractComponent {
  _getTemplate() {
    return (
      `<button class="films-list__show-more">Show more</button>`
    );
  }

  setClickHandler(handler) {
    this.getElement().addEventListener(`click`, handler);
  }
}
