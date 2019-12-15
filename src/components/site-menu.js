import AbstractComponent from './abstract-component';

export default class SiteMenuComponent extends AbstractComponent {
  set watchlistCount(count) {
    this.getElement().querySelector(`.watchlist-count`).textContent = count.toString();
  }

  set historyCount(count) {
    this.getElement().querySelector(`.history-count`).textContent = count.toString();
  }

  set favoritesCount(count) {
    this.getElement().querySelector(`.favorites-count`).textContent = count.toString();
  }

  getTemplate() {
    return (
      `<nav class="main-navigation">
      <a href="#all" class="main-navigation__item main-navigation__item--active">All movies</a>
      <a href="#watchlist" class="main-navigation__item">Watchlist <span class="main-navigation__item-count watchlist-count"></span></a>
      <a href="#history" class="main-navigation__item">History <span class="main-navigation__item-count history-count"></span></a>
      <a href="#favorites" class="main-navigation__item">Favorites <span class="main-navigation__item-count favorites-count"></span></a>
      <a href="#stats" class="main-navigation__item main-navigation__item--additional">Stats</a>
    </nav>`
    );
  }
}
