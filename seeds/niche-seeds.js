const { Niche } = require('../models');

const nicheData = [
  {
    niche_name: 'Shirts',
  },
  {
    niche_name: 'Shorts',
  },
  {
    niche_name: 'Music',
  },
  {
    niche_name: 'Hats',
  },
  {
    niche_name: 'Shoes',
  },
];

const seedNiches = () => Niche.bulkCreate(nicheData);

module.exports = seedNiches;
