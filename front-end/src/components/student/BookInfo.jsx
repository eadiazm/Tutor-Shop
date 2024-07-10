import React from "react";

const BookInfo = () => {
  return (
    <div className="container my-5 py-5 text-center heightReserveinfo">
      <div className="row row-cols-1 row-cols-md-2 align-items-center gy-5">
        <div className="col text-start" >
          <h2 className="font-size-sm font-size-md-up">
            Mejora tu rendimiento académico con nuestras tutorías
          </h2>
          <p className="fs-5">
            Nuestros tutores expertos te ayudarán a dominar tus materias y
            alcanzar tus metas académicas.
          </p>
          <div className="d-grid gap-2 d-md-block">
            <button
              className="btn btn-dark"
              onClick={() => (window.location.href = "#bookReserve")}
            >
              Reservar tutoria
            </button>
          </div>
        </div>
        <figure className="col position-relative">
          <img
            src="/images/teachers.png"
            alt="teachers"
            className="img-fluid rounded "
          />

          <button
            className="btn btn-dark btn-lg position-absolute top-90"
            onClick={() => (window.location.href = "#bookTutors")}
          >
            Tutores
          </button>
        </figure>
      </div>
    </div>
  );
};

export default BookInfo;
