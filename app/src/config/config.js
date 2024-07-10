const FRONTEND_URL = process.env.FRONTEND_URL || "http://localhost:4000/api";
const DB_HOST = process.env.DB_HOST || "localhost";
const DB_PORT = process.env.DB_PORT || 5432; // El puerto típico de PostgreSQL es 5432
const DB_DATABASE = process.env.DB_DATABASE || "tutoria";
const DB_USER = process.env.DB_USER || "postgres";
const DB_PASSWORD = process.env.DB_PASSWORD || "admin";
const DB_SSL = process.env.DB_SSL === 'true'; // Asegúrate de que la variable de entorno DB_SSL esté configurada como 'true' si necesitas SSL

module.exports = {
    FRONTEND_URL,
    DB_HOST,
    DB_PORT,
    DB_DATABASE,
    DB_USER,
    DB_PASSWORD,
    DB_SSL
};
