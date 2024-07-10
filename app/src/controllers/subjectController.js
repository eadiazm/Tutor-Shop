const Subject = require("../models/subjectModel");
const People = require("../models/peopleModel");
const Tutor = require("../models/tutorModel");
const TutorSubject = require("../models/tutorSubjectModel");
const RegisterSubjectDTO = require("../dtos/requestSubject")

//Create a Subject
exports.newSubject = async (req, res, next) => {

    try {
        const subjectDTO = new RegisterSubjectDTO(req.body);

        const subject = await Subject.create(subjectDTO);

        res.status(201).json({
            success: true,
            message: "Subject created in DB.",
            subject
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        });
    }
};

//Query all subjects
exports.getAllSubjects = async (req, res, next) => {
    try {
        const subjects = await Subject.findAll()

        if (!subjects.length === 0) {
            return res.status(404).json({
                success: false,
                message: "Subjects not found in BD."
            });
        }

        res.status(200).json({
            success: true,
            subjects
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

//Query a subject by Id
exports.getSubjectById = async (req, res, next) => {
    const id = req.params.id;

    try {
        const subject = await Subject.findByPk(id)

        if (!subject) {
            return next(res.status(404).json({
                success: false,
                message: `Subject not found in DB with Id: ${id}`
            }));
        } else {
            return res.status(200).json({
                success: true,
                subject
            })
        }
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        });
    };
};

//Query a subject's tutors by subjectId
exports.getTutorSubjectBySubjectId = async (req, res, next) => {
    const subjectId = req.params.id;

    try {
        const subject = await Subject.findByPk(subjectId);

        if (!subject) {
            return res.status(404).json({
                success: false,
                message: `Subject not found in DB with Id: ${subjectId}`
            }); 
        }

        const tutorSubjects = await TutorSubject.findAll({
            where: { subjectId: subjectId },
            include: [
                { model: Subject },
                {
                    model: Tutor,
                    include: [{ model: People }] // Incluye la tabla People asociada al modelo Tutor
                }
            ]
        });

        if (!tutorSubjects.length === 0) {
            return res.status(404).json({
                success: false,
                message: `tutorSubjects not found in DB with id: ${subjectId}`
            });
        } else {
            return res.status(200).json({
                success: true,
                tutorSubjects
            })
        }
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        });
    };
};

//Update a subject
exports.updateSubject = async (req, res, next) => {
    const id = req.params.id;
    const subject = await Subject.findByPk(id);

    if (!subject) {
        return next(`Subject not found in DB with Id: ${id}`, 404);
    }

    try {

        await subject.update(req.body)

        res.status(200).json({
            success: true,
            message: "Subject update in DB.",
            subject
        })
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        });
    };
};

//Delete a Subjet
exports.deleteSubject = async (req, res, next) => {
    const id = req.params.id;

    const subject = await Subject.findByPk(id)

    if (!subject) {
        return next(`Subject not found in DB with Id: ${id}`, 404);
    }

    try {
        await subject.destroy({ where: { id } });

        res.status(200).json({
            success: true,
            message: `Subject erased from DB with id: ${id}`
        })
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        });
    };
};