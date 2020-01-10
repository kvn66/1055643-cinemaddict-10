export default class CommentModel {
  constructor() {
    this._id = -1;
    this._text = ``;
    this._emoji = null;
    this._author = ``;
    this._date = null;
  }

  get id() {
    return this._id;
  }

  set id(id) {
    this._id = id;
  }

  get text() {
    return this._text;
  }

  set text(text) {
    this._text = text;
  }

  get emoji() {
    return this._emoji;
  }

  set emoji(emoji) {
    this._emoji = emoji;
  }

  get author() {
    return this._author;
  }

  get date() {
    return this._date;
  }

  set date(date) {
    this._date = date;
  }

  fillFromObject(comment) {
    this._id = comment.id;
    this._text = comment.comment;
    this._emoji = comment.emotion;
    this._author = comment.author;
    this._date = new Date(comment.date);
  }

  toRAW() {
    return {
      'id': this._id,
      'comment': this._text,
      'emotion': this._emoji,
      'author': this._author,
      'date': this._date
    };
  }

  toLocalComment() {
    return {
      'comment': this._text,
      'emotion': this._emoji,
      'date': this._date
    };
  }
}
