import ProfileRatingController from "./profile-rating";
import MainController from "./main";
import FooterStatisticComponent from "../components/footer-statistic";

export default class PageController {
  constructor(moviesModel, commentsModel, apiWithProvider) {
    this._moviesModel = moviesModel;
    this._commentsModel = commentsModel;
    this._apiWithProvider = apiWithProvider;
  }
  render(parentComponent) {
    new ProfileRatingController(this._moviesModel).render(parentComponent.querySelector(`.header`));

    new MainController(this._moviesModel, this._commentsModel, this._apiWithProvider).render(parentComponent.querySelector(`.main`));

    parentComponent.querySelector(`.footer__statistics`).replaceWith(new FooterStatisticComponent(this._moviesModel).getElement());

    document.addEventListener(`modelLoaded`, () => {
      parentComponent.querySelector(`.footer__statistics`).replaceWith(new FooterStatisticComponent(this._moviesModel).getElement());
    });
  }
}
