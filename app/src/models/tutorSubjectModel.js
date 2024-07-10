const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Tutor = require('./tutorModel');
const Subject = require('./subjectModel');

const TutorSubject = sequelize.define('TutorSubject', {
    id: {
        type: DataTypes.INTEGER, 
        primaryKey: true,
        autoIncrement: true
      },
    tutorId: {
        type: DataTypes.INTEGER,
        references: {
            model: Tutor,
            key: 'id'
        },
    },    
    subjectId: {
        type: DataTypes.INTEGER,
        references: {
            model: Subject,
            key: 'id'
        }
    }},
    { tableName: 'TutorSubjects' }
);

Tutor.hasMany(TutorSubject, { as: 'tutor_tutorSubject', foreignKey: 'tutorId' });
TutorSubject.belongsTo(Tutor, {
  foreignKey: "tutorId",
});

Subject.hasMany(TutorSubject, { as: 'subject_tutorSubject', foreignKey: 'subjectId' });
TutorSubject.belongsTo(Subject, {
  foreignKey: "subjectId",
});

module.exports = TutorSubject;