import AbstractComponent from './abstract-component';

export default class FilmsComponent extends AbstractComponent {
  getTemplate() {
    return (
      `<section class="films"></section>`
    );
  }
}
