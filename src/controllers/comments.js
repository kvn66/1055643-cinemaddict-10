import {render} from "../utils";
import CommentsComponent from "../components/comments";
import CommentComponent from "../components/comment";

export default class CommentsController {
  constructor(parentComponent, movieModel) {
    this._parentComponent = parentComponent;
    this._movieModel = movieModel;
    this._commentsComponent = new CommentsComponent();
    this._onDeleteButtonClick = this._onDeleteButtonClick.bind(this);
    this._init();
  }

  render() {
    this._movieModel.comments.getComments().forEach((commentModel) => {
      this._renderComment(commentModel);
    });
    const commentsListElement = this._parentComponent.getCommentsListElement();
    commentsListElement.replaceWith(this._commentsComponent.getElement());
  }

  _onDeleteButtonClick(commentId) {
    const msg = {
      movieId: this._movieModel.id,
      commentId
    };
    document.dispatchEvent(new CustomEvent(`commentDelete`, {'detail': msg}));
  }

  _renderComment(commentModel) {
    const commentComponent = new CommentComponent(commentModel);
    commentComponent.setDeleteButtonClickHandler(this._onDeleteButtonClick);
    render(this._commentsComponent.getElement(), commentComponent.getElement());
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
