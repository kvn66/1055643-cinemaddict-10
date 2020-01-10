import {render} from "../utils";
import CommentsComponent from "../components/comments";
import CommentComponent from "../components/comment";
import CommentsModel from "../models/comments";

export default class CommentsController {
  constructor(parentComponent, movieModel, api) {
    this._parentComponent = parentComponent;
    this._movieModel = movieModel;
    this._api = api;
    this._onDeleteButtonClick = this._onDeleteButtonClick.bind(this);
  }

  render() {
    const commentsComponent = new CommentsComponent();
    this._movieModel.comments.getComments().forEach((commentModel) => {
      this._renderComment(commentModel, commentsComponent);
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
    this._api.deleteComment(commentId)
      .then(() => {
        this._api.getComments(this._movieModel.id)
          .then(CommentsModel.parseComments)
          .then((comments) => {
            const commentsModel = new CommentsModel();
            commentsModel.fillModel(comments);
            this._movieModel.comments = commentsModel;
            this.render();
            document.dispatchEvent(new CustomEvent(`commentsChanged`, {'detail': this._movieModel.id}));
          });
      })
      .catch(() => this.render());
  }
}
