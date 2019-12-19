export default class CommentModel {
  constructor() {
    this._id = -1;
    this._text = ``;
    this._emoji = ``;
    this._author = ``;
    this._date = null;
  }

  get id() {
    return this._id;
  }

  get text() {
    return this._text;
  }

  get emoji() {
    return this._emoji;
  }

  get author() {
    return this._author;
  }

  get date() {
    return this._date;
  }

  fillFromObject(comment) {
    this._id = comment.id;
    this._text = comment.text;
    this._emoji = comment.emoji;
    this._author = comment.author;
    this._date = comment.date;
  }

}
