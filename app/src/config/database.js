// src/config/database.js
const { Sequelize } = require('sequelize');
const { DB_DATABASE, DB_HOST, DB_PASSWORD, DB_PORT, DB_USER, DB_SSL } = require("./config.js");

const sequelizeOptions = {
    host: DB_HOST,
    dialect: 'postgres',
    port: DB_PORT,
    define: {
        timestamps: false
    },
};

if (DB_SSL) {
    sequelizeOptions.dialectOptions = {
        ssl: {
            require: true,
            rejectUnauthorized: false // Puedes ajustarlo según tus necesidades de seguridad
        }
    };
}

const sequelize = new Sequelize(
    DB_DATABASE,
    DB_USER,
    DB_PASSWORD,
    sequelizeOptions
);

module.exports = sequelize;
