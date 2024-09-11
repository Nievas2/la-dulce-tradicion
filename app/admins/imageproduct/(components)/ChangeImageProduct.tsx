import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  getImageProductById,
  postImageProduct,
  putImageProduct
} from "@/services/ImageProduct"
import { useMutation, useQuery } from "@tanstack/react-query"
import { useFormik } from "formik"
import { useEffect, useState } from "react"

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
  const [images, setImages] = useState([{ image: "" }]) // Array para las imágenes

  const { data } = useQuery({
    queryKey: ["productImageById"],
    queryFn: () => {
      if (Product) return getImageProductById(Product)
    },
    refetchOnWindowFocus: false,
    staleTime: 1000 * 60 * 60 * 24
  })

  const mutation = useMutation({
    mutationFn: async () => {
      if (image) {
        console.log("put")
        return await putImageProduct(images[0].image, data?.data.id)
      }

      const promises = images.map((element) => {
        const body = {
          Product: formik.values.Product,
          image: element.image
        }
        return postImageProduct(body)
      })

      await Promise.all(promises)
      return true
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
      images: image ? image : images // inicializar con el array de imágenes
    },
    onSubmit: (values) => {
      mutation.mutate()
      console.log(values)
    }
  })
  useEffect(() => {
    if (image) {
      setImages([{ image: image }])
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleAddImage = () => {
    setImages([...images, { image: "" }]) // Añadir una nueva imagen
  }

  const handleRemoveImage = (index: any) => {
    const newImages = images.filter((_, i) => i !== index) // Eliminar la imagen por índice
    setImages(newImages)
  }

  const handleImageChange = (index: any, value: any) => {
    const newImages = images.map((img, i) =>
      i === index ? { ...img, image: value } : img
    )
    setImages(newImages)
    formik.setFieldValue("images", newImages) // Actualizar formik con las nuevas imágenes
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
              {images.map((img, index) => (
                <div
                  className="row mb-3"
                  key={index}
                >
                  <Label className="form-Label mb-0 p-0">
                    <b>Imagen {index + 1}</b>
                  </Label>
                  <Input
                    type="text"
                    className="form-control mt-2"
                    placeholder="Ingrese la URL de la imagen"
                    value={img.image}
                    onChange={(e) => handleImageChange(index, e.target.value)}
                  />
                  {images.length > 1 && (
                    <Button
                      type="button"
                      onClick={() => handleRemoveImage(index)}
                      className="btn btn-danger mt-2"
                    >
                      -
                    </Button>
                  )}
                </div>
              ))}
              {!image && (
                <Button
                  type="button"
                  onClick={handleAddImage}
                  className="btn btn-secondary mb-3"
                >
                  + Agregar Imagen
                </Button>
              )}
              {!image && (
                <div className="row mb-3">
                  <Label className="form-Label mb-0 p-0">
                    <b>Producto</b>
                  </Label>
                  <Input
                    type="number"
                    className="form-control mt-2"
                    placeholder="Ingrese el ID del producto"
                    {...formik.getFieldProps("Product")}
                  />
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
