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
import {
  getImageProductById,
  postImageProduct,
  putImageProduct
} from "@/services/ImageProduct"
import { postProduct, putProduct } from "@/services/ProductService"
import { ImageProductSchema } from "@/utils/schemas/ImageProduct"
import { ProductSchema } from "@/utils/schemas/ProductSchema"
import { useMutation, useQuery } from "@tanstack/react-query"
import { useFormik } from "formik"
import { useState } from "react"

export interface ImageProductForm {
  Product: number
  image: string
}
interface ChangeProductProps {
  Product: number | undefined
  image: string | undefined
}
const ChangeImageProduct = ({ Product, image }: ChangeProductProps) => {
  const [error, setError] = useState("")

  const { data } = useQuery({
    queryKey: ["productImageById"],
    queryFn: () => {
      if (Product) return getImageProductById(Product)
    }
  })
  const mutation = useMutation({
    mutationFn: (values: ImageProductForm) => {
      if (image) {
        console.log("put")

        return putImageProduct(values.image, data?.data.id)
      }
      console.log("post")

      return postImageProduct(values)
    },
    onSuccess: (data) => {
      console.log(data)
    },
    onError: (error) => {
      setError(error.message)
      console.log(error)
    }
  })

  const formik = useFormik({
    initialValues: {
      Product: Product ? Product : 0,
      image: image ? image : ""
    },
    validationSchema: ImageProductSchema,
    onSubmit: (values) => {
      mutation.mutate(values)
      console.log(values)
    }
  })
  return (
    <>
      <div className="flex flex-col mb-3 mt-3 offset-lg-2">
        <div className="text-white mb-3">
          <div className="">
            <form
              className="flex flex-1 flex-col p-4"
              onSubmit={formik.handleSubmit}
            >
              <div className="row mb-3">
                <Label className="form-Label mb-0 p-0">
                  <b>Imagen</b>
                </Label>
                <Input
                  type="text"
                  className="form-control mt-2"
                  placeholder="Ingrese el id del producto"
                  {...formik.getFieldProps("image")}
                />
                {formik.touched.image && formik.errors.image && (
                  <small className="font-bold text-[#ff4444]">
                    {formik.errors.image}
                  </small>
                )}
              </div>
              {!image && (
                <div className="row mb-3">
                  <Label className="form-Label mb-0 p-0">
                    <b>Product</b>
                  </Label>
                  <Input
                    type="number"
                    className="form-control mt-2"
                    placeholder="Ingrese imagen"
                    {...formik.getFieldProps("Product")}
                  />
                  {formik.touched.Product && formik.errors.Product && (
                    <small className="font-bold text-[#ff4444]">
                      {formik.errors.Product}
                    </small>
                  )}
                </div>
              )}
              {error && <small>{error}</small>}
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
          </div>
        </div>
      </div>
    </>
  )
}
export default ChangeImageProduct
