import {render} from "../utils";
import CommentsComponent from "../components/comments";
import CommentComponent from "../components/comment";

export default class CommentsController {
  constructor(parentComponent, movieModel) {
    this._parentComponent = parentComponent;
    this._movieModel = movieModel;
    this._onDeleteButtonClick = this._onDeleteButtonClick.bind(this);
    this._init();
  }

  render() {
    const commentsComponent = new CommentsComponent();
    this._movieModel.comments.getComments().forEach((commentModel) => {
      this._renderComment(commentModel, commentsComponent);
    });
    const commentsListElement = this._parentComponent.getCommentsListElement();
    commentsListElement.replaceWith(commentsComponent.getElement());
  }

  _onDeleteButtonClick(commentId) {
    document.dispatchEvent(new CustomEvent(`commentRemoved`, {'detail': this._movieModel.id}));
  }

  _renderComment(commentModel, commentsComponent) {
    const commentComponent = new CommentComponent(commentModel);
    commentComponent.setDeleteButtonClickHandler(this._onDeleteButtonClick);
    render(commentsComponent.getElement(), commentComponent.getElement());
  }

  _init() {
    document.addEventListener(`commentAdded`, (evt) => {
      if (evt.detail === this._movieModel.id) {
        this.render();
      }
    });

    document.addEventListener(`commentRemoved`, (evt) => {
      if (evt.detail === this._movieModel.id) {
        this.render();
      }
    });
  }
}
