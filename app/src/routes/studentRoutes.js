//express: Intercomunicador entre back y front
const express = require("express");

//Crear un enrutador
const router = express.Router();

//Crear constante de tipo array/json, para la lista de students
//Traemos la respuesta json desde el controlador
const { newStudent, 
    getStudentById, 
    getAllStudents, 
    updateStudent, 
    deleteStudent, 
    createStudentAsTutorByStudentId } = require("../controllers/studentController")

//Ruta para crear un nuevo student (CREATE)
router.route('/register').post(newStudent);

//Ruta crear un student as tutor
router.route('/studentTutor/:id').post(createStudentAsTutorByStudentId);

//Ruta consulta student x id (FIND) (get)
router.route('/student/:id').get(getStudentById);  //Con los : toma el id de la ruta

//Ruta para consultar todos los students 'getStudents'
router.route('/students').get(getAllStudents);

//Ruta actualiza student x id (UPDATE), usamos PUT
router.route('/student/:id').put(updateStudent);

//Ruta eliminar student x id (DELETE)
router.route('/student/:id').delete(deleteStudent);

//Exportamos el router
module.exports = router;