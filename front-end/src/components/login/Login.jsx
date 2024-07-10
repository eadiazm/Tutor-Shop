import { Form, Formik, Field, ErrorMessage } from "formik";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { login } from "../features/userSlice";
import { fetchLogin } from "../services/api";

export function Login() {
  const dispatch = useDispatch();
  const [formSended, setFormSended] = useState(false);
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);

  useEffect(() => {
    if (formSended) {
      setTimeout(() => {
        setFormSended(false);

        if (user.isTutor) {
          navigate("../tutor/Dashboard");
        }
        if (user.isStudent) {
          navigate("../student/Dashboard");
        }
      }, 2000);
    }
  }, [formSended, user, navigate]);

  const validate = (values) => {
    const errors = {};
    const emailPattern = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;

    if (!values.email) {
      errors.email = "Ingresa el correo electrónico";
    } else if (!emailPattern.test(values.email)) {
      errors.email = "El correo electrónico ingresado es inválido";
    }

    if (!values.password) {
      errors.password = "Ingresa la contraseña";
    }

    return errors;
  };

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      const response = await fetchLogin(values);

      dispatch(login(response));
      setFormSended(true);

    } catch (error) {
      console.error("Error:", error);
      alert("Error en la autenticación");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Formik
      initialValues={{
        email: "",
        password: "",
      }}
      validate={validate}
      onSubmit={handleSubmit}
    >
      {({ errors, touched }) => (
        <div className="container p-5 height-container">
          <h1 className="text-center">
            <p>Ingresa a nuestra plataforma</p>
          </h1>
          <Form className="px-md-5 py-5">
            <div className="mb-3">
              <label htmlFor="email" className="form-label">
                Correo electrónico
              </label>
              <Field
                type="email"
                className={`form-control ${touched.email && errors.email ? "is-invalid" : ""
                  }`}
                id="email"
                name="email"
                aria-describedby="emailHelp"
                autoComplete="email"
              />
              <ErrorMessage
                name="email"
                component={() => (
                  <div className="invalid-feedback">{errors.email}</div>
                )}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="password" className="form-label">
                Contraseña
              </label>
              <Field
                type="password"
                className={`form-control ${touched.password && errors.password ? "is-invalid" : ""
                  }`}
                id="password"
                name="password"
                autoComplete="current-password"
              />
              <ErrorMessage
                name="password"
                component={() => (
                  <div className="invalid-feedback">{errors.password}</div>
                )}
              />
            </div>
            <button type="submit" className="btn btn-dark">
              Ingresar
            </button>
            {formSended && (
              <div className="alert alert-success" role="alert">
                Ingreso satisfactorio
              </div>
            )}
          </Form>
        </div>
      )}
    </Formik>
  );
}
