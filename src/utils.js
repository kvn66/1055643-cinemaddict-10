import moment from 'moment';

export const getFullDate = (date) => {
  return moment(date).format(`DD MMMM YYYY`);
};

export const formatDateTime = (date) => {
  return moment(date).format(`YYYY/MM/DD hh:mm`);
};

export const FilterType = {
  ALL: `all`,
  WATCHLIST: `watchlist`,
  HISTORY: `history`,
  FAVORITES: `favorites`,
  STATISTIC: `statistic`
};

export const SortType = {
  DATE: `date`,
  RATING: `rating`,
  DEFAULT: `default`,
};

export const RenderPosition = {
  AFTERBEGIN: `afterbegin`,
  AFTEREND: `afterend`,
  BEFOREEND: `beforeend`
};

export const render = (containerElement, element, place = RenderPosition.BEFOREEND) => {
  switch (place) {
    case RenderPosition.AFTERBEGIN:
      containerElement.prepend(element);
      break;
    case RenderPosition.AFTEREND:
      containerElement.after(element);
      break;
    case RenderPosition.BEFOREEND:
      containerElement.append(element);
      break;
    default:
      throw new Error(`Указана неверная цель при вызове функции render`);
  }
};
