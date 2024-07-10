import React from "react";

const HomeSubjects = () => {
  return (
    <div className="container-subjects back-color">
      <div className="container">
        <div className="text-center p-5">
          <p>Nuestros Tutores</p>
          <h2 className="font-h2">Expertos en todas las áreas</h2>
          <p className="font-p" style={{ fontWeight: 300 }}>
            Nuestros tutores son profesionales altamente calificados en sus
            respectivas áreas, con años de experiencia en la enseñanza y el
            apoyo académico.
          </p>
        </div>
        <div className="row row-cols-xl-3 heigthSubjects">
          <div className=" container row-cols-1 row-cols-xl-4 heigthSubjects">
            <div className="col col-xl-12">
              <p className="mb-2 fw-bolder">Matemáticas</p>
              <p>Álgebra, Geometría, Cálculo y más.</p>
            </div>
            <div className="col col-xl-12">
              <p className="mb-2 fw-bolder">Ciencias</p>
              <p>Física, Química, Biología y más.</p>
            </div>
            <div className="col col-xl-12">
              <p className="mb-2 fw-bolder">Humanidades</p>
              <p>Historia, Literatura, Filosofía y más.</p>
            </div>
          </div>
          <figure className="figureHeight row-cols-xl-4 heigthSubjects order-xl-last">
            <img
              src="/images/homepage.png"
              alt="students"
              className="img-fluid rounded imgSubjects"
            />
          </figure>
          <div className=" container row-cols-1 row-cols-xl-4 justify-conter-between heigthSubjects">
            <div className="col col-xl-12">
              <p className="mb-2 fw-bolder">Idiomas</p>
              <p>Inglés, Español, Francés y más.</p>
            </div>
            <div className="col col-xl-12">
              <p className="mb-2 fw-bolder">Tecnología</p>
              <p>Programación, Diseño, Redes y más.</p>
            </div>
            <div className="col col-xl-12">
              <p className="mb-2 fw-bolder">Negocios</p>
              <p>Contabilidad, Finanzas, Marketing y más.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeSubjects;
