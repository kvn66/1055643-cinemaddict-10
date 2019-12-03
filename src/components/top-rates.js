const TOP_RATED_FILMS_COUNT = 2;

const createTopRatedsTemplate = () => {
  return (
    `<section class="films-list--extra">
      <h2 class="films-list__title">Top rated</h2>

      <div class="films-list__container"></div>
      </section>`
  );
};

const getTopRated = (films) => {
  return films.slice().sort((a, b) => b.rating - a.rating).slice(0, TOP_RATED_FILMS_COUNT);
};

export {createTopRatedsTemplate, getTopRated};
