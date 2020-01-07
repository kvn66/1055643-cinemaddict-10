import ProfileRatingController from "./profile-rating";
import MainController from "./main";
import FooterStatisticComponent from "../components/footer-statistic";

export default class PageController {
  constructor(moviesModel, api) {
    this._moviesModel = moviesModel;
    this._api = api;
  }
  render(parentComponent) {
    new ProfileRatingController(this._moviesModel).render(parentComponent.querySelector(`.header`));

    new MainController(this._moviesModel, this._api).render(parentComponent.querySelector(`.main`));

    parentComponent.querySelector(`.footer__statistics`).replaceWith(new FooterStatisticComponent(this._moviesModel).getElement());

    document.addEventListener(`modelLoaded`, () => {
      parentComponent.querySelector(`.footer__statistics`).replaceWith(new FooterStatisticComponent(this._moviesModel).getElement());
    });
  }
}
