const createTopRatedsTemplate = () => {
  return (
    `<section class="films-list--extra">
      <h2 class="films-list__title">Top rated</h2>

      <div class="films-list__container"></div>
      </section>`
  );
};

const getTopRates = (films) => {
  return films.slice().sort((a, b) => b.rating - a.rating).slice(0, 2);
};

export {createTopRatedsTemplate, getTopRates};
