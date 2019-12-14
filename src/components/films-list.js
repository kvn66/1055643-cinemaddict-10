import AbstractComponent from './abstract-component';

export default class FilmsListComponent extends AbstractComponent {
  constructor() {
    super();
    this.title = this.getElement().querySelector(`.films-list__title`);
    this.containerElement = this.getElement().querySelector(`.films-list__container`);
  }

  set titleHide(hide) {
    if (hide) {
      this.title.classList.add(`visually-hidden`);
    } else {
      this.title.classList.remove(`visually-hidden`);
    }
  }

  set titleText(text) {
    this.title.textContent = text;
  }

  getContainerElement() {
    return this.containerElement;
  }

  getTemplate() {
    return (
      `<section class="films-list">
      <h2 class="films-list__title visually-hidden">All movies. Upcoming</h2>

      <div class="films-list__container"></div>
      </section>`
    );
  }
}
