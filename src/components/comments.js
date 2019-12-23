import AbstractComponent from './abstract-component';

export default class CommentsComponent extends AbstractComponent {
  removeComment(commentId) {
    const comments = this.getElement().querySelectorAll(`.film-details__comment`);
    comments.forEach((item) => {
      const attr = item.getAttribute(`data-comment-id`);
      if (attr.includes(commentId)) {
        item.remove();
      }
    });
  }

  _getTemplate() {
    return (`<ul class="film-details__comments-list"></ul>`);
  }
}
