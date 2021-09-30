const { Niche } = require('../models');

const nicheData = [
  {
    niche_name: 'Books',
  },
  {
    niche_name: 'Shorts',
  },
  {
    niche_name: `Rock \'n Roll`,
  },
  {
    niche_name: 'Dogs',
  },
  {
    niche_name: 'Space',
  },
];

const seedNiches = () => Niche.bulkCreate(nicheData);

module.exports = seedNiches;
