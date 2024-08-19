import * as yup from "yup"

export const SubCategorySchema = yup.object().shape({
    date: yup.string().required("Por favor ingrese el nombre de la categoria"),
    price: yup.number().required("Por favor ingrese el precio de la categoria"),
    product: yup.number().required("Por favor ingrese el id del producto"),
})