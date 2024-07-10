// src/models/peopleModel.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const User = require('./userModel');
const DocumentTypeEnum = require('./documentTypeEnum');
const GenderEnum = require('./genderEnum');

const People = sequelize.define('People', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    names: {
        type: DataTypes.STRING,
        allowNull: false
    },
    lastNames: {
        type: DataTypes.STRING,
        allowNull: false
    },
    typeDocument: {
        type: DataTypes.ENUM,
        values: Object.keys(DocumentTypeEnum),
        allowNull: false
    },
    numberDocument: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    gender: {
        type: DataTypes.ENUM,
        values: Object.keys(GenderEnum),
        allowNull: false
    },
    birthdate: {
        type: DataTypes.DATEONLY,
        allowNull: false
    },
    phone: {
        type: DataTypes.STRING,
        allowNull: true
    },
    userId: {
        type: DataTypes.INTEGER,
        references: {
            model: User,
            key: 'id'
        }
    },
    cityId: {
        type: DataTypes.INTEGER,
        allowNull: false
        /*        references: {
                    model: City,
                    key: 'id'
                }*/
    }
}, {
    tableName: 'People'
});
/*
City.hasMany(People, { as: 'city_people', foreignKey: 'cityId' });
People.belongsTo(City, {
    foreignKey: "cityId"
});
*/
User.hasMany(People, { as: 'user_people', foreignKey: 'userId' });
People.belongsTo(User, {
    foreignKey: "userId"
});

module.exports = People;
