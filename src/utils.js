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

const getFullDate = (date) => {
  const day = date.getDate() < 10 ? `0` + date.getDate() : date.getDate().toString();
  return day + ` ` + MonthItems[date.getMonth()] + ` ` + date.getFullYear();
};

const getCommentDateTime = (date) => {
  const day = date.getDate() < 10 ? `0` + date.getDate() : date.getDate().toString();
  const month = date.getMonth() + 1;
  return date.getFullYear() + `/` + month + `/` + day + ` ` + date.getHours() + `:` + date.getMinutes();
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

export {getFullDate, getCommentDateTime, getCheckedParametersCount};
