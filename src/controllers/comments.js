import {render} from "../utils";
import CommentsComponent from "../components/comments";
import CommentComponent from "../components/comment";

export default class CommentsController {
  constructor(parentComponent) {
    this._parentComponent = parentComponent;
  }

  render(movieModel) {
    const commentsElement = new CommentsComponent().getElement();
    movieModel.comments.getComments().forEach((commentModel) => {
      render(commentsElement, new CommentComponent(commentModel).getElement());
    });
    const commentsListElement = this._parentComponent.getCommentsListElement();
    commentsListElement.replaceWith(commentsElement);

    document.addEventListener(`commentAdded`, (evt) => {
      render(commentsElement, new CommentComponent(evt.detail).getElement());
    });
  }
}
