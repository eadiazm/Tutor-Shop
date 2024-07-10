import * as Yup from "yup";

export const secondForm = Yup.object().shape({
  birthdate: Yup.string().required("La fecha de nacimiento es requerida"),
  department: Yup.string().required(
    "Debe seleccionar el departamento de residencia"
  ),
  cityId: Yup.string().required("Debe seleccionar la ciudad de residencia"),
  phone: Yup.number()
    .typeError("Solo se permiten números")
    .min(1)
    .required("Teléfono es requerido"),
  password: Yup.string()
    .required("La contraseña es requerida.")
    .min(8, "La contraseña debe contener mínimo 8 caracteres."),
  passwordConfirm: Yup.string()
    .oneOf([Yup.ref("password"), null], "Las contraseñas deben coincidir.")
    .required("La confirmación es requerida."),
  dataTreatment: Yup.bool()
    .oneOf([true], "Debe aceptar los términos y condiciones")
    .required("La confirmación es requerida."),
});
