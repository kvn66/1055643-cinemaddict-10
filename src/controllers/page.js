import ProfileRatingController from "./profile-rating";
import MainController from "./main";
import FooterStatisticComponent from "../components/footer-statistic";

export default class PageController {
  constructor(parentComponent) {
    this._parentComponent = parentComponent;
  }
  render(films) {
    new ProfileRatingController(this._parentComponent.querySelector(`.header`)).render(films);

    new MainController(this._parentComponent.querySelector(`.main`)).render(films);

    this._parentComponent.querySelector(`.footer__statistics`).replaceWith(new FooterStatisticComponent(films).getElement());
  }
}
