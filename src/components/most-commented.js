const createMostCommentedTemplate = () => {
  return (
    `<section class="films-list--extra">
      <h2 class="films-list__title">Most commented</h2>

      <div class="films-list__container"></div>
      </section>`
  );
};

const getMostCommented = (films) => {
  return films.slice().sort((a, b) => b.commentsCount - a.commentsCount).slice(0, 2);
};

export {createMostCommentedTemplate, getMostCommented};
