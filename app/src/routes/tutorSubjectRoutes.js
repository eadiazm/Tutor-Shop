//express: Intercomunicador entre back y front
const express = require("express");

//Crear un enrutador
const router = express.Router();

const { newTutorSubject,
    getTutorSubjectByTutorId,
    getTutorUnselectedSubjectByTutorId,
    deleteTutorSubject, } = require("../controllers/tutorSubjectController");

//(CREATE) Ruta para crear un nuevo tutorSubject
router.route('/tutorSubject/new').post(newTutorSubject);

//(FIND) Ruta consulta tutorSubject x tutorId 
router.route('/tutorSubject/:id').get(getTutorSubjectByTutorId);

//(FIND) Ruta consulta tutorSubject x tutorId 
router.route('/tutorUnselectedSubject/:id').get(getTutorUnselectedSubjectByTutorId);

//(DELETE) Ruta eliminar tutorSubject x id 
router.route('/tutorSubject/:id').delete(deleteTutorSubject);

//Exportamos el router
module.exports = router;