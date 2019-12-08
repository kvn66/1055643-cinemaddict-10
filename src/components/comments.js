import AbstractComponent from './abstract-component.js';

export default class CommentsComponent extends AbstractComponent {
  getTemplate() {
    return (`<ul class="film-details__comments-list"></ul>`);
  }
}
