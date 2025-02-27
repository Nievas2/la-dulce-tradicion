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
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

import { SubCategoryProduct } from "@/interfaces/SubCategoryProduct"
import { CartProducts, useCartStore } from "@/stores/cart.store"
import { SubCategory } from "@/interfaces/SubCategory"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog"
import Link from "next/link"

interface CardProps {
  product: Product
}

const Cards = ({ product }: CardProps) => {
  const [isModalOpen, setModalOpen] = useState(false)
  const [imageSelected, setImageSelected] = useState(0)
  const [subCategory, setSubCategory] = useState<number | undefined>()
  const [amount, setAmount] = useState(1)
  const [error, setError] = useState<string | undefined>()
  const [showAuthFavoriteModal, setShowAuthFavoriteModal] = useState(false)
  const [added, setAdded] = useState(false)
  const [productsInCart, setProductsInCart] = useState<
    { userId: string; products: CartProducts[] } | undefined
  >()
  const { authUser } = useAuthContext()

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

  const favorites = useFavoriteStore(
    (state) =>
      state.favorites.find((fav) => fav.userId === authUser?.user.id)?.products
  )
  let isFavorite = false
  if (favorites) {
    isFavorite = favorites.some((fav) => fav.id === product.id)
  }

  const addFavoriteProduct = useFavoriteStore(
    (state) => state.addFavoriteProduct
  )

  const deleteFavoriteProduct = useFavoriteStore(
    (state) => state.deleteFavoriteProduct
  )

  const toggleFavorite = () => {
    if (!authUser) {
      setShowAuthFavoriteModal(true)
      return
    }

    if (isFavorite) {
      deleteFavoriteProduct(authUser.user.id, product.id)
    } else {
      addFavoriteProduct(authUser.user.id, product)
    }
  }

  const addProduct = useCartStore((state) => state.addProduct)
  const productStore = useCartStore((state) =>
    state.cart.find(
      (productStorage) => productStorage.userId === authUser?.user.id
    )
  )
  const getProductsByUserId = useCartStore((state) => state.getProductsByUserId)
  const addSubCategory = useCartStore((state) => state.addSubCategory)

  function handleAddCartSubCategories() {
    if (
      subCategory == undefined ||
      amount < 1 ||
      !authUser ||
      subCategory == 999
    ) {
      setAdded(false)
      return setError("Todos los cambos son requeridos")
    }
    if (!authUser) return
    setError(undefined)
    setSubCategory(999)
    if (
      productsInCart?.products.some(
        (products) => product.id == products.product.id
      )
    ) {
      const sub = product.SubCategoryProducts.filter((subcategory) => {
        return subcategory.SubCategory.id == subCategory
      })

      addSubCategory({
        userId: authUser?.user.id,
        productCart: {
          product: product,
          amount: 1,
          subCategory: [{ subCategory: sub[0].SubCategory, amount: amount }],
        },
      })
      setAdded(true)
      return
    } else {
      const sub = product.SubCategoryProducts.filter((subcategory) => {
        return subcategory.SubCategory.id == subCategory
      })

      addProduct({
        userId: authUser?.user.id,
        product: {
          product: product,
          amount: 1,
          subCategory: [{ subCategory: sub[0].SubCategory, amount: amount }],
        },
      })
      setAdded(true)
    }
  }
  function handleAddCart() {
    if (amount < 1 || !authUser) {
      setAdded(false)
      return setError("Todos los cambos son requeridos")
    }

    addProduct({
      userId: authUser.user.id,
      product: {
        product,
        amount,
        subCategory: undefined,
      },
    })
  }

  function getAvailableSubcategories() {
    const allSubcategories = product.SubCategoryProducts
    /* Revisa si en el carrito ua hay un producto agregado con ese id */
    const productInCart = productStore?.products.find(
      (item) => item.product.id === product.id
    ) as CartProducts

    if (product.SubCategoryProducts.length <= 0) {
      return productsInCart?.products.some(
        (item) => item.product.id === product.id
      ) ? (
        <span>Ya se agregaron todas las posibles subcategorias</span>
      ) : (
        <>
          <div>
            <Label>Cantidad</Label>
            <Input
              className="w-[68px] text-center"
              defaultValue={1}
              onChange={(e) => setAmount(Number(e.target.value))}
              min={1}
              type="number"
            />
          </div>
          <div className="w-full flex items-end justify-end">
            {authUser != null && (
              <Button
                variant="secondary"
                className="flex gap-2"
                onClick={handleAddCart}
              >
                <Icon icon="mdi:cart" width="16" height="16" />
                Agregar al carrito
              </Button>
            )}
          </div>
        </>
      )
    }

    /* Revisa si el producto esta en el carro, cuales son las subcategorias que estan añadidas */
    if (productInCart) {
      const subCategoriesFiltered = allSubcategories.filter((item) => {
        return !productInCart.subCategory?.some(
          (subCategory) => subCategory.subCategory.id === item.SubCategory.id
        )
      })

      return subCategoriesFiltered.length > 0 ? (
        <>
          <div>
            <Label>Categorias</Label>
            <Select
              value={subCategory?.toString()}
              defaultValue="999"
              onValueChange={(e) => setSubCategory(Number(e))}
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Categorias" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem
                  className="text-start"
                  key={crypto.randomUUID()}
                  value="999"
                >
                  categorias
                </SelectItem>
                {subCategoriesFiltered.map((subCategory) => (
                  <SelectItem
                    className="text-start"
                    key={crypto.randomUUID()}
                    value={subCategory.SubCategoryId.toString()}
                  >
                    {subCategory.SubCategory.date} :{" "}
                    {subCategory.SubCategory.price}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label>Cantidad</Label>
            <Input
              className="w-[68px] text-center"
              defaultValue={1}
              onChange={(e) => setAmount(Number(e.target.value))}
              min={1}
              type="number"
            />
          </div>
          <div className="w-full flex items-end justify-end">
            {authUser != null && (
              <Button
                variant="secondary"
                className="flex gap-2"
                onClick={handleAddCartSubCategories}
              >
                <Icon icon="mdi:cart" width="16" height="16" />
                Agregar al carrito
              </Button>
            )}
          </div>
        </>
      ) : (
        <span>Ya se agregaron todas las posibles subcategorias</span>
      )
    }
    return allSubcategories.length > 0 ? (
      <>
        <div>
          <Label>Categorias</Label>
          <Select
            value={subCategory?.toString()}
            defaultValue="999"
            onValueChange={(e) => setSubCategory(Number(e))}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Categoria" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem
                className="text-start"
                key={crypto.randomUUID()}
                value="999"
              >
                categorias
              </SelectItem>
              {allSubcategories.map((subCategory) => (
                <SelectItem
                  className="text-start"
                  key={crypto.randomUUID()}
                  value={subCategory.SubCategoryId.toString()}
                >
                  {subCategory.SubCategory.date} :{" "}
                  {subCategory.SubCategory.price}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label>Cantidad</Label>
          <Input
            className="w-[68px] text-center"
            defaultValue={1}
            onChange={(e) => setAmount(Number(e.target.value))}
            min={1}
            type="number"
          />
        </div>
        <div className="w-full flex items-end justify-end">
          {authUser != null && (
            <Button
              variant="secondary"
              className="flex gap-2"
              onClick={handleAddCartSubCategories}
            >
              <Icon icon="mdi:cart" width="16" height="16" />
              Agregar al carrito
            </Button>
          )}
        </div>
      </>
    ) : (
      <span>Todas las subcategorias fueron agregadas</span>
    )
  }
  useEffect(() => {
    if (authUser != null) {
      const products = getProductsByUserId(authUser?.user.id)
      setProductsInCart(products)
    }
  }, [productStore])

  return (
    <div className="relative">
      {/* Producto */}
      <div
        className="flex flex-col w-full h-full bg-white rounded-b-lg px-2 py-2 gap-4 shadow-md hover:border-2 hover:border-secondary hover:shadow-none hover:scale-105 transition-all duration-300 ease-in-out cursor-pointer relative"
        onClick={() => setModalOpen(true)}
      >
        <Image
          src={
            product.ImagesProductAsocciations[0]?.ImageProduct.image ??
            "/fondos/fondos1.jpg"
          }
          className="w-full object-cover aspect-square rounded-lg"
          width={400}
          height={400}
          alt={product.name}
        />

        <div className="flex flex-col gap-2 py-1">
          <div className="flex items-center w-full">
            <h3 className="text-lg font-bold leading-none w-full">
              {product.name}
            </h3>
            {product.price ||
              (product.SubCategoryProducts.length > 0 && (
                <h4 className="text-md text-end leading-none border border-gray-400 py-2 px-4 w-fit rounded-full">
                  $
                  {product.price
                    ? product.price
                    : product.SubCategoryProducts.length > 0
                    ? product.SubCategoryProducts[0].SubCategory.price
                    : 0}
                </h4>
              ))}
          </div>
          <p
            className="text-base font-extralight line-clamp-2"
            dangerouslySetInnerHTML={{ __html: product.description }}
          />
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
                          <img
                            src={
                              image.ImageProduct != null
                                ? image.ImageProduct.image
                                : "/fondos/fondos1.jpg"
                            }
                            alt="image"
                          />
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
                  <div className="flex w-full">
                    <h2 className="text-3xl font-semibold w-full">
                      {product.name}
                    </h2>
                    <div className="flex items-center justify-end ">
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={(e) => {
                                if (authUser) {
                                  if (isFavorite)
                                    return deleteFavoriteProduct(
                                      authUser?.user.id,
                                      product.id
                                    )
                                  return addFavoriteProduct(
                                    authUser?.user.id,
                                    product
                                  )
                                }
                                setShowAuthFavoriteModal(true)
                              }}
                            >
                              {isFavorite ? (
                                <div className="cursor-pointer rounded-lg transition-colors duration-300">
                                  <Heart
                                    className={`text-[#E81224] h-6 w-6 animate-heart`}
                                    fill="#E81224"
                                  />
                                </div>
                              ) : (
                                <div className="cursor-pointer transition-colors duration-300">
                                  <Heart />
                                </div>
                              )}
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>Añadir a favoritos</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </div>
                  </div>
                  {product.price ||
                    (product.SubCategoryProducts.length > 0 && (
                      <h3 className="text-xl">
                        ${" "}
                        {product.price
                          ? product.price
                          : product.SubCategoryProducts.length > 0
                          ? product.SubCategoryProducts[0].SubCategory.price
                          : 0}
                      </h3>
                    ))}

                  <p
                    dangerouslySetInnerHTML={{ __html: product.description }}
                  ></p>
                  <>
                    <div className="flex gap-3 items-end justify-start">
                      {getAvailableSubcategories()}
                    </div>
                    {error && (
                      <small className="text-red-500 font-bold">{error}</small>
                    )}
                    {added && (
                      <small className="text-green-500 font-bold">
                        Se agrego correctamente el producto al carrito
                      </small>
                    )}
                  </>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <Dialog
        open={showAuthFavoriteModal}
        onOpenChange={setShowAuthFavoriteModal}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>¿Te gusta este producto?</DialogTitle>
          </DialogHeader>
          <p className="text-center">
            Inicia sesión o regístrate para añadirlo a tus favoritos.
          </p>
          <div className="flex flex-row gap-2 w-fit mx-auto">
            <Link href="/iniciar-sesion">
              <Button
                variant="secondary"
                onClick={() => setShowAuthFavoriteModal(false)}
              >
                Iniciar sesión
              </Button>
            </Link>

            <Link href="/registro">
              <Button
                variant="secondary"
                onClick={() => setShowAuthFavoriteModal(false)}
              >
                Registrarse
              </Button>
            </Link>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default Cards
