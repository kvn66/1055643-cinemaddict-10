import CommentModel from "./comment";

const INITIAL_ID = -1;

export default class CommentsModel {
  constructor() {
    this._comments = [];
  }

  get length() {
    return this._comments.length;
  }

  getComments() {
    return this._comments;
  }

  toRAW() {
    return this._comments.map((commentModel) => commentModel.id);
  }

  getMaxId() {
    return (this._comments.length ? this._comments.reduce((a, b) => {
      return a.id > b.id ? a : b;
    }).id : INITIAL_ID);
  }

  fillModel(comments) {
    this._comments = Array.from(comments);
  }

  addComment(commentModel) {
    this._comments.push(commentModel);
    document.dispatchEvent(new CustomEvent(`commentAdded`, {'detail': commentModel}));
  }

  removeComment(commentId) {
    this._comments.splice(this._comments.findIndex((item) => item.id === commentId), 1);
    document.dispatchEvent(new CustomEvent(`commentRemoved`, {'detail': commentId}));
  }

  static parseComment(comment) {
    const model = new CommentModel();
    model.fillFromObject(comment);
    return model;
  }

  static parseComments(comments) {
    return comments.map(CommentsModel.parseComment);
  }
}
