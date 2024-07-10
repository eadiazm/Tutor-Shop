import React, { useContext } from "react";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { firstForm } from "../schemas/studentFirstForm";
import { useNavigate } from "react-router-dom";
import { addInfo } from "../features/studentFormSlice";
import StudentContext from "./StudentRegistrationProvider";

const Registrations = () => {
  const props = useContext(StudentContext);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { dataStudentForm1 } = useSelector((store) => store.infoStudentForm);

  const onSubmit = (values) => {
    dispatch(addInfo(values));
    navigate("/student/registration2");
  };

  return (
    <>
      <div className="container height-container">
        <h1 className="text-center">
          <p>Regístrate como estudiante</p>
        </h1>
        <h6 className="text-center">
          <p>
            Completa el formulario para unirte como estudiante a nuestra
            plataforma educativa
          </p>
        </h6>
        <Formik
          initialValues={dataStudentForm1}
          onSubmit={(values, actions) => {
            onSubmit(values);
            actions.setSubmitting(false);
          }}
          validationSchema={firstForm}
        >
          {({ errors, touched, isSubmitting }) => (
            <Form className=" needs-validation" noValidate>
              <div className="mb-3">
                <label htmlFor="names" className="form-label">
                  Nombres
                </label>
                <Field
                  name="names"
                  id="names"
                  type="text"
                  className={`form-control ${
                    touched.names && errors.names ? "is-invalid" : ""
                  }`}
                  autoFocus
                />
                <ErrorMessage name="names" component="p" />
              </div>
              <div className="mb-3">
                <label htmlFor="lastNames" className="form-label">
                  Apellidos
                </label>
                <Field
                  name="lastNames"
                  id="lastNames"
                  type="text"
                  className={`form-control ${
                    touched.lastNames && errors.lastNames ? "is-invalid" : ""
                  }`}
                />
                <ErrorMessage name="lastNames" component="p" />
              </div>
              <div className="mb-3">
                <label htmlFor="typeDocument">Tipo de documento</label>
                <Field
                  name="typeDocument"
                  id="typeDocument"
                  as="select"
                  className={`form-control ${
                    touched.typeDocument && errors.typeDocument
                      ? "is-invalid"
                      : ""
                  }`}
                >
                  <option value="">Selecciona un tipo de documento</option>
                  {props.typeDocuments.map((docType) => (
                    <option key={docType.id} value={docType.id}>
                      {docType.name}
                    </option>
                  ))}
                </Field>
                <ErrorMessage name="typeDocument" component="p" />
              </div>
              <div className="mb-3">
                <label htmlFor="numberDocument"> Número de documento</label>
                <Field
                  name="numberDocument"
                  id="numberDocument"
                  type="text"
                  className={`form-control ${
                    touched.numberDocument && errors.numberDocument
                      ? "is-invalid"
                      : ""
                  }`}
                />
                <ErrorMessage name="numberDocument" component="p" />
              </div>
              <div className="mb-3">
                <label htmlFor="email" className="form-label">
                  Correo electrónico
                </label>
                <Field
                  name="email"
                  id="email"
                  type="email"
                  className={`form-control ${
                    touched.email && errors.email ? "is-invalid" : ""
                  }`}
                />
                <ErrorMessage name="email" component="p" />
              </div>
              <div className="mb-3">
                <label htmlFor="gender" className="form-label">
                  Género
                </label>
                <Field
                  name="gender"
                  id="gender"
                  as="select"
                  className={`form-control ${
                    touched.gender && errors.gender ? "is-invalid" : ""
                  }`}
                >
                  <option value="">Selecciona un género</option>
                  {props.genders.map((gen) => (
                    <option key={gen.id} value={gen.id}>
                      {gen.name}
                    </option>
                  ))}
                </Field>
                <ErrorMessage
                  name="gender"
                  component="p"
                  className="container__message-error"
                />
              </div>

              <button
                type="submit"
                className="btn btn-primary"
                disabled={isSubmitting}
              >
                Siguiente
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </>
  );
};

export default Registrations;
