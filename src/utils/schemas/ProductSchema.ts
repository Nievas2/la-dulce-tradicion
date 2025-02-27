import * as yup from "yup"

export const ProductSchema = yup.object().shape({
  name: yup.string().required("Por favor ingrese el nombre del producto"),
  description: yup
    .string()
    .required("Por favor ingrese la descripción del producto"),
  price: yup.number().nullable(),
  CategoryName: yup.string().required("Por favor ingrese el nombre de la categoria")
})
