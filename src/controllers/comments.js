import {render} from "../utils";
import CommentsComponent from "../components/comments";
import CommentComponent from "../components/comment";

export default class CommentsController {
  constructor(parentElement) {
    this._parentElement = parentElement;
  }

  render(film) {
    const commentsElement = new CommentsComponent().getElement();
    film.comments.forEach((item) => {
      render(commentsElement, new CommentComponent(item).getElement());
    });
    const commentsList = this._parentElement.querySelector(`.film-details__comments-list`);
    commentsList.replaceWith(commentsElement);
  }
}
