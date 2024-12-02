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
  const [isModalOpen, setModalOpen] = useState(true)
  const [imageSelected, setImageSelected] = useState(0)
  const [imagePosition, setImagePosition] = useState({
    x: 0,
    y: 0,
    width: 0,
    height: 0,
  })
  const imageRef = useRef<HTMLDivElement>(null)

  const openModal = () => {
    if (imageRef.current) {
      const rect = imageRef.current.getBoundingClientRect()
      setImagePosition({
        x: rect.x,
        y: rect.y,
        width: rect.width,
        height: rect.height,
      })
    }
    setModalOpen(true)
  }

  const closeModal = () => setModalOpen(false)

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
        ref={imageRef}
        className="flex flex-col w-full bg-white rounded-b-lg px-2 pt-2 shadow-md hover:shadow-lg hover:scale-105 transition-all duration-300 ease-in-out cursor-pointer"
        onClick={openModal}
      >
        <Image
          src={
            product.ImagesProductAsocciations[0]?.ImageProduct.image ??
            "/fondos/fondos1.jpg"
          }
          className="w-full object-cover"
          width={225}
          height={225}
          alt={product.name}
        />
        <div className="flex flex-col gap-1 py-1">
          <h3 className="text-lg font-bold leading-none">{product.name}</h3>
          <h4 className="text-lg text-end leading-none">${product.price}</h4>
        </div>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            className="fixed inset-0 z-50 bg-black bg-opacity-50 flex justify-center items-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeModal}
          >
            <Icon
              icon="material-symbols:close-rounded"
              width="60"
              height="60"
              className="z-50 top-0 right-0 absolute p-2 cursor-pointer"
              onClick={closeModal}
            />
            <div className="flex flex-col lg:flex-row items-center justify-center max-h-[90%] lg:max-w-[80%]">
              {/* Imagen animada */}
              <motion.div
                className="sticky top-0 z-20 size-[210px] lg:size-[390px] p-2 bg-white flex items-center justify-center basis-5/12"
                onClick={(e) => e.stopPropagation()}
                initial={{
                  x: imagePosition.x - 560,
                  y: imagePosition.y - 260,
                }}
                /* initial={{
                x: imagePosition.x - 560,
                y: imagePosition.y - 260,
              }}
              animate={{
                x: 0,
                y: 0,
                transition: { duration: 3 },
              }} */
                animate={{
                  x: "50%",
                  y: "50%",
                  translateX: "-50%",
                  translateY: "-50%",
                  transition: { duration: 0.5 },
                }}
                exit={{
                  opacity: 0,
                  scale: 0.5,
                  transition: { duration: 0.3 },
                }}
              >
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
                <div className="flex lg:hidden items-center justify-center">
                  <ProductCarousel images={product.ImagesProductAsocciations} />
                </div>
              </motion.div>
              <div
                className="flex flex-col items-center bg-white p-2 rounded-lg shadow-lg h-full lg:h-[400px] w-full overflow-y-auto basis-7/12"
                onClick={(e) => e.stopPropagation()}
              >
                {/* Contenido estático */}
                <div className="flex flex-col gap-4">
                  <h2 className="text-3xl font-semibold">{product.name}</h2>
                  <h3 className="text-xl">{product.price}</h3>
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
