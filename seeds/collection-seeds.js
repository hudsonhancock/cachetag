const { Collection } = require('../models');

const collectionData = [
    {
        user_id: 2,
        niche_id: 1
    },
    {
        user_id: 2,
        niche_id: 2
    },
    {
        user_id: 2,
        niche_id: 4
    },
    {
        user_id: 4,
        niche_id: 1
    },
    {
        user_id: 4,
        niche_id: 3
    },
    {
        user_id: 4,
        niche_id: 5
    }
];

const seedCollections = () => Collection.bulkCreate(collectionData);
module.exports = seedCollections;