import StatisticComponent from "../components/statistic";
import {render} from "../utils";

export default class StatisticController {
  constructor(moviesModel) {
    this._movieModel = moviesModel;

    this._statisticComponent = new StatisticComponent();
  }

  render(parentElement) {
    render(parentElement, this._statisticComponent.getElement());
  }

  show() {
    this._statisticComponent.show();
  }

  hide() {
    this._statisticComponent.hide();
  }
}
