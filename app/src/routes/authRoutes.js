// routes/authRoutes.js
const express = require('express');
const { body, validationResult } = require('express-validator');
const router = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/userModel');
const People = require('../models/peopleModel');
const { use } = require('passport');
const Tutor = require('../models/tutorModel');
const Student = require('../models/studentModel');
const secretKey = 'talento-tech';

const users = []; // En un entorno real, deberías usar una base de datos

// Ruta para registrar un nuevo usuario
router.post('/register',
    [
        body('username').isString().notEmpty().withMessage('Username is required'),
        body('password').isString().isLength({ min: 6 }).withMessage('Password must be at least 6 characters long')
    ],
    async (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).error(errors.array().map(err => err.msg).join(', '));
        }

        try {
            const { username, password } = req.body;
            const hashedPassword = await bcrypt.hash(password, 10);
            users.push({ username, password: hashedPassword });
            res.success(null, 'User registered');
        } catch (err) {
            next(err);
        }
    }
);

// Ruta para hacer login
router.post('/login',
    [
        body('username').isString().notEmpty().withMessage('Username is required'),
        body('password').isString().notEmpty().withMessage('Password is required')
    ],
    async (req, res, next) => {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).error(errors.array().map(err => err.msg).join(', '));
        }

        try {
            const { username, password } = req.body;
            const user = await User.findOne({
                where: { username },
                include: [
                    {
                        model: People,
                        as: 'user_people',
                        include: [
                            {
                                model: Tutor,
                                as: 'person_tutor'
                            },
                            {
                                model: Student,
                                as: 'person_student'
                            }
                        ]
                    }
                ]
            });

            if (!user) {
                return res.status(400).error('User not found');
            }

            const person = user.user_people[0];

            // Verificar si es tutor y/o estudiante y obtener los IDs si existen
            let tutorId = null;
            let studentId = null;

            if (person.person_tutor.length > 0) {
                tutorId = person.person_tutor[0].id;
            }

            if (person.person_student.length > 0) {
                studentId = person.person_student[0].id;
            }

            const validPassword = await bcrypt.compare(password, user.password);
            if (!validPassword) {
                return res.status(400).json({ error: 'Invalid password' });
            }

            const tokenPayload = {
                user: {
                    id: user.id,
                    username: user.username,
                },
                roles: {
                    isTutor: tutorId !== null,
                    isStudent: studentId !== null
                },
                tutorId,
                studentId
            };

            const token = jwt.sign(tokenPayload, secretKey, { expiresIn: '1h' });
            res.status(200).json({
                success: true,
                token: token,
                message: 'Login successful'
            });
        } catch (err) {
            next(err);
        }
    }
);

// Middleware para verificar el token
function authenticateToken(req, res, next) {
    const token = req.header('Authorization') && req.header('Authorization').split(' ')[1];
    if (!token) return res.status(401).error('Access Denied');
    try {
        const verified = jwt.verify(token, secretKey);
        req.user = verified;
        next();
    } catch (err) {
        res.status(400).error('Invalid Token');
    }
}

// Ruta protegida
router.get('/profile', authenticateToken, (req, res) => {
    res.success(`Hello ${req.user.username}`);
});

module.exports = router;
