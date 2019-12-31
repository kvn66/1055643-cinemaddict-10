import StatisticComponent from "../components/statistic";
import {render, StatisticFilterType, StatisticFilterPeriodName} from "../utils";
import Chart from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';

const ChartSettings = {
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
    const topGenre = this._getTopGenre(genres);
    this._statisticComponent.topGenre = topGenre;
    this._statisticComponent.rank = topGenre;

    this._statisticComponent.watchedCount = this._moviesModel.getStatisticMovies().length;
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
            backgroundColor: ChartSettings.BAR_COLOR
          }]
        },
        options: {
          events: [`mousemove`],
          plugins: {
            datalabels: {
              display: true,
              anchor: `start`,
              align: `start`,
              color: ChartSettings.LABEL_COLOR,
              offset: ChartSettings.LABEL_OFFSET,
              font: {
                family: ChartSettings.FONT_FAMILY,
                size: ChartSettings.FONT_SIZE
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
            backgroundColor: ChartSettings.TOOLTIPS_BACKGROUND_COLOR,
            bodyFontColor: ChartSettings.TOOLTIPS_BODY_FONT_COLOR,
            borderColor: ChartSettings.TOOLTIPS_BORDER_COLOR,
            borderWidth: ChartSettings.TOOLTIPS_BORDER_WIDTH,
            cornerRadius: ChartSettings.TOOLTIPS_CORNER_RADIUS
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
                fontFamily: ChartSettings.FONT_FAMILY,
                fontSize: ChartSettings.FONT_SIZE,
                fontColor: ChartSettings.Y_TICKS_FONT_COLOR,
                padding: ChartSettings.Y_TICKS_PADDING
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
    this._moviesModel.getStatisticMovies().forEach((item) => {
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
    this._moviesModel.getStatisticMovies().forEach((item) => {
      duration = duration + item.duration;
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
