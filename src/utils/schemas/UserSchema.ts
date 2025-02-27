import * as Yup from "yup"

export const UserSchema = Yup.object().shape({
  firstName: Yup.string().required("Por favor ingrese el nombre"),
  lastName: Yup.string().required("Por favor ingrese el apellido"),
  phone: Yup.string().required("Por favor ingrese el telefono"),
  email: Yup.string().required("Por favor ingrese el email"),
  password: Yup.string().required("Por favor ingrese la contraseña"),
})

export const ValidateCodeSchema = Yup.object().shape({
  code: Yup.string().required("Por favor ingrese el codigo"),
  email: Yup.string().required("Por favor ingrese el email"),
})

export const ResetPasswordSchema = Yup.object().shape({
  email: Yup.string().required("Por favor ingrese el email"),
  code: Yup.string().required("Por favor ingrese el codigo"),
  password: Yup.string().required("Por favor ingrese la contraseña"),
  confirmPassword: Yup.string().required("Por favor confirme la contraseña"),
})
