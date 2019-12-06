import AbstractComponent from './abstract-component.js';
import Comment from './comment.js';

export default class Comments extends AbstractComponent {
  constructor(film) {
    super();
    this._film = film;
  }

  getTemplate() {
    let outStr = ``;
    this._film.comments.forEach((item) => {
      outStr = outStr + new Comment(item).getTemplate();
    });
    return outStr;
  }
}
