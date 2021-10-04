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
*/

// Collection belongs to one User
Collection.belongsTo(User, {
    foreignKey: "user_id",
    targetKey: "user_id"
});

// User can have many Collections
User.hasMany(Collection, {
    foreignKey: "user_id",
    sourceKey: "user_id"
});

/* Collection has many niches */
Collection.hasMany(Niche, {
    constraints: false, 
    foreignKey: "niche_id",
    sourceKey: "niche_id",
    unique: false
});

// A niche can be in many Collections
// Niche.hasMany(Collection, {
//     foreignKey: "niche_id",
//     sourceKey: "niche_id"
//     // this should add niche_id to Collection
// });

// hashtag_niches is a join table where niche_id can have many hashtags, and a hashtag can have many niches
Niche.belongsToMany(HashTag, {
    through: HashTagNiche,
    unique: false
});

HashTag.belongsToMany(Niche, {
    through: HashTagNiche,
    unique: false
});

// collectiontags is a join table where collection can have many hashtags, and hashtag can have many collections
Collection.belongsToMany(HashTag, {
    through: CollectionTag,
    unique: false
});

HashTag.belongsToMany(Collection, {
    through: CollectionTag,
    unique: false
});

module.exports = { User, Niche, HashTag, Collection, CollectionTag, HashTagNiche }