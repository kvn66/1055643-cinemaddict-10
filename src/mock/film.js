import {getRandomIntegerNumber, getRandomArrayItem} from './util.js';

const TitleItems = [
  `The Dance of Life`,
  `Sagebrush Trail`,
  `The Man with the Golden Arm`,
  `Santa Claus Conquers the Martians`,
  `Popeye the Sailor Meets Sindbad the Sailor`,
  `The Great Flamarion`,
  `Made for Each Other`
];

const GenreItems = [
  `Musical`,
  `Western`,
  `Drama`,
  `Comedy`,
  `Cartoon`,
  `Mystery`
];

const PosterItems = [
  `made-for-each-other.png`,
  `popeye-meets-sinbad.png`,
  `sagebrush-trail.jpg`,
  `santa-claus-conquers-the-martians.jpg`,
  `the-dance-of-life.jpg`,
  `the-great-flamarion.jpg`,
  `the-man-with-the-golden-arm.jpg`
];

const DescriptionItems = [
  `Lorem ipsum dolor sit amet, consectetur adipiscing elit.`,
  `Cras aliquet varius magna, non porta ligula feugiat eget.`,
  `Fusce tristique felis at fermentum pharetra.`,
  `Aliquam id orci ut lectus varius viverra.`,
  `Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante.`,
  `Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum.`,
  `Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui.`,
  `Sed sed nisi sed augue convallis suscipit in sed felis.`,
  `Aliquam erat volutpat.`,
  `Nunc fermentum tortor ac porta dapibus.`,
  `In rutrum ac purus sit amet tempus.`
];

const DirectorItems = [
  `Christopher Nolan`,
  `Steven Spielberg`,
  `Quentin Tarantino`,
  `Martin Scorsese`,
  `David Fincher`,
  `Stanley Kubrick`,
  `Ridley Scott`,
  `Francis Ford Coppola`,
  `Clint Eastwood`
];

const WriterItems = [
  `Billy Wilder`,
  `Robert Towne`,
  `Quentin Tarantino`,
  `Francis Ford Coppola`,
  `William Goldman`,
  `Charlie Kaufman`,
  `Woody Allen`,
  `Nora Ephron`,
  `Ernest Lehman`
];

const ActorItems = [
  `Morgan Freeman`,
  `Leonardo DiCaprio`,
  `Brad Pitt`,
  `Michael Caine`,
  `Robert De Niro`,
  `Matt Damon`,
  `Tom Hanks`,
  `Christian Bale`,
  `Gary Oldman`,
  `Al Pacino`,
  `Edward Norton`
];

const CountryItems = [
  `USA`,
  `Bulgaria`,
  `China`,
  `France`,
  `Germany`,
  `Japan`
];

const generateRating = () => {
  return getRandomIntegerNumber(10, 99) / 10.0;
};

const generateDuration = () => {
  const fullMinutes = getRandomIntegerNumber(10, 180);
  const hours = Math.floor(fullMinutes / 60);
  const minutes = fullMinutes % 60;
  return `${hours ? hours + `h` : ``} ${minutes}m`;
};

const generateRandomArray = (count, array) => {
  const set = new Set();
  while (set.size < count) {
    set.add(getRandomArrayItem(array));
  }
  return Array.from(set);
};

const generateRandomStringFromArray = (count, array, space) => {
  let out = ``;
  generateRandomArray(getRandomIntegerNumber(1, count), array).forEach((item, index) => {
    out = index === 0 ? out + item : out + space + item;
  });
  return out;
};

const generateFilm = () => {
  const filmTitle = getRandomArrayItem(TitleItems);
  return {
    title: filmTitle,
    titleOriginal: filmTitle,
    rating: generateRating(),
    releaseDate: new Date(getRandomIntegerNumber(1930, 1950), getRandomIntegerNumber(0, 11), getRandomIntegerNumber(1, 28)),
    duration: generateDuration(),
    genres: generateRandomArray(getRandomIntegerNumber(1, 3), GenreItems),
    poster: getRandomArrayItem(PosterItems),
    description: generateRandomStringFromArray(5, DescriptionItems, ` `),
    commentsCount: getRandomIntegerNumber(0, 999),
    director: getRandomArrayItem(DirectorItems),
    writers: generateRandomStringFromArray(3, WriterItems, `, `),
    actors: generateRandomStringFromArray(5, ActorItems, `, `),
    country: getRandomArrayItem(CountryItems),
    age: getRandomIntegerNumber(0, 18)
  };
};

const generateFilms = (count) => {
  return new Array(count)
    .fill(``)
    .map(generateFilm);
};

export {generateFilm, generateFilms};
