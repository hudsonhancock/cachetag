const User = require("./User");
const Niche = require("./Niche");
const HashTag = require("./HashTag");
const Collection = require("./Collection");
const CollectionTag = require("./CollectionTag");
const HashTagNiche = require("./HashTagNiche");

/*
A collection has one user and multiple niches
A hash_tag could be used in many niches, and a niche may have many hash_tags
A collection could have many hash_tags, and a hash_tag could be in many collections

The collection table is a JOIN table consisting of user_id and niche_id, and so doesn't have its own relationship definition
*/

// a user can have many niches, and that is stored in collection
User.belongsToMany(Niche, {
    through: Collection,
    foreignKey: "user_id",
    unique: false
});
// a niche can belong to many users, and that is stored in collection
Niche.belongsToMany(User, {
    through: Collection,
    foreignKey: "niche_id",
    unique: false
});

// hashtag_niches is a join table where niche_id can have many hashtags, and a hashtag can have many niches
Niche.belongsToMany(HashTag, {
    through: HashTagNiche,
    foreignKey: "niche_id",
    unique: false
});

HashTag.belongsToMany(Niche, {
    through: HashTagNiche,
    foreignKey: "hashtag_id",
    unique: false
});

// collectiontags is a join table where collection can have many hashtags, and hashtag can have many collections
Collection.belongsToMany(HashTag, {
    through: CollectionTag,
    foreignKey: "collection_id",
    unique: false
});

HashTag.belongsToMany(Collection, {
    through: CollectionTag,
    foreignKey: "hashtag_id",
    unique: false
});

module.exports = { User, Niche, HashTag, Collection, CollectionTag, HashTagNiche }