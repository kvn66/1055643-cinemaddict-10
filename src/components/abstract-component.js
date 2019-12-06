export default class AbstractComponent {
  constructor() {
    if (new.target === AbstractComponent) {
      throw new Error(`Can't instantiate AbstractComponent, only concrete one.`);
    }
    this._element = null;
  }

  getTemplate() {
    throw new Error(`Abstract method not implemented: getTemplate`);
  }

  createElement(template) {
    const newElement = document.createElement(`div`);
    newElement.innerHTML = template;

    return newElement.firstChild;
  }

  getElement() {
    if (!this._element) {
      this._element = this.createElement(this.getTemplate());
    }
    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}
