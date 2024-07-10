import React from "react";

const dataTestimony = [
  {
    testimony:
      "“Gracias a la tutoría de Alejandro, pude mejorar mis calificaciones en matemáticas y entender conceptos que me costaban mucho.”",
    name: "María Gómez",
    subject: "Estudiante de Ingeniería",
  },
  {
    testimony:
      "“Mis tutorías con Sofía me ayudaron a mejorar mi redacción y a entender mejor los temas de literatura. ¡Recomiendo este servicio!”",
    name: "Juan Pérez",
    subject: "Estudiante de Letras",
  },
  {
    testimony:
      "”Gracias a las tutorías con Juanita, pude mejorar mi comprensión en química y dominar conceptos difíciles. No dudaría en recomendar este apoyo académico!”",
    name: "Manuela Córdoba",
    subject: "Estudiante de química",
  },
  {
    testimony:
      "“Gracias a las tutorías con Ana, logré perfeccionar mis habilidades en física y resolver problemas con mayor facilidad. ¡Este servicio es altamente recomendable!”",
    name: "Pablo Muñoz",
    subject: "Estudiante de física",
  },
];

export const HomeTestimony = () => {
  return (
    <div className="container text-center" id="testimony">
      <div className="mt-5">
        <p className="back-color mb-5 p-testimony">Testimonios</p>
        <h2 className="mb-5 font-h2-testimony">
          Lo que dicen nuestros estudiantes
        </h2>
      </div>
      <div className="row row-cols-1 row-cols-xl-2">
        {dataTestimony.map((data, index) => (
          <div key={index}>
            <p className="font-p1-testimony">{data.testimony}</p>
            <p className="fw-bolder">{data.name} </p>
            <p className="fw-light">{data.subject} </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HomeTestimony;
