//express: Intercomunicador entre back y front
const express = require("express");

//Crear un enrutador
const router = express.Router();

const {
  newReservation,
  getReservationById,
  getAllReservations,
  updateReservation,
  deleteReservation,
  getReservationsByTutorIdAndStatus,
  getReservationsByStudentId,
} = require("../controllers/reservationController");

//(CREATE) Ruta para crear un nuevo reservation
router.route("/reservation/new").post(newReservation);

//(FIND) Ruta consulta reservation x id
router.route("/reservation/:id").get(getReservationById);

//(FIND) Ruta consulta reservation x student id
router.route("/reservations/student/:id").get(getReservationsByStudentId);

//(FIND) Ruta consulta reservation x tutor id
router
  .route("/reservations/tutor/:id/:status")
  .get(getReservationsByTutorIdAndStatus);

//Ruta para consultar todos los reservations
router.route("/reservations").get(getAllReservations);

//(UPDATE) Ruta actualiza reservation x id
router.route("/reservation/:id").put(updateReservation);

//(DELETE) Ruta eliminar reservation x id
router.route("/reservation/:id").delete(deleteReservation);

//Exportamos el router
module.exports = router;
