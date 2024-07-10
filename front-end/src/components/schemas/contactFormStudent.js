import * as Yup from "yup";

export const contactFormStudent = Yup.object().shape({
  contactName: Yup.string()
    .matches(/^([ a-zA-ZñÑáéíóúÁÉÍÓÚ]).{2,254}/, "Solo se permiten letras")
    .required("Los nombres son requeridos"),
  contactEmail: Yup.string()
    .matches(
      /[a-zA-Z0-9_]+([.][a-zA-Z0-9_]+)*@[a-zA-Z0-9_]+([.][a-zA-Z0-9_]+)*[.][a-zA-Z]{2,5}/,
      "Ingrese un email válido"
    )
    .required("El email es requerido"),
  contactMessage: Yup.string().required("El mensaje es requerido"),
});
