import * as yup from "yup"

export const ContactSchema = yup.object().shape({
    description: yup.string().required("Por favor ingrese su consulta"),
})