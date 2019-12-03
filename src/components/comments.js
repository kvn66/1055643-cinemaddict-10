import {getCommentDateTime} from '../utils.js';

const createCommentTemplate = (comment) => {
  let emoji = ``;
  switch (comment.emoji) {
    case `sleeping`:
      emoji = `smile.png`;
      break;
    case `neutral-face`:
      emoji = `sleeping.png`;
      break;
    case `grinning`:
      emoji = Math.random() > 0.5 ? `puke.png` : `angry.png`;
      break;
  }
  return (
    `<li class="film-details__comment">
      <span class="film-details__comment-emoji">
        <img src="./images/emoji/${emoji}" width="55" height="55" alt="emoji">
      </span>
      <div>
        <p class="film-details__comment-text">${comment.text}</p>
        <p class="film-details__comment-info">
          <span class="film-details__comment-author">${comment.author}</span>
          <span class="film-details__comment-day">${getCommentDateTime(comment.date)}</span>
          <button class="film-details__comment-delete">Delete</button>
        </p>
      </div>
    </li>`
  );
};

export const createCommentsTemplate = (film) => {
  let outStr = ``;
  film.comments.forEach((item) => {
    outStr = outStr + createCommentTemplate(item);
  });
  return outStr;
};
