import {render} from "../utils";
import CommentsComponent from "../components/comments";
import CommentComponent from "../components/comment";
import PageController from "./page";

export default class CommentsController {
  constructor(parentComponent, movieModel) {
    this._parentComponent = parentComponent;
    this._movieModel = movieModel;
    this._commentsComponent = new CommentsComponent();
    this._onDeleteButtonClick = this._onDeleteButtonClick.bind(this);
  }

  _onDeleteButtonClick(commentId) {
    this._movieModel.comments.removeComment(commentId);
  }

  _renderComment(commentModel) {
    const commentComponent = new CommentComponent(commentModel);
    commentComponent.setDeleteButtonClickHandler(this._onDeleteButtonClick);
    render(this._commentsComponent.getElement(), commentComponent.getElement());
  }

  render() {
    api.getMovies()
      .then((movies) => {
        console.log(movies);
        moviesModel.fillModel(movies);
        new PageController(document, moviesModel).render();
      });


    /*
    this._movieModel.comments.getComments().forEach((commentModel) => {
      this._renderComment(commentModel);
    });
    const commentsListElement = this._parentComponent.getCommentsListElement();
    commentsListElement.replaceWith(this._commentsComponent.getElement());

    document.addEventListener(`commentAdded`, (evt) => {
      this._renderComment(evt.detail);
    });

    document.addEventListener(`commentRemoved`, (evt) => {
      this._commentsComponent.removeComment(evt.detail);
    });
*/
  }
}
