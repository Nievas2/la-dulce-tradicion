"use client"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  SelectTrigger,
  Select,
  SelectValue,
  SelectItem,
  SelectContent,
} from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Category } from "@/interfaces/Category"
import { Product } from "@/interfaces/Product"
import { getCategories } from "@/services/CategoryService"
import { postProduct, putProduct } from "@/services/ProductService"
import { ProductSchema } from "@/utils/schemas/ProductSchema"
import { useMutation, useQuery } from "@tanstack/react-query"
import { useFormik } from "formik"
import { useState } from "react"
import ChangeImageProduct from "../../imageproduct/(components)/ChangeImageProduct"
import ChangeSubCategoryProduct from "../../subcategories/(components)/ChangeSubCategory"

export interface ProductForm {
  name: string
  description: string
  price: number
  CategoryName: string
}
interface ChangeProductProps {
  product: Product | undefined
  lastId?: number
}
const ChangeProduct = ({ product, lastId }: ChangeProductProps) => {
  const [step, setStep] = useState(0)

  const categories = [
    { id: 1, name: "Pasteleria" },
    { id: 2, name: "Lunch" },
    { id: 3, name: "perniles y carnes" },
    { id: 4, name: "Tortas" },
    { id: 5, name: "Agregados y especiales" },
    { id: 6, name: "Combos" },
    { id: 7, name: "Eventos y servicios" },
  ]

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
      if (product) {
        return setStep(3)
      }
      setStep(1)
      formik.resetForm()
    },
    onError: (error) => {
      console.log(error)
    },
  })

  const formik = useFormik({
    initialValues: {
      name: product ? product.name : "",
      description: product ? product.description : "",
      price: product ? product.price : 0,
      CategoryName: product ? product.Category.name : "",
    },
    validationSchema: ProductSchema,
    onSubmit: (values) => {
      mutation.mutate(values)
    },
  })

  function handleChangeCategory(value: string) {
    formik.setFieldValue("CategoryName", value)
  }
  return (
    <>
      <div className="flex flex-col mt-3 offset-lg-2">
        <div className="text-white">
          {step == 0 && (
            <form
              className="flex flex-1 flex-col p-4 gap-4"
              onSubmit={formik.handleSubmit}
            >
              <div className="flex flex-col gap-2 items-start">
                <Label>Nombre</Label>
                <Input
                  type="text"
                  placeholder="Ingrese Nombre"
                  {...formik.getFieldProps("name")}
                />
                {formik.touched.name && formik.errors.name && (
                  <small className="font-bold text-[#ff4444]">
                    {formik.errors.name}
                  </small>
                )}
              </div>

              <div className="flex flex-col gap-2 items-start">
                <Label>Precio</Label>
                <Input
                  type="number"
                  className=" mt-2"
                  placeholder="Ingrese el precio"
                  {...formik.getFieldProps("price")}
                />
                {formik.touched.price && formik.errors.price && (
                  <small className="font-bold text-[#ff4444]">
                    {formik.errors.price}
                  </small>
                )}
              </div>
              <div className="flex flex-col gap-2 items-start">
                <Label>Descripción</Label>
                <Textarea
                  className=" mt-2"
                  placeholder="Ingrese descripcion"
                  {...formik.getFieldProps("description")}
                />
                {formik.touched.description && formik.errors.description && (
                  <small className="font-bold text-[#ff4444]">
                    {formik.errors.description}
                  </small>
                )}
              </div>
              <div className="flex flex-col gap-2 items-start">
                <Label>Nombre de la categoria</Label>
                <Select
                  onValueChange={(values) => handleChangeCategory(values)}
                  defaultValue={formik.values.CategoryName}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Selecciona una categoría" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((category: any) => (
                      <SelectItem
                        key={crypto.randomUUID()}
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

              <div className="flex flex-col gap-2 items-start mt-2 text-center">
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
          )}
          {step == 1 && (
            <div>
              {!product && (
                <ChangeImageProduct
                  Product={lastId ? lastId + 1 : undefined}
                  image={undefined}
                  imageId={undefined}
                  setStep={setStep}
                />
              )}
            </div>
          )}
          {step == 2 && (
            <ChangeSubCategoryProduct
              Product={lastId ? lastId + 1 : undefined}
              setStep={setStep}
            />
          )}
          {step == 3 && (
            <>
              {product ? (
                <div className="flex flex-col justify-center items-center">
                  <h4 className="text-black">
                    Producto actualizado correctamente
                  </h4>
                </div>
              ) : (
                <div className="flex flex-col justify-center items-center">
                  <h4 className="text-black">Todo cargado correctamente</h4>
                  <Button variant="main" onClick={() => setStep(0)}>
                    Cargar más
                  </Button>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </>
  )
}
export default ChangeProduct
