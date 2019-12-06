import AbstractComponent from './abstract-component.js';

export default class FilmsComponent extends AbstractComponent {
  getTemplate() {
    return (
      `<section class="films"></section>`
    );
  }
}
