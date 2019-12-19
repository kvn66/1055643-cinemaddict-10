import AbstractComponent from './abstract-component';
import {formatDateTime} from '../utils';

export default class CommentComponent extends AbstractComponent {
  constructor(commentModel) {
    super();
    this._commentModel = commentModel;
    this._emoji = ``;

    switch (this._commentModel.emoji) {
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

  getTemplate() {
    return (
      `<li class="film-details__comment">
      <span class="film-details__comment-emoji">
        <img src="./images/emoji/${this._emoji}" width="55" height="55" alt="emoji">
      </span>
      <div>
        <p class="film-details__comment-text">${this._commentModel.text}</p>
        <p class="film-details__comment-info">
          <span class="film-details__comment-author">${this._commentModel.author}</span>
          <span class="film-details__comment-day">${formatDateTime(this._commentModel.date)}</span>
          <button class="film-details__comment-delete">Delete</button>
        </p>
      </div>
    </li>`
    );
  }
}
