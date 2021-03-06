// import important parts of sequelize library
const { Model, DataTypes } = require('sequelize');
// import our database connection from config.js
const sequelize = require('../config/connection');

// Initialize Collection model (table) by extending off Sequelize's Model class
// Collection is a join table of user and niche
class Collection extends Model {}

Collection.init(
    {
        collection_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        user_id: {
            type: DataTypes.INTEGER,
            references: {
                model: "user",
                key: "user_id",
                unique: false
            }
        },
        niche_id: {
            type: DataTypes.INTEGER,
            references: {
                model: "niche",
                key: "niche_id",
                unique: false
            }
        }
    },
    {
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: "collection"
    }
);

module.exports = Collection;