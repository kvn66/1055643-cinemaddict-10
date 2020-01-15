import moment from 'moment';

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

export const StatisticFilterType = {
  ALL_TIME: `all-time`,
  TODAY: `today`,
  WEEK: `week`,
  MONTH: `month`,
  YEAR: `year`
};

export const StatisticFilterPeriodName = {
  DAYS: `days`,
  WEEKS: `weeks`,
  MONTHS: `months`,
  YEARS: `years`,
  ALL_TIME: `allTime`
};

const TimePeriod = {
  ONE_MINUTE: 1,
  THREE_MINUTES: 3,
  ONE_HOUR: 60,
  TWO_HOURS: 120,
  ONE_DAY: 1440,
  TWO_DAYS: 2880
};

export const getFullDate = (date) => {
  return moment(date).format(`DD MMMM YYYY`);
};

export const formatDateTime = (date) => {
  const duration = moment.duration(moment().diff(moment(date)));
  const durationInMinutes = duration.asMinutes();

  switch (true) {
    case durationInMinutes < TimePeriod.ONE_MINUTE:
      return `now`;
    case durationInMinutes < TimePeriod.THREE_MINUTES:
      return `a minute ago`;
    case durationInMinutes < TimePeriod.ONE_HOUR:
      return `a few minutes ago`;
    case durationInMinutes < TimePeriod.TWO_HOURS:
      return `a hour ago`;
    case durationInMinutes < TimePeriod.ONE_DAY:
      return `a few hours ago`;
    case durationInMinutes < TimePeriod.TWO_DAYS:
      return `a day ago`;
    default:
      return `a ${Math.floor(duration.asDays())} days ago`;
  }
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

export const formatDuration = (duration) => {
  const hours = Math.floor(duration / 60);
  const minutes = duration % 60;
  return `${hours ? hours + `h` : ``} ${minutes}m`;
};

export const load = (apiWithProvider, moviesModel, commentsModel) => {
  return apiWithProvider.getMovies()
    .then((movies) => {
      moviesModel.fillModel(movies);
      return apiWithProvider.getComments(movies)
        .then((comments) => {
          commentsModel.clearAll();
          commentsModel.addComments(comments);
        });
    });
};
