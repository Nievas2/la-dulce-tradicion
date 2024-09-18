"use client"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { CategorySchema } from "@/utils/schemas/CategorySchema"
import { useFormik } from "formik"
import { useMutation } from "@tanstack/react-query"
import { postCategory } from "@/services/CategoryService"
import { Button } from "@/components/ui/button"
export interface CategoryForm {
  name: string
  image: string
}
const page = () => {
  const mutation = useMutation({
    mutationFn: (values: CategoryForm) => postCategory(values),
    onSuccess: (data) => {
      console.log(data)
    },
    onError: (error) => {
      console.log(error)
    }
  })
  const formik = useFormik({
    initialValues: {
      name: "",
      image: ""
    },
    validationSchema: CategorySchema,
    onSubmit: (values) => {
      mutation.mutate(values)
      console.log(values)
    }
  })
  return (
    <div>
      <form
        className="flex flex-1 flex-col p-4"
        onSubmit={formik.handleSubmit}
      >
        <div className="row mb-3">
          <Label>Nombre</Label>
          <Input
            type="text"
            className="form-control"
            placeholder="Ingrese Nombre"
            {...formik.getFieldProps("name")}
            /* disabled={finished} */
          />
          {formik.touched.name && formik.errors.name && (
            <small className="font-bold text-[#ff4444]">
              {formik.errors.name}
            </small>
          )}
        </div>
        <div className="row mb-3">
          <Label>Imagen</Label>
          <Input
            type="text"
            className="form-control"
            placeholder="Ingrese Nombre"
            {...formik.getFieldProps("image")}
            /* disabled={finished} */
          />
          {formik.touched.image && formik.errors.image && (
            <small className="font-bold text-[#ff4444]">
              {formik.errors.image}
            </small>
          )}
        </div>
        <Button variant="default">Enviar</Button>
      </form>
    </div>
  )
}
export default page
