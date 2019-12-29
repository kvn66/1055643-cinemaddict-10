import AbstractComponent from './abstract-component';

export default class StatisticComponent extends AbstractComponent {
  constructor() {
    super();
    this._inputElements = this.getElement().querySelectorAll(`.statistic__filters-input`);
    this._watchedCountElement = this.getElement().querySelector(`.statistic-watched_count`);
    this._watchedDurationHoursElement = this.getElement().querySelector(`.statistic-watched_duration_hours`);
    this._watchedDurationMinutesElement = this.getElement().querySelector(`.statistic-watched_duration_minutes`);
    this._topGenreElement = this.getElement().querySelector(`.statistic-top_genre`);
  }

  set topGenre(genre) {
    this._topGenreElement.textContent = genre;
  }

  set watchedDuration(duration) {
    const hours = Math.floor(duration / 60);
    const minutes = duration % 60;
    this._watchedDurationHoursElement.textContent = hours.toString();
    this._watchedDurationMinutesElement.textContent = minutes.toString();
  }

  set watchedCount(count) {
    this._watchedCountElement.textContent = count.toString();
  }

  setFilterClickHandlers(handler) {
    this._inputElements.forEach((input) => {
      input.addEventListener(`click`, handler);
    });
  }

  _getTemplate() {
    return (
      `<section class="statistic">
        <p class="statistic__rank">
          Your rank
          <img class="statistic__img" src="images/bitmap@2x.png" alt="Avatar" width="35" height="35">
          <span class="statistic__rank-label">Sci-Fighter</span>
        </p>
        
        <form action="https://echo.htmlacademy.ru/" method="get" class="statistic__filters">
          <p class="statistic__filters-description">Show stats:</p>
        
          <input type="radio" class="statistic__filters-input visually-hidden" name="statistic-filter" id="statistic-all-time" value="all-time" checked>
          <label for="statistic-all-time" class="statistic__filters-label">All time</label>
        
          <input type="radio" class="statistic__filters-input visually-hidden" name="statistic-filter" id="statistic-today" value="today">
          <label for="statistic-today" class="statistic__filters-label">Today</label>
        
          <input type="radio" class="statistic__filters-input visually-hidden" name="statistic-filter" id="statistic-week" value="week">
          <label for="statistic-week" class="statistic__filters-label">Week</label>
        
          <input type="radio" class="statistic__filters-input visually-hidden" name="statistic-filter" id="statistic-month" value="month">
          <label for="statistic-month" class="statistic__filters-label">Month</label>
        
          <input type="radio" class="statistic__filters-input visually-hidden" name="statistic-filter" id="statistic-year" value="year">
          <label for="statistic-year" class="statistic__filters-label">Year</label>
        </form>
        
        <ul class="statistic__text-list">
          <li class="statistic__text-item">
            <h4 class="statistic__item-title">You watched</h4>
            <p class="statistic__item-text"><span class="statistic-watched_count">22</span> <span class="statistic__item-description">movies</span></p>
          </li>
          <li class="statistic__text-item">
            <h4 class="statistic__item-title">Total duration</h4>
            <p class="statistic__item-text"><span class="statistic-watched_duration_hours">130</span> <span class="statistic__item-description">h</span> <span class="statistic-watched_duration_minutes">22</span> <span class="statistic__item-description">m</span></p>
          </li>
          <li class="statistic__text-item">
            <h4 class="statistic__item-title">Top genre</h4>
            <p class="statistic__item-text statistic-top_genre">Sci-Fi</p>
          </li>
        </ul>
        
        <div class="statistic__chart-wrap">
          <canvas class="statistic__chart" width="1000"></canvas>
        </div>
        
      </section>`
    );
  }
}
