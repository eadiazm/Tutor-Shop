const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Person = require('./peopleModel');

const Student = sequelize.define('Student', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    personId: {
        type: DataTypes.INTEGER,
        references: {
            model: Person,
            key: 'id'
        }
    }},
    { tableName: 'Students' }
);

Person.hasMany(Student, { as: 'person_student', foreignKey: 'personId' });
Student.belongsTo(Person, {
  foreignKey: "personId",
});

module.exports = Student;