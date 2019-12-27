import AbstractComponent from './abstract-component';

export default class CommentsComponent extends AbstractComponent {
  _getTemplate() {
    return (`<ul class="film-details__comments-list"></ul>`);
  }
}
