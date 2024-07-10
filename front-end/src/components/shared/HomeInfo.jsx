import React from "react";

const HomeInfo = () => {
  return (
    <div className="container my-5 py-5 mb-xxl-0 text-center heightReserveinfo">
      <div className="row row-cols-1 row-cols-md-2 align-items-center align-items-lg-start gy-5 justify-content-evenly">
        <div className="col text-start margin-0 grid-gap col-xxl-5">
          <h2 className="font-size-sm font-size-md-up ">
            Reserva tutorías académicas con expertos
          </h2>
          <p className="fs-5">
            Mejora tus calificaciones y domina tus materias con la ayuda de
            tutores calificados en todas las áreas.
          </p>
          <div className="d-grid gap-2 d-md-block">
            <button
              className="btn btn-dark"
              onClick={() => (window.location.href = "#testimony")}
            >
              Testimonios
            </button>
          </div>
        </div>
        <figure
          className="col position-relative margin-top-0 col-xxl-6 order-xl-last"
          style={{ aspectRatio: "1/1" }}
        >
          <img
            src="/images/teachers.png"
            alt="teachers"
            className="img-fluid rounded imgHeight"
          />
        </figure>
      </div>
    </div>
  );
};

export default HomeInfo;
