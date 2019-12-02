const MOST_COMMENTED_FILMS_COUNT = 2;

const createMostCommentedTemplate = () => {
  return (
    `<section class="films-list--extra">
      <h2 class="films-list__title">Most commented</h2>

      <div class="films-list__container"></div>
      </section>`
  );
};

const getMostCommented = (films) => {
  return films.slice().sort((a, b) => b.comments.length - a.comments.length).slice(0, MOST_COMMENTED_FILMS_COUNT);
};

export {createMostCommentedTemplate, getMostCommented};
