import {createElement} from '../utils.js';
import Comment from './comment.js';

export default class Comments {
  constructor(film) {
    this._film = film;
    this._element = null;
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }

    return this._element;
  }

  removeElement() {
    this._element = null;
  }

  getTemplate() {
    let outStr = ``;
    this._film.comments.forEach((item) => {
      outStr = outStr + new Comment(item).getTemplate();
    });
    return outStr;
  }
}
