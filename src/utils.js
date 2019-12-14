import moment from 'moment';

const getFullDate = (date) => {
  return moment(date).format(`DD MMMM YYYY`);
};

const formatDateTime = (date) => {
  return moment(date).format(`YYYY/MM/DD hh:mm`);
};

const SortType = {
  DATE: `date`,
  RATING: `rating`,
  DEFAULT: `default`,
};

const RenderPosition = {
  AFTERBEGIN: `afterbegin`,
  AFTEREND: `afterend`,
  BEFOREEND: `beforeend`
};

const getCheckedParametersCount = (films, parametr) => {
  let count = 0;
  films.forEach((item) => {
    if (item[parametr]) {
      count++;
    }
  });
  return count;
};

const render = (containerElement, element, place = RenderPosition.BEFOREEND) => {
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

export {getCheckedParametersCount, getFullDate, formatDateTime, RenderPosition, render, SortType};
