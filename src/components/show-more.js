import AbstractComponent from './abstract-component.js';

export default class ShowMoreComponent extends AbstractComponent {
  getTemplate() {
    return (
      `<button class="films-list__show-more">Show more</button>`
    );
  }
}
