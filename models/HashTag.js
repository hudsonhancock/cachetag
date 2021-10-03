// import important parts of sequelize library
const { Model, DataTypes } = require('sequelize');
// import our database connection from config.js
const sequelize = require('../config/connection');

// Initialize HashTag model (table) by extending off Sequelize's Model class
class HashTag extends Model {};

HashTag.init(
    {
        hashtag_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        text: {
            type: DataTypes.STRING,
            allowNull: false
        }
        // popularity: {
        //     type: DataTypes.INTEGER,
        //     allowNull: true
        // }
    },
    {
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: 'hashtag',
    }
);

module.exports = HashTag;