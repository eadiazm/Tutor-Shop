import React from "react";

const BookTutors = () => {
  const dataTutors = [
    {
      img: "/images/profileTutors.png",
      name: "John Doe",
      signature: "Matemáticas",
      description:
        "John es un experto en matemáticas con más de 5 años de experiencia en tutorías. Ayuda a sus estudiantes a dominar conceptos clave y mejorar su rendimiento.",
    },
    {
      img: "/images/profileTutors.png",
      name: "Sarah Anderson",
      signature: "Física",
      description:
        "Sarah es una tutora de física con un enfoque práctico y personalizado. Ayuda a sus estudiantes a comprender los conceptos clave y aplicarlos en la resolución de problemas.",
    },
    {
      img: "/images/profileTutors.png",
      name: "Emily Martinez",
      signature: "Química",
      description:
        "Emily es una tutora de química con una amplia experiencia en la enseñanza de conceptos complejos de manera clara y accesible.",
    },
  ];
  return (
    <div className="container mb-5">
      <h2 id="bookTutors">Conoce a nuestros tutores</h2>
      <div className=" row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4 mt-3 mx-auto widthBookTutors justify-content-evenly">
        {dataTutors.map((tutor, index) => (
          <div
            key={index}
            className="card shadow col text-center p-4 col-md-5 col-lg-3 justify-content-between"
          >
            <picture>
              <img
                src={tutor.img}
                alt={`foto de ${tutor.name}`}
                style={{ height: "100px" }}
              />
            </picture>
            <div>
              <p>{tutor.signature} </p>
              <p> {tutor.description} </p>
            </div>
            <p></p>
            <button className="btn btn-dark">Reservar tutoria</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BookTutors;
