import ProfileRatingController from "./profile-rating";
import MainController from "./main";
import FooterStatisticComponent from "../components/footer-statistic";

export default class PageController {
  constructor(parentComponent, moviesModel) {
    this._parentComponent = parentComponent;
    this._moviesModel = moviesModel;
  }
  render() {
    new ProfileRatingController(this._parentComponent.querySelector(`.header`)).render(this._moviesModel);

    new MainController(this._parentComponent.querySelector(`.main`)).render(this._moviesModel);

    this._parentComponent.querySelector(`.footer__statistics`).replaceWith(new FooterStatisticComponent(this._moviesModel).getElement());
  }
}
