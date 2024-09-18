"use client"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  SelectTrigger,
  Select,
  SelectValue,
  SelectItem,
  SelectContent
} from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Category } from "@/interfaces/Category"
import { Producto } from "@/interfaces/Product"
import { getCategories } from "@/services/CategoryService"
import { postProduct, putProduct } from "@/services/ProductService"
import { ProductSchema } from "@/utils/schemas/ProductSchema"
import { useMutation, useQuery } from "@tanstack/react-query"
import { useFormik } from "formik"
import { useState } from "react"
import ChangeImageProduct from "../../imageproduct/(components)/ChangeImageProduct"

export interface ProductForm {
  name: string
  description: string
  price: number
  CategoryName: string
}
interface ChangeProductProps {
  product: Producto | undefined
  lastId ?: number
}
const ChangeProduct = ({ product, lastId }: ChangeProductProps) => {
  const [finished, setFinished] = useState(false)
  const {
    data: categories,
    error,
    isPending
  } = useQuery({
    queryKey: ["categories"],
    queryFn: getCategories,
    refetchOnWindowFocus: false,
    staleTime: 1000 * 60 * 60 * 24
  })

  const mutation = useMutation({
    mutationFn: (values: ProductForm) => {
      if (product) {
        console.log("put")

        return putProduct(values, product.id)
      }
      console.log("post")

      return postProduct(values)
    },
    onSuccess: (data) => {
      setFinished(true)
      console.log(data)
    },
    onError: (error) => {
      setFinished(false)
      console.log(error)
    }
  })

  const formik = useFormik({
    initialValues: {
      name: product ? product.name : "",
      description: product ? product.description : "",
      price: product ? product.price : 0,
      CategoryName: product ? product.Category.name : ""
    },
    validationSchema: ProductSchema,
    onSubmit: (values) => {
      mutation.mutate(values)
    }
  })

  function handleChangeCategory(value: string) {
    formik.setFieldValue("CategoryName", value)
  }
  return (
    <>
      <div className="flex flex-col mb-3 mt-3 offset-lg-2">
        <div className="text-white mb-3">
          {!finished ? (
            <form
              className="flex flex-1 flex-col p-4"
              onSubmit={formik.handleSubmit}
            >
              <div className="row mb-3">
                <Label className="form-Label mb-0 p-0">
                  <b>Nombre</b>
                </Label>
                <Input
                  type="text"
                  className="form-control"
                  placeholder="Ingrese Nombre"
                  {...formik.getFieldProps("name")}
                />
                {formik.touched.name && formik.errors.name && (
                  <small className="font-bold text-[#ff4444]">
                    {formik.errors.name}
                  </small>
                )}
              </div>
              
              <div className="row mb-3">
                <Label className="form-Label mb-0 p-0">
                  <b>Precio</b>
                </Label>
                <Input
                  type="number"
                  className="form-control mt-2"
                  placeholder="Ingrese el precio"
                  {...formik.getFieldProps("price")}
                />
                {formik.touched.price && formik.errors.price && (
                  <small className="font-bold text-[#ff4444]">
                    {formik.errors.price}
                  </small>
                )}
              </div>
              <div className="row mb-3">
                <Label className="form-Label mb-0 p-0">
                  <b>Descripción</b>
                </Label>
                <Textarea
                  className="form-control mt-2"
                  placeholder="Ingrese descripcion"
                  {...formik.getFieldProps("description")}
                />
                {formik.touched.description && formik.errors.description && (
                  <small className="font-bold text-[#ff4444]">
                    {formik.errors.description}
                  </small>
                )}
              </div>
              <div className="row mb-3">
                <Label className="form-Label mb-0 p-0">
                  <b>Nombre de la categoria</b>
                </Label>
                <Select
                  onValueChange={(values) => handleChangeCategory(values)}
                  defaultValue={formik.values.CategoryName}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Selecciona una categoría" />
                  </SelectTrigger>
                  <SelectContent>
                    {!error &&
                      categories &&
                      !isPending &&
                      categories?.data.map((category: Category) => (
                        <SelectItem
                          key={category.id}
                          value={category.name}
                        >
                          {category.name}
                        </SelectItem>
                      ))}
                  </SelectContent>
                </Select>
                {formik.touched.CategoryName && formik.errors.CategoryName && (
                  <small className="font-bold text-[#ff4444]">
                    {formik.errors.CategoryName}
                  </small>
                )}
              </div>
              {error && <small>{error.message}</small>}
              <div className="row mb-3 mt-2 text-center">
                <div className="col-lg-6">
                  <Button
                    type="submit"
                    className="btn boton"
                    variant="secondary"
                  >
                    Aceptar
                  </Button>
                </div>
              </div>
            </form>
          ) : (
            <div>
              {!product && (
                <ChangeImageProduct
                  Product={lastId + 1}
                  image={undefined}
                  imageId={undefined}
                />
              )}
            </div>
          )}
        </div>
      </div>
    </>
  )
}
export default ChangeProduct
