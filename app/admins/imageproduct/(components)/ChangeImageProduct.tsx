import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  getImageProductById,
  postImageProduct,
  putImageProduct,
} from "@/services/ImageProduct"
import { useMutation, useQuery } from "@tanstack/react-query"
import { useFormik } from "formik"
import { Dispatch, SetStateAction, useEffect, useState } from "react"
import { useDropzone } from "react-dropzone"

export interface ImageProductForm {
  Product: number
  image: string
}
interface ChangeProductProps {
  Product: number | undefined
  image: string | undefined
  imageId: number | undefined
  setStep?: Dispatch<SetStateAction<number>>
}
const ChangeImageProduct = ({
  Product,
  image,
  imageId,
  setStep,
}: ChangeProductProps) => {
  const [error, setError] = useState("")
  const [images, setImages] = useState([]) // Array para las imágenes
  const onDrop = (acceptedFiles: any) => {
    // Aquí puedes manejar los archivos aceptados
    setImages(acceptedFiles)
  }
  const { getRootProps, getInputProps, isDragActive, isDragReject } =
    useDropzone({
      onDrop,
      accept: {
        "image/*": [], // Aceptar solo imágenes
      },
    })

  const { data } = useQuery({
    queryKey: ["productImageById"],
    queryFn: () => {
      if (Product) return getImageProductById(Product)
    },
    refetchOnWindowFocus: false,
    staleTime: 1000 * 60 * 60 * 24,
  })

  const { mutate, isPending } = useMutation({
    mutationFn: async () => {
      return handleSubmit()
    },
    onSuccess: (data) => {
      formik.resetForm()
    },
    onError: (error) => {
      setError(error.message)
    },
  })

  const formik = useFormik({
    initialValues: {
      Product: Product ? Product : 0, // inicializar con el array de imágenes
    },
    onSubmit: (values) => {
      mutate()
    },
  })

  function handleSubmit() {
    if (imageId) {
      const imagesUpload = [...images]
      imagesUpload.forEach(async (imageUp) => {
        if (imageUp != undefined) {
          let formData = new FormData()
          formData.append("image", imageUp)
          const response = await putImageProduct(formData, imageId)
        }
      })
      if (setStep) setStep(2)
      return
    }
    const imagesUpload = [...images]
    imagesUpload.forEach(async (imageUp) => {
      if (imageUp != undefined) {
        let formData = new FormData()
        formData.append("image", imageUp)
        const response = await postImageProduct(formData, formik.values.Product)
      }
    })
    if (setStep) setStep(2)
  }

  function handleRemoveImage(index: any) {
    const newImages = [...images]
    newImages.splice(index, 1)
    setImages(newImages)
  }

  return (
    <>
      <div className="flex flex-col mb-3 mt-3 offset-lg-2">
        <div className="text-white mb-3">
          <div className="">
            <form
              className="flex flex-1 flex-col p-4"
              onSubmit={formik.handleSubmit}
            >
              {!Product && (
                <div className="row mb-3">
                  <Label className="form-Label mb-0 p-0">
                    <b>Producto</b>
                  </Label>
                  <Input
                    type="number"
                    className="form-control mt-2"
                    placeholder="Ingrese el ID del producto"
                    disabled={isPending}
                    {...formik.getFieldProps("Product")}
                  />
                </div>
              )}
              <div className="flex flex-col gap-4 items-start">
                <Label>Agregar imagenes</Label>
                <div className="flex flex-col gap-6">
                  <div
                    {...getRootProps()}
                    className="border border-secondary hover:bg-secondary hover:text-white bg-white text-black transition-colors duration-300 px-4 py-2 rounded-md h-56 cursor-pointer"
                  >
                    <input {...getInputProps()} disabled={isPending} />
                    {isDragActive ? (
                      <p>Suelta las imágenes aquí ...</p>
                    ) : isDragReject ? (
                      <p>¡Solo se permiten imágenes!</p>
                    ) : (
                      <p>
                        Arrastra y suelta algunas imágenes aquí, o haz clic para
                        seleccionar archivos
                      </p>
                    )}
                  </div>

                  <div className="flex flex-wrap justify-around items-center">
                    {image && (
                      <img
                        src={image}
                        width={100}
                        height={100}
                        key={crypto.randomUUID()}
                        alt={image}
                      />
                    )}
                    {images.map((image: any, index: number) => (
                      <img
                        src={URL.createObjectURL(image)}
                        alt="uploaded"
                        width={100}
                        height={100}
                        key={image.name}
                        onClick={() => handleRemoveImage(index)}
                      />
                    ))}
                  </div>
                </div>
                {error && <small>{error}</small>}
              </div>
              <div className="row mb-3 mt-2 text-center">
                <div className="col-lg-6">
                  <Button
                    type="submit"
                    className="btn boton"
                    variant="secondary"
                    disabled={isPending}
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
