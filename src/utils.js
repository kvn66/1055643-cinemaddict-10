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

export {getFullDate, getCommentDateTime};
