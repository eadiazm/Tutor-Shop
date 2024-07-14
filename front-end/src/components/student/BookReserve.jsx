import { ErrorMessage, Field, Form, Formik } from "formik";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { bookTutoriiing } from "../schemas/bookTutoriiing";
import StatusEnum from "../models/status.model";
import {
  fetchSubjects,
  fetchTutorials,
  fetchTutorsBySubject,
  setReserveTutorial,
} from "../services/api";

const BookReserve = ({ sendingReload }) => {
  const [subjects, setSubjects] = useState([]);
  const [tutorials, setTutorials] = useState([]);
  const [tutorNames, setTutorNames] = useState([]);
  const [date, setCurrentDate] = useState("");
  const [formSended, setformSended] = useState(false);
  const [formSendedError, setformSendedError] = useState(false);

  const user = useSelector((state) => state.user),
    studentId = user.studentId,
    status = StatusEnum.Created;

  const { bookTutoring } = useSelector((store) => store.infoStudentForm);

  const handleTutorChange = async (e) => {
    const subjectsId = e.target.value;
    try {
      const tutorsBySubject = await fetchTutorsBySubject(subjectsId);
      setTutorNames(tutorsBySubject);
    } catch (error) {
      console.error(error);
      setTutorNames([]); // Manejo de error: establecer tutorNames como un array vacío
    }
  };

  function obtenerFechaEnFormato() {
    let fecha = new Date(); // Obtener la fecha actual
    let year = fecha.getFullYear(); // Obtener el año (YYYY)
    let month = ("0" + (fecha.getMonth() + 1)).slice(-2); // Obtener el mes (MM)
    let day = ("0" + fecha.getDate()).slice(-2); // Obtener el día (DD)

    const newDate = `${year}-${month}-${day}`;
    setCurrentDate(newDate);
  }

  const handleSubmit = async (values) => {
    try {
      const response = await setReserveTutorial(values);

      if (!response.success) {
        const errorData = await response.json();
        throw new Error(
          errorData.message || "Error al enviar los datos de la tutoría"
        );
      }

      setformSended(true);
      setTimeout(() => {
        setformSended(false);
      }, 3000);
      sendingReload();
    } catch (error) {
      setformSendedError(true);
      setTimeout(() => {
        setformSendedError(false);
      }, 3000);
    }
  };

  const onSubmit = (values) => {
    const {
      subjectId,
      tutorId,
      email,
      date_start,
      date_end,
      reservationTypeId,
    } = values;
    const data = {
      date,
      date_start,
      date_end,
      status,
      studentId,
      tutorId,
      reservationTypeId,
      subjectId,
      email,
    };
    handleSubmit(data);
  };

  useEffect(() => {
    const loadSubjects = async () => {
      try {
        const data = await fetchSubjects();
        setSubjects(data);
      } catch (error) {
        console.error(error);
      }
    };
    loadSubjects();

    const loadTutorials = async () => {
      try {
        const data = await fetchTutorials();
        setTutorials(data);
      } catch (error) {
        console.error(error);
      }
    };
    loadTutorials();
    obtenerFechaEnFormato();
  }, []);

  return (
    <div className="p-5 mt-5">
      <h2
        className="px-md-5 mx-auto font-size-md-up"
        style={{ maxWidth: "696px" }}
        id="bookReserve"
      >
        Reserva tu tutoría
      </h2>
      <Formik
        initialValues={bookTutoring}
        onSubmit={(values, actions) => {
          onSubmit(values);
          actions.setSubmitting(false);
          actions.resetForm();
        }}
        validationSchema={bookTutoriiing}
      >
        {({ errors, touched, isSubmitting, setFieldValue }) => (
          <Form
            className="card shadow my-5 needs-validation  container text-start py-4 px-md-5"
            noValidate
            style={{ maxWidth: "696px" }}
          >
            <div className="mb-3">
              <label htmlFor="subjectId" className="form-label">
                Materia
              </label>
              <Field
                name="subjectId"
                id="subjectId"
                as="select"
                className={`form-control ${
                  touched.subjectId && errors.subjectId ? "is-invalid" : ""
                }`}
                onChange={(e) => {
                  handleTutorChange(e);
                  setFieldValue("subjectId", e.target.value);
                }}
              >
                <option value="">Selecciona una materia</option>
                {subjects.map((subject) => (
                  <option key={subject.id} value={subject.id}>
                    {subject.name}
                  </option>
                ))}
              </Field>
              <ErrorMessage
                name="subjectId"
                component="p"
                className="invalid-feedback"
              />
            </div>
            <div className="mb-3">
              <label htmlFor="tutorId" className="form-label">
                Profesores de la materia
              </label>
              <Field
                name="tutorId"
                id="tutorId"
                as="select"
                className={`form-control ${
                  touched.tutorId && errors.tutorId ? "is-invalid" : ""
                }`}
                disabled={!touched.subjectId || errors.subjectId}
              >
                <option value="">Selecciona una profesor</option>
                {tutorNames.map((subject) => (
                  <option
                    key={subject.Tutor.Person.id}
                    value={subject.Tutor.Person.id}
                  >
                    {subject.Tutor.Person.names}
                  </option>
                ))}
              </Field>
              <ErrorMessage
                name="tutorId"
                component="p"
                className="invalid-feedback"
              />
            </div>
            <div className="mb-3">
              <label htmlFor="reservationTypeId" className="form-label">
                Tipo de tutoría
              </label>
              <Field
                name="reservationTypeId"
                id="reservationTypeId"
                as="select"
                className={`form-control ${
                  touched.reservationTypeId && errors.reservationTypeId
                    ? "is-invalid"
                    : ""
                }`}
              >
                <option value="">Selecciona un tipo de tutoría</option>
                {tutorials.map((tutorial) => (
                  <option key={tutorial.id} value={tutorial.id}>
                    {tutorial.name}
                  </option>
                ))}
              </Field>
              <ErrorMessage
                name="reservationTypeId"
                component="p"
                className="invalid-feedback"
              />
            </div>
            <div className="mb-3">
              <label htmlFor="date_start" className="form-label">
                Fecha de inicio
              </label>
              <Field
                name="date_start"
                id="date_start"
                type="date"
                className={`form-control ${
                  touched.date_start && errors.date_start ? "is-invalid" : ""
                }`}
              />
              <ErrorMessage
                name="date_start"
                component="p"
                className="invalid-feedback"
              />
            </div>
            <div className="mb-3">
              <label htmlFor="date_end" className="form-label">
                Fecha de finalización
              </label>
              <Field
                name="date_end"
                id="date_end"
                type="date"
                className={`form-control ${
                  touched.date_end && errors.date_end ? "is-invalid" : ""
                }`}
              />
              <ErrorMessage
                name="date_end"
                component="p"
                className="invalid-feedback"
              />
            </div>

            <button
              type="submit"
              className="btn btn-dark"
              disabled={isSubmitting}
            >
              Reservar tutoría
            </button>
            {formSended && (
              <div className="alert alert-success" role="alert">
                Solicitud de tutoría enviada satisfactoriamente
              </div>
            )}
            {formSendedError && (
              <div className="alert alert-danger" role="alert">
                Hubo errores al enviar la información de la tutoría
              </div>
            )}
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default BookReserve;
