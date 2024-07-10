const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Subject = sequelize.define('Subject', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: false
    },
    description: {
        type: DataTypes.STRING,
        allowNull: true,
        unique: false
    },
    grade: {
        type: DataTypes.STRING,
        allowNull: true,
        unique: false
    }},
    { tableName: 'Subjects' }
);

module.exports = Subject;