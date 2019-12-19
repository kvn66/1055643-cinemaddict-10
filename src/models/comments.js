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
}
