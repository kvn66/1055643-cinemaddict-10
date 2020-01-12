import CommentModel from "./comment";

export default class CommentsModel {
  constructor() {
    this._comments = [];
  }

  get length() {
    return this._comments.length;
  }

  getComment(id) {
    return this._comments.find((item) => item.id === id);
  }

  getComments() {
    return this._comments;
  }

  toRAW() {
    return this._comments.map((commentModel) => commentModel.id);
  }

  addComments(comments) {
    const commentsSet = new Set(this._comments);
    comments.forEach((item) => {
      commentsSet.add(item);
    });
    this._comments = Array.from(commentsSet);
  }

  deleteComment(id) {
    this._comments.splice(this._comments.indexOf(this.getComment(id)), 1);
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
