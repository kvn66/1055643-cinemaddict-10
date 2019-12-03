import {getRandomIntegerNumber, getRandomArrayItem} from './utils.js';

const TextItems = [
  `Cool`,
  `Awesome`,
  `Sucks`,
  `Full ass`,
  `Interesting setting and a good cast`,
  `Booooooooooring`,
  `Very very old. Meh`,
  `Almost two hours? Seriously?`
];

const EmojiItems = [
  `sleeping`,
  `neutral-face`,
  `grinning`
];

const AuthorItems = [
  `Sonia`,
  `Sonia`,
  `Keks`,
  `Iron Man`,
  `Vigorous Stump`
];

const getRandomDate = () => {
  const targetDate = new Date();
  const diffValue = getRandomIntegerNumber(0, 15);

  targetDate.setDate(targetDate.getDate() - diffValue);

  return targetDate;
};

const generateComment = () => {
  return {
    text: getRandomArrayItem(TextItems),
    emoji: getRandomArrayItem(EmojiItems),
    author: getRandomArrayItem(AuthorItems),
    date: getRandomDate()
  };
};

export const generateComments = () => {
  return new Array(getRandomIntegerNumber(0, 15))
    .fill({})
    .map(generateComment);
};
