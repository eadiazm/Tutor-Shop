//express: Intercomunicador entre back y front
const express = require("express");

//Crear un enrutador
const router = express.Router();

const { newSubject,
    getAllSubjects,
    getSubjectById,
    getTutorSubjectBySubjectId,
    updateSubject,
    deleteSubject } = require("../controllers/subjectController");

//(CREATE) Ruta para crear un nuevo Subject
router.route('/subject/new').post(newSubject);

//(FIND) Ruta consulta all Subjects 
router.route('/subjects').get(getAllSubjects);

//(FIND) Ruta consulta Subject x subjectId
router.route('/subject/:id').get(getSubjectById);

//(FIND) Ruta consulta Subject' tutors x subjectId 
router.route('/tutorsSubject/:id').get(getTutorSubjectBySubjectId);

//(UPDATE) Ruta actualizar Subject x id 
router.route('/subject/:id').put(updateSubject);

//(DELETE) Ruta eliminar Subject x id 
router.route('/subject/:id').delete(deleteSubject);

//Exportamos el router
module.exports = router;