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
import { Producto } from "@/interfaces/Product"
import { postProduct, putProduct } from "@/services/ProductService"
import { ProductSchema } from "@/utils/schemas/ProductSchema"
import { useMutation } from "@tanstack/react-query"
import { useFormik } from "formik"

export interface ProductForm {
  name: string
  image: string
  description: string
  price: number
  category: string
}
interface ChangeProductProps {
  product: Producto | undefined
}
const ChangeProduct = ({ product }: ChangeProductProps) => {
  const mutation = useMutation({
    mutationFn: (values: ProductForm) => {
      if (product) return putProduct(values, product.id)
      return postProduct(values)
    },
    onSuccess: (data) => {
      console.log(data)
    }
  })
  const formik = useFormik({
    initialValues: {
      name: product ? product.name : "",
      image: product ? product.image : "",
      description: product ? product.description : "",
      price: product ? product.price : 0,
      category: product ? product.CategoryName : ""
    },
    validationSchema: ProductSchema,
    onSubmit: (values) => {
      mutation.mutate(values)
      console.log(values)
    }
  })
  console.log(product)

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
                  <b>Imagen</b>
                </Label>
                <Input
                  type="text"
                  className="form-control mt-2"
                  placeholder="Ingrese imagen"
                  {...formik.getFieldProps("image")}
                />
                {formik.touched.image && formik.errors.image && (
                  <small className="font-bold text-[#ff4444]">
                    {formik.errors.image}
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
                {/* <select
                  name="CategoryName"
                  className="form-control"
                >
                  <option value="">Selecciona una categoría</option>
                  <option >
                    <h1>{ category.name }</h1>
                  </option>
                </select> */}
                <Select>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Selecciona una categoría" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="light">Light</SelectItem>
                    <SelectItem value="dark">Dark</SelectItem>
                    <SelectItem value="system">System</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="row mb-3 mt-2 text-center">
                <div className="col-lg-6">
                  {/* <Button className="btn boton" routerLink="/admins/productos">
                    Volver
                  </Button> */}
                </div>
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
export default ChangeProduct
