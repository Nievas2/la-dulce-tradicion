import *as yup from "yup"


export const CategorySchema = yup.object().shape({
    name: yup.string().required("Por favor ingrese el nombre de la categoria"),
})