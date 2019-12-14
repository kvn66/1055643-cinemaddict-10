import {render} from "../utils";
import CommentsComponent from "../components/comments";
import CommentComponent from "../components/comment";

export default class CommentsController {
  constructor(parentComponent) {
    this._parentComponent = parentComponent;
  }

  render(film) {
    const commentsElement = new CommentsComponent().getElement();
    film.comments.forEach((item) => {
      render(commentsElement, new CommentComponent(item).getElement());
    });
    const commentsListElement = this._parentComponent.getCommentsListElement();
    commentsListElement.replaceWith(commentsElement);
  }
}
