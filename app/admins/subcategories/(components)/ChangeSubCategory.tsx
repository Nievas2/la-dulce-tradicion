import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useMutation } from "@tanstack/react-query"
import { useFormik } from "formik"
import { Dispatch, SetStateAction, useEffect, useState } from "react"
import { postSubCategory, putSubCategory } from "@/services/SubCategoryService"

export interface SubCategoryForm {
  price: number
  date: string
}

interface ChangeSubCategoryProps {
  Product?: numbe
  subCategory?: SubCategoryForm // Prop para manejar las subcategorías
  id?: number
  setStep?: Dispatch<SetStateAction<number>>
}

const ChangeSubCategoryProduct = ({
  Product,
  subCategory,
  id,
  setStep,
}: ChangeSubCategoryProps) => {
  const [success, setSuccess] = useState("")
  const [error, setError] = useState("")
  const [subCategories, setSubCategories] = useState([{ price: 0, date: "" }]) // Array para las subcategorías

  const mutation = useMutation({
    mutationFn: async () => {
      if (!subCategory) {
        const promises = subCategories.map((element) => {
          const body = {
            Product: formik.values.Product,
            price: element.price,
            date: element.date,
          }
          return postSubCategory(body)
        })

        await Promise.all(promises)
      } else {
        const body = {
          price: subCategories[0].price,
          date: subCategories[0].date,
        }
        return putSubCategory(body, id!)
      }
      if (setStep) setStep(3)
    },
    onSuccess: (data) => {
      if (subCategory) setSuccess("Subcategoría actualizada correctamente")
      formik.resetForm()
      console.log(data)
    },
    onError: (error) => {
      setError(error.message)
      console.log(error)
    },
  })

  const formik = useFormik({
    initialValues: {
      Product: Product ? Product : 0,
      subCategories: subCategory ? subCategory : subCategories,
    },
    onSubmit: (values) => {
      mutation.mutate()
      console.log(values)
    },
  })

  useEffect(() => {
    if (subCategory) {
      const data = {
        price: subCategory.price,
        date: subCategory.date,
      }
      setSubCategories([data])
    }
  }, [subCategory])

  const handleAddSubCategory = () => {
    setSubCategories([...subCategories, { price: 0, date: "" }]) // Añadir una nueva subcategoría
  }

  const handleRemoveSubCategory = (index: number) => {
    const newSubCategories = subCategories.filter((_, i) => i !== index) // Eliminar la subcategoría por índice
    setSubCategories(newSubCategories)
  }

  const handleSubCategoryChange = (
    index: number,
    field: keyof SubCategoryForm,
    value: any
  ) => {
    const newSubCategories = subCategories.map((sub, i) =>
      i === index ? { ...sub, [field]: value } : sub
    )
    setSubCategories(newSubCategories)
    formik.setFieldValue("subCategories", newSubCategories) // Actualizar formik con las nuevas subcategorías
  }

  return (
    <form className="flex flex-1 flex-col gap-3" onSubmit={formik.handleSubmit}>
      {success ? (
        <p>{success}</p>
      ) : (
        <>
          {Product === undefined && (
            <div className="flex flex-col gap-2 items-start">
              <Label>Producto</Label>
              <Input
                type="number"
                placeholder="Ingrese el ID del producto"
                {...formik.getFieldProps("Product")}
              />
            </div>
          )}

          {subCategories.map((subCategory, index) => (
            <div className="flex flex-col gap-2" key={index}>
              <div className="flex flex-col gap-4 items-start">
                <Label>Precio</Label>
                <Input
                  type="number"
                  placeholder="Ingrese el precio"
                  value={subCategory.price}
                  onChange={(e) =>
                    handleSubCategoryChange(index, "price", e.target.value)
                  }
                />
              </div>
              <div className="flex flex-col gap-4 items-start">
                <Label>Información</Label>
                <Input
                  type="text"
                  placeholder="Ingrese la data"
                  value={subCategory.date}
                  onChange={(e) =>
                    handleSubCategoryChange(index, "date", e.target.value)
                  }
                />
              </div>
              {subCategories.length > 1 && (
                <Button
                  type="button"
                  variant="secondary"
                  onClick={() => handleRemoveSubCategory(index)}
                  className="btn btn-danger "
                >
                  - Eliminar
                </Button>
              )}
            </div>
          ))}
          {!subCategory && (
            <div className="flex justify-center items-center">
              <Button
                type="button"
                variant="secondary"
                onClick={handleAddSubCategory}
                className="btn btn-secondary"
              >
                + Agregar Subcategoría
              </Button>
            </div>
          )}

          {error && <small>{error}</small>}
          <div className="flex justify-between gap-2 text-center">
            {subCategory && (
              <Button
                variant="main"
                type="button"
                onClick={() => {
                  if (setStep) setStep(3)
                }}
              >
                Omitir subcategoria
              </Button>
            )}
            <Button type="submit" variant="secondary">
              Aceptar
            </Button>
          </div>
        </>
      )}
    </form>
  )
}

export default ChangeSubCategoryProduct
