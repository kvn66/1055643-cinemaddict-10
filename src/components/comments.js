import AbstractComponent from './abstract-component.js';
import CommentComponent from './comment.js';

export default class CommentsComponent extends AbstractComponent {
  constructor(film) {
    super();
    this._film = film;
  }

  getTemplate() {
    let outStr = ``;
    this._film.comments.forEach((item) => {
      outStr = outStr + new CommentComponent(item).getTemplate();
    });
    return outStr;
  }
}
