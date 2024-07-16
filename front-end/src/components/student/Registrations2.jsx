import React, { useContext } from "react";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { useSelector } from "react-redux";
import { secondForm } from "../schemas/studentSecondForm";
import StudentContext from "./StudentRegistrationProvider";

const Registrations2 = () => {
  const props = useContext(StudentContext);
  //StatusEnum

  const { dataStudentForm2 } = useSelector((store) => store.infoStudentForm);
  const {
    dataForm: { names, lastNames, typeDocument, email, numberDocument, gender },
  } = useSelector((store) => store.infoStudentForm);

  const onSubmit = (values) => {
    const {
      birthdate,
      department,
      cityId,
      phone,
      password,
      passwordConfirm,
      // dataTreatment,
    } = values;
    const sendData = {
      names,
      lastNames,
      typeDocument,
      birthdate,
      gender,
      numberDocument,
      phone,
      department,
      cityId,
      email,
      password,
      passwordConfirm,
      // dataTreatment,
    };
    props.handleSubmit(sendData);
  };

  return (
    <>
      <div className="container height-container">
        <h1 className="text-center mt-3">
          <p>Continúa con el registro</p>
        </h1>
        <h6 className="text-center">
          <p>
            Completa el formulario para unirte como estudiante a nuestra
            plataforma educativa
          </p>
        </h6>
        <Formik
          initialValues={dataStudentForm2}
          onSubmit={(values, actions) => {
            actions.setSubmitting(false);
            onSubmit(values);
          }}
          validationSchema={secondForm}
        >
          {({ errors, touched, isSubmitting, setFieldValue }) => (
            <Form className=" needs-validation" noValidate>
              <div className="mb-3">
                <label htmlFor="birthdate" className="form-label">
                  Fecha de nacimiento
                </label>
                <Field
                  name="birthdate"
                  id="birthdate"
                  type="date"
                  className={`form-control ${
                    touched.birthdate && errors.birthdate ? "is-invalid" : ""
                  }`}
                  autoFocus
                />
                <ErrorMessage
                  name="birthdate"
                  component="p"
                  className="invalid-feedback"
                />
              </div>
              <div className="mb-3">
                <label htmlFor="department" className="form-label">
                  Departamento de residencia
                </label>
                <Field
                  name="department"
                  id="department"
                  as="select"
                  className={`form-control ${
                    touched.department && errors.department ? "is-invalid" : ""
                  }`}
                  onChange={(e) => {
                    props.handleDepartmentChange(e);
                    // Actualizar el valor del campo 'department' en Formik
                    setFieldValue("department", e.target.value);
                  }}
                >
                  <option value=""> Selecciona una departamento</option>
                  {props.departments.map((dept) => (
                    <option key={dept.id} value={dept.id}>
                      {dept.name}
                    </option>
                  ))}
                </Field>
                <ErrorMessage
                  name="department"
                  component="p"
                  className="invalid-feedback"
                />
              </div>
              <div className="mb-3">
                <label htmlFor="cityId" className="form-label">
                  Ciudad
                </label>
                <Field
                  name="cityId"
                  id="cityId"
                  as="select"
                  className={`form-control ${
                    touched.cityId && errors.cityId ? "is-invalid" : ""
                  }`}
                >
                  <option value=""> Selecciona una ciudad</option>
                  {props.cities.map((city) => (
                    <option key={city.id} value={city.id}>
                      {city.name}
                    </option>
                  ))}
                </Field>
                <ErrorMessage
                  name="cityId"
                  component="p"
                  className="invalid-feedback"
                />
              </div>
              <div className="mb-3">
                <label htmlFor="phone">Número de celular</label>
                <Field
                  name="phone"
                  id="phone"
                  type="text"
                  className={`form-control ${
                    touched.phone && errors.phone ? "is-invalid" : ""
                  }`}
                />
                <ErrorMessage
                  name="phone"
                  component="p"
                  className="invalid-feedback"
                />
              </div>
              <div className="mb-3">
                <label htmlFor="password"> Contraseña</label>
                <Field
                  name="password"
                  id="password"
                  type="password"
                  className={`form-control ${
                    touched.password && errors.password ? "is-invalid" : ""
                  }`}
                />
                <ErrorMessage
                  name="password"
                  component="p"
                  className="invalid-feedback"
                />
              </div>
              <div className="mb-3">
                <label htmlFor="passwordConfirm" className="form-label">
                  Confirme la contraseña
                </label>
                <Field
                  name="passwordConfirm"
                  id="passwordConfirm"
                  type="password"
                  className={`form-control ${
                    touched.passwordConfirm && errors.passwordConfirm
                      ? "is-invalid"
                      : ""
                  }`}
                />
                <ErrorMessage
                  name="passwordConfirm"
                  component="p"
                  className="invalid-feedback"
                />
              </div>
              <div className="mb-3 form-check">
                <Field
                  name="dataTreatment"
                  id="dataTreatment"
                  type="checkbox"
                  className={`form-check-input ${
                    touched.dataTreatment && errors.dataTreatment
                      ? "is-invalid"
                      : ""
                  }`}
                />
                <label className="form-check-label" htmlFor="dataTreatment">
                  Acepta el tratamiento de datos
                </label>
                <ErrorMessage
                  name="dataTreatment"
                  component="p"
                  className="invalid-feedback"
                />
              </div>
              <button
                type="submit"
                className="btn btn-dark mb-5"
                disabled={isSubmitting}
              >
                Enviar
              </button>
              {props.formSended && (
                <div className="alert alert-success" role="alert">
                  Información enviada satisfactoriamente
                </div>
              )}
              {props.formSendedError && (
                <div className="alert alert-danger" role="alert">
                  Hubo errores al enviar la información del estudiante
                </div>
              )}
            </Form>
          )}
        </Formik>
      </div>
    </>
  );
};

export default Registrations2;
