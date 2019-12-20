import CommentModel from "./comment";

const INITIAL_ID = -1;

export default class CommentsModel {
  constructor(comments) {
    this._comments = [];
    comments.map((comment) => {
      const commentModel = new CommentModel();
      commentModel.fillFromObject(comment);
      this._comments.push(commentModel);
    });
  }

  get length() {
    return this._comments.length;
  }

  getComments() {
    return this._comments;
  }

  getMaxId() {
    return (this._comments.length ? this._comments.reduce((a, b) => {
      return a.id > b.id ? a : b;
    }).id : INITIAL_ID);
  }

  addComment(commentModel) {
    this._comments.push(commentModel);
    document.dispatchEvent(new CustomEvent(`commentAdded`, {'detail': commentModel}));
  }

  removeComment(commentId) {
    this._comments.splice(this._comments.findIndex((item) => item.id === commentId), 1);
    document.dispatchEvent(new CustomEvent(`commentRemoved`, {'detail': commentId}));
  }
}
