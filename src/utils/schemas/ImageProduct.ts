import * as yup from "yup"

export const ImageProductSchema = yup.object().shape({
    image: yup.string().required("Por favor ingrese la imagen del producto"),
    product: yup.number().required("Por favor ingrese el id del producto"),
})