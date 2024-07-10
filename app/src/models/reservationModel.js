// src/models/reservationModel.js
const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const Student = require("./studentModel");
const Tutor = require("./tutorModel");
const StatusEnum = require("./statusEnum");
const ReservationTypeEnum = require("./reservationTypeEnum");
const Subject = require("./subjectModel");

const Reservation = sequelize.define(
  "Reservation",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    date: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    date_start: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    date_end: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    status: {
      type: DataTypes.STRING,
      values: Object.keys(StatusEnum),
      allowNull: false,
      unique: false,
      defaultValue: StatusEnum.C,
    },
    studentId: {
      type: DataTypes.INTEGER,
      references: {
        model: Student,
        key: "id",
      },
    },
    tutorId: {
      type: DataTypes.INTEGER,
      references: {
        model: Tutor,
        key: "id",
      },
    },
    reservationTypeId: {
      type: DataTypes.STRING,
      values: Object.keys(ReservationTypeEnum),
      allowNull: false,
      unique: false,
    },
    subjectId: {
      type: DataTypes.INTEGER,
      references: {
        model: Subject,
        key: "id",
      },
    },
  },
  {
    tableName: "Reservations",
  }
);

Student.hasMany(Reservation, {
  as: "student_reservation",
  foreignKey: "studentId",
});
Reservation.belongsTo(Student, {
  foreignKey: "studentId",
});

Tutor.hasMany(Reservation, { as: "tutor_reservation", foreignKey: "tutorId" });
Reservation.belongsTo(Tutor, {
  foreignKey: "tutorId",
});

Subject.hasMany(Reservation, {
  as: "subject_reservation",
  foreignKey: "subjectId",
});
Reservation.belongsTo(Subject, {
  foreignKey: "subjectId",
});

module.exports = Reservation;
