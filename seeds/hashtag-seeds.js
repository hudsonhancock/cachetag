const { HashTag } = require('../models');

const hashtagData = [
  {
    text: 'rock music',
  },
  {
    text: 'pop music',
  },
  {
    text: 'blue',
  },
  {
    text: 'red',
  },
  {
    text: 'green',
  },
  {
    text: 'white',
  },
  {
    text: 'gold',
  },
  {
    text: 'pop culture',
  },
];

const seedHashTags = () => HashTag.bulkCreate(hashtagData);

module.exports = seedHashTags;
