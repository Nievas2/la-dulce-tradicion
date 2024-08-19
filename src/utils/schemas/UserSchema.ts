import *as Yup from "yup"


export const UserSchema = Yup.object().shape({
    firstName: Yup.string().required("Por favor ingrese el nombre"),
    lastName: Yup.string().required("Por favor ingrese el apellido"),
    phone: Yup.string().required("Por favor ingrese el telefono"),
    email: Yup.string().required("Por favor ingrese el email"),
    password: Yup.string().required("Por favor ingrese la contraseña"),
})