const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Person = require('./peopleModel');

const Tutor = sequelize.define('Tutor', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    profession: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: false
    },
    personId: {
        type: DataTypes.INTEGER,
        references: {
            model: Person,
            key: 'id'
        }
    }},
    { tableName: 'Tutors' }
);

Person.hasMany(Tutor, { as: 'person_tutor', foreignKey: 'personId' });
Tutor.belongsTo(Person, {
  foreignKey: "personId",
});

module.exports = Tutor;