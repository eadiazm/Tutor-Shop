const express = require('express');
const session = require('express-session');
const cors = require('cors');
const passport = require('./config/passport');
const Database = require('./config/databaseInit');
const jwt = require('jsonwebtoken');
const app = express();
const port = 4000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

app.use(session({ secret: 'your-secret-key', resave: false, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());
app.use(cors());

// Secret key for JWT
const secretKey = 'talento-tech';

// Middleware to authenticate token
function authenticateToken(req, res, next) {
  const token = req.header('Authorization') && req.header('Authorization').split(' ')[1];
  if (!token) return res.status(401).json({ success: false, message: 'Access Denied' });
  try {
    const verified = jwt.verify(token, secretKey);
    req.user = verified;
    next();
  } catch (err) {
    res.status(400).json({ success: false, message: 'Invalid Token' });
  }
}

// Rutas de autenticación
const authRoutes = require('./routes/authRoutes');
app.use('/api/auth', authRoutes);

// Importar las rutas
const users = require('./routes/userRoutes');
const students = require('./routes/studentRoutes');
const tutors = require('./routes/tutorRoutes');
const cities = require('./routes/cityRoutes');
const generics = require('./routes/genericRoutes');
const reservations = require('./routes/reservationRoutes');
const subjects = require('./routes/subjectRoutes');
const tutorSubjects = require('./routes/tutorSubjectRoutes');

// Crear las rutas del navegador, las rutas del back inician con '/api'
app.use('/api/user', users);
app.use('/api/student', students);
app.use('/api/tutor', tutors);
app.use('/api/city', cities);
app.use('/api/generic', generics);
app.use('/api/reservation', reservations);
app.use('/api/subject', subjects);
app.use('/api/tutorSubject', tutorSubjects);

// Inicializar la base de datos y luego iniciar el servidor
Database.init()
  .then(() => {
    app.listen(port, () => {
      console.log(`Server running at http://localhost:${port}`);
    });
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });
