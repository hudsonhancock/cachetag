// import important parts of sequelize library
const { Model, DataTypes } = require('sequelize');
// import our database connection from config.js
const sequelize = require('../config/connection');

// Initialize Collection model (table) by extending off Sequelize's Model class
// CollectionTag is a join table of collection and tag
class CollectionTag extends Model {}

CollectionTag.init(
    {
        collection_tag_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        collection_id: {
            type: DataTypes.INTEGER,
            references: {
                model: "collection",
                key: "collection_id",
                unique: false
            }
        },
        hash_tag_id: {
            type: DataTypes.INTEGER,
            references: {
                model: "hashtag",
                key: "hashtag_id",
                unique: false
            }
        }
    },
    {
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: "collection_tag"
    }
);

module.exports = CollectionTag;