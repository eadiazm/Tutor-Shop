//express: Intercomunicador entre back y front
const express = require("express");

//Crear un enrutador
const router = express.Router();

const { newTutor, 
    getTutorById, 
    getAllTutors, 
    updateTutor, 
    deleteTutor,
    createTutorAsStudentByTutorId } = require("../controllers/tutorController")

//(CREATE) Ruta para crear un nuevo tutor
router.route('/tutor/new').post(newTutor);

//Ruta crear un tutor as student
router.route('/tutorStudent/:id').post(createTutorAsStudentByTutorId);

//(FIND) Ruta consulta tutor x id 
router.route('/tutor/:id').get(getTutorById);

//Ruta para consultar todos los tutors
router.route('/tutors').get(getAllTutors);

//(UPDATE) Ruta actualiza tutor x id, usamos PUT
router.route('/tutor/:id').put(updateTutor);

//(DELETE) Ruta eliminar tutor x id 
router.route('/tutor/:id').delete(deleteTutor);

//Exportamos el router
module.exports = router;