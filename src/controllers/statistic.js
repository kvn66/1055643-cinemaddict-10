import StatisticComponent from '../components/statistic';
import ProfileRatingController from './profile-rating';
import {render, StatisticFilterPeriodName, StatisticFilterType} from '../utils';
import Chart from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';

const ChartSetting = {
  FONT_SIZE: 20,
  FONT_FAMILY: `'Open Sans', 'sans-serif'`,
  BAR_COLOR: `#ffe800`,
  LABEL_COLOR: `white`,
  LABEL_OFFSET: 20,
  Y_TICKS_FONT_COLOR: `white`,
  Y_TICKS_PADDING: 50,
  TOOLTIPS_BACKGROUND_COLOR: `white`,
  TOOLTIPS_BODY_FONT_COLOR: `black`,
  TOOLTIPS_BORDER_COLOR: `black`,
  TOOLTIPS_BORDER_WIDTH: 1,
  TOOLTIPS_CORNER_RADIUS: 10
};

export default class StatisticController {
  constructor(moviesModel) {
    this._moviesModel = moviesModel;
    this._onFilterClick = this._onFilterClick.bind(this);

    this._statisticComponent = new StatisticComponent();
    this._statisticComponent.setFilterClickHandlers(this._onFilterClick);
    this._statisticCanvasElement = this._statisticComponent.getCanvasElement();
    this._chart = null;
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
    const watchedCount = this._moviesModel.getStatisticMovies().length;
    this._statisticComponent.topGenre = this._getTopGenre(genres);
    this._statisticComponent.rank = ProfileRatingController.createRatingStr(watchedCount);

    this._statisticComponent.watchedCount = watchedCount;
    this._statisticComponent.watchedDuration = this._getFullDuration();
    this._renderChart(genres);
  }

  _renderChart(genres) {
    if (this._chart !== null) {
      this._chart.data.datasets[0].data = Array.from(genres.values());
      this._chart.data.labels = Array.from(genres.keys());
      this._chart.update();
    } else {
      this._chart = new Chart(this._statisticCanvasElement.getContext(`2d`), {
        plugins: [ChartDataLabels],
        type: `horizontalBar`,
        data: {
          labels: Array.from(genres.keys()),
          datasets: [{
            data: Array.from(genres.values()),
            backgroundColor: ChartSetting.BAR_COLOR
          }]
        },
        options: {
          events: [`mousemove`],
          plugins: {
            datalabels: {
              display: true,
              anchor: `start`,
              align: `start`,
              color: ChartSetting.LABEL_COLOR,
              offset: ChartSetting.LABEL_OFFSET,
              font: {
                family: ChartSetting.FONT_FAMILY,
                size: ChartSetting.FONT_SIZE
              }
            }
          },
          tooltips: {
            callbacks: {
              label: (tooltipItem, data) => {
                const allData = data.datasets[tooltipItem.datasetIndex].data;
                const tooltipData = allData[tooltipItem.index];
                const total = allData.reduce((accumulator, allDataItem) => accumulator + parseFloat(allDataItem));
                const tooltipPercentage = Math.round((tooltipData / total) * 100);
                return `${tooltipData} Films - ${tooltipPercentage}%`;
              }
            },
            displayColors: false,
            backgroundColor: ChartSetting.TOOLTIPS_BACKGROUND_COLOR,
            bodyFontColor: ChartSetting.TOOLTIPS_BODY_FONT_COLOR,
            borderColor: ChartSetting.TOOLTIPS_BORDER_COLOR,
            borderWidth: ChartSetting.TOOLTIPS_BORDER_WIDTH,
            cornerRadius: ChartSetting.TOOLTIPS_CORNER_RADIUS
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
                fontFamily: ChartSetting.FONT_FAMILY,
                fontSize: ChartSetting.FONT_SIZE,
                fontColor: ChartSetting.Y_TICKS_FONT_COLOR,
                padding: ChartSetting.Y_TICKS_PADDING
              }
            }]
          }
        }
      });
    }
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
    this._moviesModel.getStatisticMovies().forEach((movieModel) => {
      movieModel.genres.forEach((genre) => {
        if (genres.has(genre)) {
          let count = genres.get(genre);
          count++;
          genres.set(genre, count);
        } else {
          genres.set(genre, 1);
        }
      });
    });
    return genres;
  }

  _getFullDuration() {
    let duration = 0;
    this._moviesModel.getStatisticMovies().forEach((movieModel) => {
      duration = duration + movieModel.duration;
    });
    return duration;
  }

  _onFilterClick(evt) {
    switch (evt.target.value) {
      case StatisticFilterType.TODAY:
        this._moviesModel.statisticFilterType = StatisticFilterPeriodName.DAYS;
        break;
      case StatisticFilterType.WEEK:
        this._moviesModel.statisticFilterType = StatisticFilterPeriodName.WEEKS;
        break;
      case StatisticFilterType.MONTH:
        this._moviesModel.statisticFilterType = StatisticFilterPeriodName.MONTHS;
        break;
      case StatisticFilterType.YEAR:
        this._moviesModel.statisticFilterType = StatisticFilterPeriodName.YEARS;
        break;
      default:
        this._moviesModel.statisticFilterType = StatisticFilterPeriodName.ALL_TIME;
        break;
    }
    this.update();
  }
}
