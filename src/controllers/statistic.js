import StatisticComponent from "../components/statistic";
import {render} from "../utils";
import moment from 'moment';
import Chart from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';

const FILTER_PERIOD = 1;

const StatisticFilterType = {
  ALL_TIME: `all-time`,
  TODAY: `today`,
  WEEK: `week`,
  MONTH: `month`,
  YEAR: `year`
};

export default class StatisticController {
  constructor(moviesModel) {
    this._moviesModel = moviesModel;
    this._filteredMovies = this._moviesModel.getAllMovies().filter((item) => item.isAlreadyWatched);
    this._onFilterClick = this._onFilterClick.bind(this);

    this._statisticComponent = new StatisticComponent();
    this._statisticComponent.setFilterClickHandlers(this._onFilterClick);
    this._statisticCanvasElement = this._statisticComponent.getCanvasElement();
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

  update() {
    const genres = this._createGenresMap();
    this._statisticComponent.topGenre = this._getTopGenre(genres);

    this._statisticComponent.watchedCount = this._filteredMovies.length;
    this._statisticComponent.watchedDuration = this._getFullDuration();
    this._renderChart(genres);
  }

  _renderChart(genres) {
    return new Chart(this._statisticCanvasElement.getContext(`2d`), {
      plugins: [ChartDataLabels],
      type: `horizontalBar`,
      data: {
        labels: Array.from(genres.keys()),
        datasets: [{
          data: Array.from(genres.values()),
          backgroundColor: `#ffe800`
        }]
      },
      options: {
        plugins: {
          datalabels: {
            display: true,
            anchor: `start`,
            align: `start`,
            color: `white`,
            offset: 20,
            font: {
              family: `'Open Sans', 'sans-serif'`,
              size: `20`
            }
          }
        },
        tooltips: {
          callbacks: {
            label: (tooltipItem, data) => {
              const allData = data.datasets[tooltipItem.datasetIndex].data;
              const tooltipData = allData[tooltipItem.index];
              const total = allData.reduce((acc, item) => acc + parseFloat(item));
              const tooltipPercentage = Math.round((tooltipData / total) * 100);
              return `${tooltipData} Films - ${tooltipPercentage}%`;
            }
          },
          displayColors: false,
          backgroundColor: `white`,
          bodyFontColor: `black`,
          borderColor: `black`,
          borderWidth: 1,
          cornerRadius: 10
        },
        legend: {
          display: false
        },
        scales: {
          xAxes: [{
            position: `top`,
            ticks: {
              beginAtZero: true,
              display: false
            }
          }],
          yAxes: [{
            ticks: {
              fontFamily: `'Open Sans', 'sans-serif'`,
              fontSize: `20`,
              fontColor: `white`,
              padding: 50
            }
          }]
        }
      }
    });
  }

  _getTopGenre(genres) {
    let genre = `-`;
    let maxValue = 0;
    genres.forEach((value, key) => {
      if (value > maxValue) {
        maxValue = value;
        genre = key;
      }
    });
    return genre;
  }

  _createGenresMap() {
    const genres = new Map();
    this._filteredMovies.forEach((item) => {
      item.genres.forEach((elem) => {
        if (genres.has(elem)) {
          let count = genres.get(elem);
          count++;
          genres.set(elem, count);
        } else {
          genres.set(elem, 1);
        }
      });
    });
    return genres;
  }

  _getFullDuration() {
    let duration = 0;
    this._filteredMovies.forEach((item) => {
      duration = duration + item.duration;
    });
    return duration;
  }

  _filter(period, periodName) {
    const targetDate = moment().subtract(period, periodName);
    this._filteredMovies = this._moviesModel.getAllMovies().filter((item) => {
      return (moment(item.watchingDate) >= targetDate && item.isAlreadyWatched);
    });
  }

  _onFilterClick(evt) {
    switch (evt.target.value) {
      case StatisticFilterType.TODAY:
        this._filteredMovies = this._moviesModel.getAllMovies().filter((item) => {
          const watchingDate = moment(item.watchingDate);
          return (watchingDate.year() === moment().year() && watchingDate.dayOfYear() === moment().dayOfYear() && item.isAlreadyWatched);
        });
        break;
      case StatisticFilterType.WEEK:
        this._filter(FILTER_PERIOD, `weeks`);
        break;
      case StatisticFilterType.MONTH:
        this._filter(FILTER_PERIOD, `months`);
        break;
      case StatisticFilterType.YEAR:
        this._filter(FILTER_PERIOD, `years`);
        break;
      default:
        this._filteredMovies = this._moviesModel.getAllMovies().filter((item) => item.isAlreadyWatched);
        break;
    }
    this.update();
  }
}
