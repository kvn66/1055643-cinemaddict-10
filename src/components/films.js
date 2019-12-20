import AbstractComponent from './abstract-component';

export default class FilmsComponent extends AbstractComponent {
  _getTemplate() {
    return (
      `<section class="films"></section>`
    );
  }
}
