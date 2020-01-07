import AbstractComponent from './abstract-component';
import {formatDateTime} from '../utils';

export default class CommentComponent extends AbstractComponent {
  constructor(commentModel) {
    super();
    this._commentModel = commentModel;
    this._deleteButtonElement = this.getElement().querySelector(`.film-details__comment-delete`);
  }

  setDeleteButtonClickHandler(handler) {
    this._deleteButtonElement.addEventListener(`click`, (evt) => {
      evt.preventDefault();
      this._deleteButtonElement.textContent = `Deleting…`;
      this._deleteButtonElement.disabled = true;
      const commentId = evt.target.dataset.commentId;
      handler(commentId);
    });
  }

  _getTemplate() {
    return (
      `<li data-comment-id="${this._commentModel.id}" class="film-details__comment">
      <span class="film-details__comment-emoji">
        <img src="./images/emoji/${this._commentModel.emoji}.png" width="55" height="55" alt="emoji">
      </span>
      <div>
        <p class="film-details__comment-text">${this._commentModel.text}</p>
        <p class="film-details__comment-info">
          <span class="film-details__comment-author">${this._commentModel.author}</span>
          <span class="film-details__comment-day">${formatDateTime(this._commentModel.date)}</span>
          <button data-comment-id="${this._commentModel.id}" class="film-details__comment-delete">Delete</button>
        </p>
      </div>
    </li>`
    );
  }
}
