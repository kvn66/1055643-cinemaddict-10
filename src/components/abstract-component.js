export default class AbstractComponent {
  constructor() {
    if (new.target === AbstractComponent) {
      throw new Error(`Can't instantiate AbstractComponent, only concrete one.`);
    }
    this._element = null;
  }

  _getTemplate() {
    throw new Error(`Abstract method not implemented: getTemplate`);
  }

  _createElement(template) {
    const newElement = document.createElement(`div`);
    newElement.innerHTML = template;

    return newElement.firstChild;
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
}
