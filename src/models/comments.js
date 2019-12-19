import CommentModel from "./comment";

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
    return this._comments.reduce(function (a, b) {
      return Math.max(a.id, b.id);
    });
  }

  addComment(commentModel) {
    this._comments.push(commentModel);
    document.dispatchEvent(new CustomEvent(`commentAdded`, {'detail': commentModel}));
  }
}
