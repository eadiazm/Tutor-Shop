import React from "react";
import { Link } from "react-router-dom";
import {
  BsCalculator,
  BsPcDisplay,
  BsBook,
  BsGlobeAmericas,
  BsFlower3,
  BsTranslate,
} from "react-icons/bs";

const SignaturesStudents = () => {
  const data = [
    {
      title: <BsCalculator />,
      signature: "Matemáticas",
      description:
        "Desde álgebra hasta cálculo, nuestros expertos profesores te ayudarán a dominar las matemáticas.",
    },
    {
      title: <BsPcDisplay />,
      signature: "Informática",
      description:
        "Mejora tus habilidades en programación, bases de datos y más con nuestros tutores especializados.",
    },
    {
      title: <BsBook />,
      signature: "Lengua y Literatura",
      description:
        "Mejora tus habilidades de escritura, comprensión lectora y más con nuestros expertos en el área.",
    },
    {
      title: <BsGlobeAmericas />,
      signature: "Ciencias Sociales",
      description:
        "AriDomina las materias de historia, geografía, economía y más con nuestros tutores expertos.",
    },
    {
      title: <BsFlower3 />,
      signature: "Ciencias Naturales",
      description:
        "Mejora tus conocimientos en biología, química, física y más con nuestros tutores especializados.",
    },
    {
      title: <BsTranslate />,
      signature: "Idiomas",
      description:
        "Mejora tus habilidades en inglés, español, francés y más con nuestros tutores nativos.",
    },
  ];
  return (
    <>
      <h4 className="text-start my-5 pt-5">Materias disponibles </h4>
      <div className="container text-start">
        <div className="row row-cols-1 row-cols-md-2 row-cols-xl-3 justify-content-evenly gy-4 my-4">
          {data.map((info, index) => (
            <div
              key={index}
              className="col col-md-5 col-xl-3 m-1 my-3 card shadow"
              style={{ borderRadius: "1rem" }}
            >
              <div className="card-body py-4">
                <h5 className="card-title"> {info.title} </h5>
                <h6 className="card-subtitle mb-2 text-body-secondary">
                  {info.signature}
                </h6>
                <p className="card-text">{info.description}</p>
                <Link
                  to="/student/booktutoring"
                  className="card-link text-decoration-none"
                >
                  Más información
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default SignaturesStudents;
