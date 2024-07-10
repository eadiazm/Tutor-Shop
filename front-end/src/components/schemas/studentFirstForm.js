import * as Yup from "yup";

export const firstForm = Yup.object().shape({
  names: Yup.string()
    .matches(/^([ a-zA-ZñÑáéíóúÁÉÍÓÚ]).{2,254}/, "Solo se permiten letras")
    .required("Los nombres son requeridos"),
  lastNames: Yup.string()
    .matches(/^([ a-zA-ZñÑáéíóúÁÉÍÓÚ]).{2,254}/, "Solo se permiten letras")
    .required("Los apellidos son requeridos"),
  typeDocument: Yup.string().required("Debe seleccionar un tipo de documento"),
  numberDocument: Yup.string()
    .matches(/^([0-9]).{1,20}$/, "Ingrese un identificación válida")
    .required("El número de documento es requerido"),
  email: Yup.string()
    .matches(
      /[a-zA-Z0-9_]+([.][a-zA-Z0-9_]+)*@[a-zA-Z0-9_]+([.][a-zA-Z0-9_]+)*[.][a-zA-Z]{2,5}/,
      "Ingrese un email válido"
    )
    .required("El email es requerido"),
  gender: Yup.string().required("Esta opción es requerida"),
});
