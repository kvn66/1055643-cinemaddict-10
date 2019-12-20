import {render} from "../utils";
import CommentsComponent from "../components/comments";
import CommentComponent from "../components/comment";

export default class CommentsController {
  constructor(parentComponent) {
    this._parentComponent = parentComponent;
  }

  _renderComment(commentsElement, commentModel) {
    const commentComponent = new CommentComponent(commentModel);
    commentComponent.setDeleteButtonClickHandler(this.onDeleteButtonClick);
    render(commentsElement, commentComponent.getElement());
  }

  render(movieModel) {
    const commentsElement = new CommentsComponent().getElement();
    movieModel.comments.getComments().forEach((commentModel) => {
      this._renderComment(commentsElement, commentModel);
    });
    const commentsListElement = this._parentComponent.getCommentsListElement();
    commentsListElement.replaceWith(commentsElement);

    document.addEventListener(`commentAdded`, (evt) => {
      this._renderComment(commentsElement, evt.detail);
    });
  }
}
