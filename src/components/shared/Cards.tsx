import { useEffect, useRef, useState } from "react"
import { useAuthContext } from "@/contexts/auth-context"
import { Product } from "@/interfaces/Product"
import { useFavoriteStore } from "@/stores/favorites"
import { Heart } from "lucide-react"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import Zoom from "../../../app/productos/[name]/(components)/zoom"
import ProductCarousel from "../../../app/productos/(components)/ProductCarousel"
import { Icon } from "@iconify/react/dist/iconify.js"
import { Label } from "../ui/label"
import { Input } from "../ui/input"
import { Button } from "../ui/button"
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select"
import { SubCategoryProduct } from "@/interfaces/SubCategoryProduct"

interface CardProps {
  product: Product
}

const Cards = ({ product }: CardProps) => {
  const [isModalOpen, setModalOpen] = useState(false)
  const [imageSelected, setImageSelected] = useState(0)

  useEffect(() => {
    // Deshabilitar scroll al abrir el modal
    if (isModalOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "auto"
    }

    // Limpiar estilo al desmontar el componente
    return () => {
      document.body.style.overflow = "auto"
    }
  }, [isModalOpen])

  return (
    <div className="relative">
      {/* Producto */}
      <div
        className="flex flex-col w-full bg-white rounded-b-lg px-2 pt-2 shadow-md hover:shadow-lg hover:scale-105 transition-all duration-300 ease-in-out cursor-pointer"
        onClick={() => setModalOpen(true)}
      >
        <Image
          src={
            product.ImagesProductAsocciations[0]?.ImageProduct.image ??
            "/fondos/fondos1.jpg"
          }
          className="w-full object-cover aspect-square"
          width={400}
          height={400}
          alt={product.name}
        />
        <div className="flex flex-col gap-2 py-1">
          <h3 className="text-lg font-bold leading-none">{product.name}</h3>
          <p className="text-base font-extralight line-clamp-3">{product.description}</p>
          <h4 className="text-lg text-end leading-none">${product.price}</h4>
        </div>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {isModalOpen && (
          /* Bg modal */
          <motion.div
            className="fixed inset-0 z-50 bg-black bg-opacity-50 flex justify-center items-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setModalOpen(false)}
          >
            <Icon
              icon="material-symbols:close-rounded"
              width="60"
              height="60"
              className="z-50 top-0 right-0 absolute p-2 cursor-pointer"
              onClick={() => setModalOpen(false)}
            />
            {/* Content Modal*/}
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-center w-full h-full md:max-w-[80%]">
              {/* Carousel */}
              <motion.div
                className="p-2 bg-white flex items-center justify-center basis-5/12 w-full h-[300px] lg:h-[60vh] lg:rounded-l-md"
                onClick={(e) => e.stopPropagation()}
              >
                {/* Carousel Destock */}
                <div className="hidden lg:flex items-center justify-center gap-4 sm">
                  <div className="flex flex-col items-center gap-6">
                    {product.ImagesProductAsocciations.map(
                      (image: any, index: number) => (
                        <button
                          className={`size-11 ${
                            imageSelected === index &&
                            "scale-110 ring-2 ring-secondary"
                          } hover:scale-125 transition-transform duration-150 `}
                          onClick={() => setImageSelected(index)}
                          key={image.id}
                        >
                          <img src={image.ImageProduct.image} alt="image" />
                        </button>
                      )
                    )}
                  </div>

                  <div className="flex w-full items-center justify-center">
                    {
                      <Zoom
                        src={
                          product.ImagesProductAsocciations[imageSelected]
                            .ImageProduct.image
                        }
                        alt={product.name}
                      />
                    }
                  </div>
                </div>
                {/* carousel Mobile */}
                <div className="flex lg:hidden items-center justify-center">
                  <ProductCarousel images={product.ImagesProductAsocciations} />
                </div>
              </motion.div>
              <hr />
              {/* Content */}
              <div
                className="flex flex-col items-center bg-white p-8 h-full lg:h-[450px] xl:w-[400px] w-full overflow-y-auto basis-8/12 lg:rounded-md"
                onClick={(e) => e.stopPropagation()}
              >
                {/* Contenido estático */}
                <div className="flex flex-col gap-4 w-full">
                  <h2 className="text-3xl font-semibold">{product.name}</h2>
                  <h3 className="text-xl">$ {product.price}</h3>
                  <p
                    dangerouslySetInnerHTML={{ __html: product.description }}
                  ></p>
                  <div className="flex gap-3 items-end justify-start">
                    <div>
                      {product.SubCategoryProducts.length > 0 && (
                        <>
                          <Label>Categoria</Label>
                          <Select>
                            <SelectTrigger className="w-[180px]">
                              <SelectValue placeholder="Categoria" />
                            </SelectTrigger>
                            <SelectContent>
                              {product.SubCategoryProducts &&
                                product.SubCategoryProducts.map(
                                  (subCategoryProducts: SubCategoryProduct) => (
                                    <SelectItem
                                      className="text-start"
                                      key={crypto.randomUUID()}
                                      value={
                                        subCategoryProducts.SubCategory.date
                                      }
                                    >
                                      {subCategoryProducts.SubCategory.date} :{" "}
                                      {subCategoryProducts.SubCategory.price}
                                    </SelectItem>
                                  )
                                )}
                            </SelectContent>
                          </Select>
                        </>
                      )}
                    </div>
                    <div>
                      <Label>Cantidad</Label>
                      <Input
                        className="w-[68px] text-center"
                        defaultValue={1}
                        min={1}
                        type="number"
                      />
                    </div>
                  </div>
                  <div>
                    <Button variant="secondary">Agregar al carrito</Button>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default Cards
