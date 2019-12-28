import CommentModel from "./comment";

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

  fillModel(comments) {
    this._comments = Array.from(comments);
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
