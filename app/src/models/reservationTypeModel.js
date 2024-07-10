const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const ReservationType = sequelize.define('ReservationType', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    description: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: false
    }},
    { tableName: 'ReservationTypes' }
);

module.exports = ReservationType;