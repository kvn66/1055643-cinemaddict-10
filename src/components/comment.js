import {getCommentDateTime, createElement} from '../utils.js';

export default class Comment {
  constructor(comment) {
    this._comment = comment;
    this._element = null;
    this._emoji = ``;

    switch (this._comment.emoji) {
      case `sleeping`:
        this._emoji = `smile.png`;
        break;
      case `neutral-face`:
        this._emoji = `sleeping.png`;
        break;
      case `grinning`:
        this._emoji = Math.random() > 0.5 ? `puke.png` : `angry.png`;
        break;
      default:
        this._emoji = ``;
        break;
    }
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
    return (
      `<li class="film-details__comment">
      <span class="film-details__comment-emoji">
        <img src="./images/emoji/${this._emoji}" width="55" height="55" alt="emoji">
      </span>
      <div>
        <p class="film-details__comment-text">${this._comment.text}</p>
        <p class="film-details__comment-info">
          <span class="film-details__comment-author">${this._comment.author}</span>
          <span class="film-details__comment-day">${getCommentDateTime(this._comment.date)}</span>
          <button class="film-details__comment-delete">Delete</button>
        </p>
      </div>
    </li>`
    );
  }
}
