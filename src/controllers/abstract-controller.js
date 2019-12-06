export default class AbstractController {
  constructor() {
    if (new.target === AbstractController) {
      throw new Error(`Can't instantiate AbstractController, only concrete one.`);
    }

    this.RenderPosition = {
      AFTEREND: `afterend`,
      BEFOREEND: `beforeend`
    };
  }

  render(container, element, place = this.RenderPosition.BEFOREEND) {
    switch (place) {
      case this.RenderPosition.AFTEREND:
        container.after(element);
        break;
      case this.RenderPosition.BEFOREEND:
        container.append(element);
        break;
    }
  }
}
