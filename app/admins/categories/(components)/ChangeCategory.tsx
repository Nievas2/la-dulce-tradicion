import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { postCategory, putCategory } from "@/services/CategoryService"
import { uploadImage } from "@/services/ImageService"
import { CategorySchema } from "@/utils/schemas/CategorySchema"
import { useMutation } from "@tanstack/react-query"
import { useFormik } from "formik"
import { useState } from "react"
import { useDropzone } from "react-dropzone"

export interface ChangeCategoryProps {
  id?: number
  name?: string
  image?: string
}
export interface FormCategory {
  name: string
  image: string
}
const ChangeCategory = ({ id, name, image }: ChangeCategoryProps) => {
  const [images, setImages] = useState([]) // Array para las imágenes
  const onDrop = (acceptedFiles: any) => {
    // Aquí puedes manejar los archivos aceptados
    setImages(acceptedFiles)
  }
  const { getRootProps, getInputProps, isDragActive, isDragReject } =
    useDropzone({
      onDrop,
      accept: {
        "image/*": [] // Aceptar solo imágenes
      },
      maxFiles: 1
    })
  const mutation = useMutation({
    mutationFn: async () => {
      return handleSubmit()
    },
  })

  async function handleSubmit() {
    //maneja si encuentra imagenes
    let imageUp
    let response
    if (images.length > 0) {
      imageUp = images[0]
      if (imageUp != undefined) {
        let formData = new FormData()
        formData.append("image", imageUp)
        response = await uploadImage(formData
      }
    }

    //si se agregan imagesnes
    if (images.length > 0 && response != undefined) {
      if (id !== undefined) {
        return putCategory({ image: response.data.url, name: formik.values.name }, id)
      }
      return postCategory({ image: response.data.url, name: formik.values.name })
    }

    //si no se agregan imagenes
    if (id !== undefined) {
      return putCategory(formik.values, id)
    }
    return postCategory(formik.values)
  }

  const formik = useFormik({
    initialValues: {
      name: name ? name : "",
      image: image ? image : ""
    },
    validationSchema: CategorySchema,
    onSubmit: (values: FormCategory) => {
      mutation.mutate()
    }
  })

  return (
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
      {image && (
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
      )}
      <div
        {...getRootProps()}
        className="border border-secondary hover:bg-secondary/80 bg-white text-black transition-colors duration-300 h-10 px-4 py-2 rounded-md"
      >
        <input {...getInputProps()} />
        {isDragActive ? (
          <p>Suelta las imágenes aquí ...</p>
        ) : isDragReject ? (
          <p>¡Solo se permiten imágenes!</p>
        ) : (
          <p>
            Arrastra y suelta algunas imágenes aquí, o haz clic para seleccionar
            archivos
          </p>
        )}
      </div>
      <Button variant="default">Enviar</Button>
    </form>
  )
}
export default ChangeCategory
