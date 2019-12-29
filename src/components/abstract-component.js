const HIDDEN_CLASS = `visually-hidden`;

export default class AbstractComponent {
  constructor() {
    if (new.target === AbstractComponent) {
      throw new Error(`Can't instantiate AbstractComponent, only concrete one.`);
    }
    this._element = null;
  }

  getElement() {
    if (!this._element) {
      this._element = this._createElement(this._getTemplate());
    }
    return this._element;
  }

  removeElement() {
    this._element = null;
  }

  remove() {
    this.getElement().remove();
    this.removeElement();
  }

  show() {
    if (this._element) {
      this._element.classList.remove(HIDDEN_CLASS);
    }
  }

  hide() {
    if (this._element) {
      this._element.classList.add(HIDDEN_CLASS);
    }
  }

  _getTemplate() {
    throw new Error(`Abstract method not implemented: getTemplate`);
  }

  _createElement(template) {
    const newElement = document.createElement(`div`);
    newElement.innerHTML = template;

    return newElement.firstChild;
  }
}
