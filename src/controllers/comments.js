import {render} from "../utils";
import CommentsComponent from "../components/comments";
import CommentComponent from "../components/comment";

export default class CommentsController {
  constructor(parentComponent, movieModel, commentsModel, apiWithProvider) {
    this._parentComponent = parentComponent;
    this._movieModel = movieModel;
    this._commentsModel = commentsModel;
    this._apiWithProvider = apiWithProvider;
    this._onDeleteButtonClick = this._onDeleteButtonClick.bind(this);
  }

  render() {
    const commentsComponent = new CommentsComponent();
    this._movieModel.comments.forEach((commentId) => {
      const comment = this._commentsModel.getComment(commentId);
      if (comment !== undefined) {
        this._renderComment(comment, commentsComponent);
      }
    });
    const commentsListElement = this._parentComponent.getCommentsListElement();
    commentsListElement.replaceWith(commentsComponent.getElement());
  }

  _renderComment(commentModel, commentsComponent) {
    const commentComponent = new CommentComponent(commentModel);
    commentComponent.setDeleteButtonClickHandler(this._onDeleteButtonClick);
    render(commentsComponent.getElement(), commentComponent.getElement());
  }

  _onDeleteButtonClick(commentId) {
    this._apiWithProvider.deleteComment(commentId)
      .then(() => {
        this._commentsModel.deleteComment(commentId);
        this._movieModel.comments.splice(this._movieModel.comments.indexOf(commentId), 1);
        this.render();
        document.dispatchEvent(new CustomEvent(`commentsChanged`, {'detail': this._movieModel.id}));
      })
      .catch(() => {
        this.render();
      });
  }
}
