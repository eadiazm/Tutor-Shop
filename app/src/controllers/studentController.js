const Person = require("../models/peopleModel");
const Student = require("../models/studentModel");
const Tutor = require("../models/tutorModel");
const User = require("../models/userModel");
const bcrypt = require('bcryptjs');
const RegisterPeopleDTO = require("../dtos/requestPeople");

// Create a Student
exports.newStudent = async (req, res, next) => {
    try {
        const studentDTO = new RegisterPeopleDTO(req.body);
        const { email, password, ...personData } = studentDTO;

        let user = await User.findOne({ where: { username: email } });
        if (user) {
            if (user.rolName !== 'student' && user.rolName !== 'tutor') {
                user.rolName = 'student';
                await user.save();
            }
        } else {
            const hashedPassword = await bcrypt.hash(password, 10);
            user = await User.create({ username: email, password: hashedPassword, rolName: 'student' });
        }

        let person = await Person.findOne({ where: { email: email } });
        if (!person) {
            person = await Person.create({ email, userId: user.id, ...personData });
        }

        const student = await Student.create({ personId: person.id, ...personData });

        res.status(201).json({
            success: true,
            message: "Student created at BD.",
            person,
            student
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        });
    }
};

// Create a student as Tutor
exports.createStudentAsTutorByStudentId = async (req, res, next) => {
    const studentid = req.params.id;

    try {
        const student = await Student.findOne({
            where: { id: studentid },
            include: [{ model: Person }]
        });

        if (!student) {
            return res.status(404).json({
                success: false,
                message: `Student not found in DB with id: ${studentid}`
            });
        }

        const tutor = await Tutor.findOne({
            where: { personId: student.Person.id },
            include: [{ model: Person }]
        });

        if (tutor) {
            return res.status(200).json({
                success: true,
                message: `Student already exists as a tutor: ${student.Person.id}`,
                tutor: tutor
            });
        }

        const newTutor = await Tutor.create({ personId: student.Person.id, ...req.body });

        res.status(201).json({
            success: true,
            message: "Student created as Tutor in DB.",
            tutor: newTutor
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

// Query all students
exports.getAllStudents = async (req, res, next) => {
    try {
        const students = await Student.findAll({ include: [Person] });

        if (!students.length === 0) {
            return res.status(404).json({
                success: false,
                message: "Information not found at BD."
            });
        }

        res.status(200).json({
            success: true,
            students
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

// Query a student by Id
exports.getStudentById = async (req, res, next) => {
    const id = req.params.id;

    try {
        const student = await Student.findByPk(id, { include: [Person] });

        if (!student) {
            return res.status(404).json({
                success: false,
                message: `Student not found in DB: ${id}`
            });
        } else {
            return res.status(200).json({
                success: true,
                student
            });
        }
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

// Update a Student
exports.updateStudent = async (req, res, next) => {
    const id = req.params.id;
    const student = await Student.findByPk(id);

    if (!student) {
        return res.status(404).json({
            success: false,
            message: `Student not found at DB with Id: ${id}`
        });
    }

    const person = await Person.findByPk(student.personId);

    if (!person) {
        return res.status(404).json({
            success: false,
            message: `Student data not found at DB with Id: ${student.personId}`
        });
    }

    try {
        await person.update(req.body);
        res.status(200).json({
            success: true,
            message: "Student updated at DB.",
            person,
            student
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        });
    }
};

// Delete a Student
exports.deleteStudent = async (req, res, next) => {
    const studentId = req.params.id;

    const student = await Student.findByPk(studentId, { include: [Person] });

    if (!student) {
        return res.status(404).json({
            success: false,
            message: `Student data not found at DB with Id: ${studentId}`
        });
    }

    try {
        await student.destroy();

        if (student.Person) {
            await student.Person.destroy();
        }

        res.status(200).json({
            success: true,
            message: "Student and associated person erased from DB."
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        });
    }
};
