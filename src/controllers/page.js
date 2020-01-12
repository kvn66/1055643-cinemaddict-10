import ProfileRatingController from "./profile-rating";
import MainController from "./main";
import FooterStatisticComponent from "../components/footer-statistic";

export default class PageController {
  constructor(moviesModel, commentsModel, parentComponent, apiWithProvider) {
    this._moviesModel = moviesModel;
    this._commentsModel = commentsModel;
    this._parentComponent = parentComponent;
    this._apiWithProvider = apiWithProvider;

    this._profileRatingController = new ProfileRatingController(this._moviesModel);
    this._mainController = new MainController(this._moviesModel, this._commentsModel, this._apiWithProvider);

    document.addEventListener(`modelLoaded`, () => {
      this._parentComponent.querySelector(`.footer__statistics`).replaceWith(new FooterStatisticComponent(this._moviesModel).getElement());
    });
  }
  render() {
    this._profileRatingController.render(this._parentComponent.querySelector(`.header`));

    this._mainController.render(this._parentComponent.querySelector(`.main`));

    this._parentComponent.querySelector(`.footer__statistics`).replaceWith(new FooterStatisticComponent(this._moviesModel).getElement());
  }
}
