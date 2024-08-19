import *as Yup from "yup"


export const loginSchema = Yup.object().shape({
    email: Yup.string().email("Por favor ingrese un correo valido").required("Por favor ingrese su correo"),
    password: Yup.string().required("Por favor ingrese su contraseña")
})