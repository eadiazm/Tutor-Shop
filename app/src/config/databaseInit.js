// src/config/databaseInit.js
const sequelize = require("./database");
const User = require("../models/userModel");
const City = require("../models/cityModel");
const Person = require("../models/peopleModel");
const Reservation = require("../models/reservationModel");
const Student = require("../models/studentModel");
const Subject = require("../models/subjectModel");
const Tutor = require("../models/tutorModel");
const TutorSubject = require("../models/tutorSubjectModel");

class Database {
  static async init() {
    try {
      await sequelize.authenticate();
      console.log("Connection has been established successfully.");

      // Definir relaciones si es necesario
      //Person.hasOne(User, { foreignKey: 'personId' });
      //User.belongsTo(Person, { foreignKey: 'personId' });

      // Agrega aquí las relaciones entre los demás modelos

      await sequelize.sync({ alter: true }); // `alter: true` evita borrar los datos existentes
      //await sequelize.sync({ force: true });
      console.log("Database synchronized.");
    } catch (error) {
      console.error("Unable to connect to the database:", error);
    }
  }
}

module.exports = Database;
