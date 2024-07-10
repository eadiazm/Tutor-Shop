import * as Yup from "yup";

export const bookTutoriiing = Yup.object().shape({
  subjectId: Yup.string().required("Los nombres son requeridos"),
  tutorId: Yup.string().required("Debe seleccionar al profesor de la tutoría"),
  reservationTypeId: Yup.string().required(
    "Debe seleccionar el tipo de tutoría"
  ),
  email: Yup.string()
    .matches(
      /[a-zA-Z0-9_]+([.][a-zA-Z0-9_]+)*@[a-zA-Z0-9_]+([.][a-zA-Z0-9_]+)*[.][a-zA-Z]{2,5}/,
      "Ingrese un email válido"
    )
    .required("El email es requerido"),
  date_start: Yup.string().required("La fecha de inicio es requerida"),
  date_end: Yup.string().required("La fecha de finalización es requerida"),
});
