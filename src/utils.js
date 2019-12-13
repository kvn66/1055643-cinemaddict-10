const ADD_NULL_LIMIT = 10;

const getFullDate = (date) => {
  const MonthItems = [
    `January`,
    `February`,
    `March`,
    `April`,
    `May`,
    `June`,
    `July`,
    `August`,
    `September`,
    `October`,
    `November`,
    `December`
  ];
  const day = date.getDate() < ADD_NULL_LIMIT ? `0` + date.getDate() : date.getDate().toString();
  return (day + ` ` + MonthItems [date.getMonth()] + ` ` + date.getFullYear());
};

const formatDateTime = (date) => {
  const day = date.getDate() < ADD_NULL_LIMIT ? `0` + date.getDate() : date.getDate().toString();
  const month = date.getMonth() + 1;
  return date.getFullYear() + `/` + month + `/` + day + ` ` + date.getHours() + `:` + date.getMinutes();
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

const render = (container, element, place = RenderPosition.BEFOREEND) => {
  switch (place) {
    case RenderPosition.AFTERBEGIN:
      container.prepend(element);
      break;
    case RenderPosition.AFTEREND:
      container.after(element);
      break;
    case RenderPosition.BEFOREEND:
      container.append(element);
      break;
    default:
      throw new Error(`Указана неверная цель при вызове функции render`);
  }
};

export {getCheckedParametersCount, getFullDate, formatDateTime, RenderPosition, render, SortType};
