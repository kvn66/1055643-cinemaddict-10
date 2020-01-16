import CommentModel from './comment';

export default class CommentsModel {
  constructor() {
    this._comments = [];
  }

  get length() {
    return this._comments.length;
  }

  getComment(id) {
    return this._comments.find((comment) => comment.id === id);
  }

  getComments() {
    return this._comments;
  }

  toRAW() {
    return this._comments.map((comment) => comment.id);
  }

  addComments(comments) {
    comments.forEach((comment) => {
      if (!this._updateComment(comment)) {
        this._addComment(comment);
      }
    });
  }

  deleteComment(id) {
    this._comments.splice(this._comments.indexOf(this.getComment(id)), 1);
  }

  clearAll() {
    this._comments = [];
  }

  _addComment(comment) {
    this._comments = [].concat(this._comments, comment);
  }

  _updateComment(newComment) {
    const index = this._comments.findIndex((comment) => comment.id === newComment.id);

    if (index === -1) {
      return false;
    }

    this._comments = [].concat(this._comments.slice(0, index), newComment, this._comments.slice(index + 1));

    return true;
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
