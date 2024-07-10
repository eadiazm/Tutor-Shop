import React from "react";
import { Link } from "react-router-dom";

const ServicesStudent = () => {
  return (
    <>
      <h4 className="text-start my-5 pt-5" style={{ marginTop: "80px" }}>
        Nuestros servicios
      </h4>
      <div className="container text-start mb-5 pb-5">
        <div className="row row-cols-1 row-cols-md-2 justify-content-evenly gy-4">
          <div
            className="card col col-md-5 shadow"
            style={{ borderRadius: "1rem" }}
          >
            <div className="card-body py-4">
              <h5 className="card-title">Card title</h5>
              <h6 className="card-subtitle mb-2 text-body-secondary">
                Tutoría Individual
              </h6>
              <p className="card-text">
                Recibe atención personalizada de nuestros expertos profesores
                para mejorar tu rendimiento académico.
              </p>
              <Link
                to="/student/booktutoring"
                className="card-link text-decoration-none"
              >
                Más información
              </Link>
            </div>
          </div>
          <div
            className="card col col-md-5  shadow"
            style={{ borderRadius: "1rem" }}
          >
            <div className="card-body py-4">
              <h5 className="card-title">Card title</h5>
              <h6 className="card-subtitle mb-2 text-body-secondary">
                Tutoría en Grupo
              </h6>
              <p className="card-text">
                Trabaja en equipo con tus compañeros y recibe apoyo de nuestros
                profesores expertos.
              </p>
              <Link
                to="/student/booktutoring"
                className="card-link text-decoration-none"
              >
                Más información
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ServicesStudent;
