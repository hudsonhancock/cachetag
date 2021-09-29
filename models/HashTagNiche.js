// import important parts of sequelize library
const { Model, DataTypes } = require('sequelize');
// import our database connection from config.js
const sequelize = require('../config/connection');

// Initialize HashTagNiche model (table) by extending off Sequelize's Model class
// HashTagNiche is a join table of niche and hash_tag
class HashTagNiche extends Model {}

HashTagNiche.init(
    {
        hashtag_niche_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        niche_id: {
            type: DataTypes.INTEGER,
            references: {
                model: "niche",
                key: "niche_id",
                unique: false
            }
        },
        hashtag_id: {
            type: DataTypes.INTEGER,
            references: {
                model: "hash_tag",
                key: "hash_tag_id",
                unique: false
            }
        }
    },
    {
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: "hashtag_niche"
    }
);

module.exports = HashTagNiche;