import {render, RenderPosition, load} from "../utils";
import MovieController from "./movie";
import ShowMoreComponent from "../components/show-more";
import FilmsListComponent from "../components/films-list";

const SHOWING_FILMS_COUNT_ON_START = 5;
const SHOWING_FILMS_COUNT_BY_BUTTON = 5;

export default class FilmsListController {
  constructor(moviesModel, commentsModel, parentComponent, apiWithProvider) {
    this._moviesModel = moviesModel;
    this._commentsModel = commentsModel;
    this._parentComponent = parentComponent;
    this._apiWithProvider = apiWithProvider;
    this._filmsListComponent = null;
    this._isModelLoaded = false;
  }

  render() {
    let showingFilmsCount = SHOWING_FILMS_COUNT_ON_START;
    const filmsListComponent = new FilmsListComponent();
    const showMoreComponent = new ShowMoreComponent();

    const onClick = () => {
      const prevFilmsCount = showingFilmsCount;
      showingFilmsCount = showingFilmsCount + SHOWING_FILMS_COUNT_BY_BUTTON;

      this._moviesModel.getMovies().slice(prevFilmsCount, showingFilmsCount).forEach((movieModel) => {
        new MovieController(movieModel, this._commentsModel, this._apiWithProvider).render(filmsListComponent);
      });

      if (showingFilmsCount >= this._moviesModel.getMovies().length) {
        showMoreComponent.remove();
      }
    };

    if (!this._isModelLoaded) {
      filmsListComponent.titleText = `Loading...`;
      filmsListComponent.titleHide = false;
      load(this._apiWithProvider, this._moviesModel, this._commentsModel).then(() => {
        document.dispatchEvent(new Event(`modelLoaded`));
        this._isModelLoaded = true;
        this.render();
      });
    } else {
      if (this._moviesModel.getMovies().length) {
        filmsListComponent.titleHide = true;

        this._moviesModel.getMovies().slice(0, showingFilmsCount).forEach((movieModel) => {
          new MovieController(movieModel, this._commentsModel, this._apiWithProvider).render(filmsListComponent);
        });

        if (showingFilmsCount < this._moviesModel.getMovies().length) {
          showMoreComponent.setClickHandler(onClick);
          render(filmsListComponent.getContainerElement(), showMoreComponent.getElement(), RenderPosition.AFTEREND);
        }
      } else {
        filmsListComponent.titleText = `There are no movies in our database`;
        filmsListComponent.titleHide = false;
      }
    }


    this._renderElement(this._parentComponent.getElement(), filmsListComponent.getElement(), RenderPosition.AFTERBEGIN);

    this._filmsListComponent = filmsListComponent;
  }

  _renderElement(containerElement, element, place = RenderPosition.BEFOREEND) {
    if (!this._filmsListComponent) {
      render(containerElement, element, place);
    } else {
      const filmsListElement = this._filmsListComponent.getElement();
      if (containerElement.contains(filmsListElement)) {
        filmsListElement.replaceWith(element);
      }
    }
  }
}
