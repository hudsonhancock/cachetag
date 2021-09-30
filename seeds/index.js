const seedNiches = require('./niche-seeds');
const seedUsers = require('./user-seeds');
const seedHashTags = require('./hashtag-seeds');
//const seedProductTags = require('./product-tag-seeds');

const sequelize = require('../config/connection');

const seedAll = async () => {
  await sequelize.sync({ force: true });
  console.log('\n----- DATABASE SYNCED -----\n');
  
  await seedNiches();
  console.log('\n----- NICHES SEEDED -----\n');

  await seedUsers();
  console.log('\n----- USERS SEEDED -----\n');

  await seedHashTags();
  console.log('\n----- HASHTAGS SEEDED -----\n');

  //await seedProductTags();
 // console.log('\n----- PRODUCT TAGS SEEDED -----\n');

  process.exit(0);
};

seedAll();
