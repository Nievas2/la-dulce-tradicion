"use client"
import { useAuthContext } from "@/contexts/auth-context"
import { Button } from "../ui/button"
import { Icon } from "@iconify/react/dist/iconify.js"
import { useMutation } from "@tanstack/react-query"
import {
  CartProducts,
  SubCategoryCart,
  useCartStore,
} from "@/stores/cart.store"
import { Product } from "@/interfaces/Product"
import { useEffect, useMemo, useState } from "react"
import Link from "next/link"

interface CartProps {
  cartOpen: boolean
  setCartOpen: Function
}
export default function Cart({ cartOpen, setCartOpen }: CartProps) {
  const [products, setProducts] = useState<
    { userId: string; products: CartProducts[] } | undefined
  >()
  const { authUser } = useAuthContext()

  const getProductsByUserId = useCartStore((state) => state.getProductsByUserId)
  const productStore = useCartStore((state) =>
    state.cart.find(
      (productStorage) => productStorage.userId === authUser?.user.id
    )
  )

  useEffect(() => {
    if (authUser != null) {
      const products = getProductsByUserId(authUser?.user.id)

      setProducts(products)
    }
  }, [productStore])

  const clearCart = useCartStore((state) => state.clearCart)

  const total = useMemo(() => {
    let subtotal: number = 0
  
    if (products && products.products) {
      products.products.forEach((product: CartProducts) => {
        if (product.subCategory != undefined) {
          product.subCategory.map((subcategory) => {
            subtotal += subcategory.amount * subcategory.subCategory.price
          })
        }
        if (product.amount != undefined)
          subtotal += product.amount * product.product.price
      })
    }
    return subtotal
  }, [products])

  return (
    <div
      className={`fixed inset-0 bg-black bg-opacity-50 flex justify-start z-50 transition-all duration-300 ${
        cartOpen ? "opacity-100 visible" : "opacity-0 invisible"
      }`}
      onClick={() => setCartOpen(false)}
    >
      <div
        className={`bg-main w-[320px] md:w-[400px] h-full p-2 flex flex-col gap-6 transition-all duration-300 absolute ${
          cartOpen ? "-right-0" : "-right-full"
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex flex-row items-center justify-between">
          <button
            type="button"
            className="self-start"
            onClick={() => setCartOpen(false)}
          >
            <Icon
              className="text-light"
              icon="material-symbols:close"
              width="24"
              height="24"
            />
          </button>
        </div>

        <ol className="flex flex-col gap-4 overflow-y-auto h-[500px]">
          {productStore &&
            productStore.products.map((product: CartProducts) => (
              <CartCard
                key={crypto.randomUUID()}
                amount={product.amount}
                product={product.product}
                cartProduct={product}
                userId={Number(authUser!.user.id)}
              />
            ))}
          {productStore?.products.length === 0 && (
            <p className="text-center">No hay productos en el carrito</p>
          )}
        </ol>
        <div className="flex flex-col w-full gap-8">
          <div className="flex">
            <span className="w-full">Subtotal: </span>
            <span className="w-full text-end">$ {total.toString()}</span>
          </div>
          <Link href="/ticket">
            <Button
              variant="main"
              className="flex gap-2 w-full"
              onClick={() => setCartOpen(false)}
            >
              <Icon
                icon="material-symbols:shopping-cart"
                width="24"
                height="24"
              />
              Ir al ticket
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}

interface CartCardProps {
  product: Product
  amount: number | undefined
  userId: number
  cartProduct: CartProducts
}

function CartCard({ product, amount, userId, cartProduct }: CartCardProps) {
  const deleteProductFromCart = useCartStore(
    (state) => state.deleteProductFromCart
  )
  const increaseAmountProduct = useCartStore(
    (state) => state.increaseAmountProduct
  )
  const increaseAmountSubCategory = useCartStore(
    (state) => state.increaseAmountSubCategory
  )
  const decreaseAmountProduct = useCartStore(
    (state) => state.decreaseAmountProduct
  )
  const decreaseAmountSubCategory = useCartStore(
    (state) => state.decreaseAmountSubCategory
  )
  const deleteSubCategory = useCartStore((state) => state.deleteSubCategory)
  function handleDeleteProduct() {
    deleteProductFromCart(userId.toString(), product.id!)
  }

  return (
    <li className="flex gap-4 w-full">
      <section className="flex flex-col w-full gap-2 bg-white p-1 rounded-md">
        <div className="flex w-full gap-2">
          <img
            src={product.ImagesProductAsocciations[0].ImageProduct.image}
            alt={product.name}
            className="rounded-lg w-24 h-24 object-center"
          />
          <div className="flex flex-col md:flex-row w-full items-center gap-2 md:gap-0">
            <div className="flex flex-col md:w-full">
              <span className="font-medium truncate max-w-[170px]">
                {product.name}
              </span>

              <span className="font-light truncate max-w-[170px]">
                $ {product.price} / unidad
              </span>
              {cartProduct.subCategory === undefined && (
                <div className="flex items-center justify-center md:justify-start">
                  <Button
                    variant="secondary"
                    className="text-xs py-1 w-fit"
                    onClick={handleDeleteProduct}
                  >
                    <Icon
                      icon="material-symbols:delete"
                      width="24"
                      height="24"
                    />
                  </Button>
                </div>
              )}
            </div>
            {cartProduct.subCategory != undefined &&
              cartProduct.subCategory?.length > 0 && (
                <div className="flex items-center justify-center md:justify-start">
                  <Button
                    variant="secondary"
                    className="text-xs py-1 w-fit"
                    onClick={handleDeleteProduct}
                  >
                    <Icon
                      icon="material-symbols:delete"
                      width="24"
                      height="24"
                    />
                  </Button>
                </div>
              )}

            {product.SubCategoryProducts.length <= 0 && amount != undefined && (
              <div className="flex items-center justify-center gap-2 max-w-[110px]">
                <div>
                  <button
                    className="rounded-full bg-gray-200 p-2 min-h-8 min-w-8"
                    onClick={() => {
                      if (amount > 1) {
                        decreaseAmountProduct(userId.toString(), product.id)
                      }
                    }}
                  >
                    <Icon
                      icon="material-symbols:remove"
                      width="16"
                      height="16"
                    />
                  </button>
                </div>
                <div>
                  <span className="text-center">{amount}</span>
                </div>
                <div>
                  <button
                    className="rounded-full bg-gray-200 p-2 min-h-8 min-w-8"
                    onClick={() => {
                      increaseAmountProduct(userId.toString(), product.id)
                    }}
                  >
                    <Icon icon="material-symbols:add" width="16" height="16" />
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        {cartProduct.subCategory != undefined &&
          cartProduct.subCategory.length > 0 &&
          cartProduct.subCategory.map((subCategory: SubCategoryCart) => (
            <div
              className="flex items-center justify-center w-full"
              key={crypto.randomUUID()}
            >
              <div className="flex items-center justify-center gap-2 max-w-[110px]">
                <div>
                  <button
                    className="rounded-full bg-gray-200 p-2 min-h-8 min-w-8"
                    onClick={() => {
                      if (subCategory.amount > 1) {
                        decreaseAmountSubCategory(
                          userId.toString(),
                          product.id,
                          subCategory.subCategory.id
                        )
                      }
                    }}
                  >
                    <Icon
                      icon="material-symbols:remove"
                      width="16"
                      height="16"
                    />
                  </button>
                </div>
                <div>
                  <span className="text-center">{subCategory.amount}</span>
                </div>
                <div>
                  <button
                    className="rounded-full bg-gray-200 p-2 min-h-8 min-w-8"
                    onClick={() => {
                      increaseAmountSubCategory(
                        userId.toString(),
                        product.id,
                        subCategory.subCategory.id
                      )
                    }}
                  >
                    <Icon icon="material-symbols:add" width="16" height="16" />
                  </button>
                </div>
              </div>
              <div className="flex items-center justify-center gap-2 w-full">
                <span className="font-light truncate max-w-[170px]">
                  $ {subCategory.subCategory.price} /{" "}
                  {subCategory.subCategory.date}
                </span>
              </div>
              <div className="flex items-center justify-center md:justify-start">
                <Button
                  variant="secondary"
                  className="text-xs py-1 w-fit"
                  size="sm"
                  onClick={() =>
                    deleteSubCategory(
                      userId.toString(),
                      product.id,
                      subCategory.subCategory.id
                    )
                  }
                >
                  <Icon icon="material-symbols:delete" width="24" height="24" />
                </Button>
              </div>
            </div>
          ))}
        {cartProduct.subCategory != undefined && (
          <span className="text-center">
            {" "}
            total: ${" "}
            {cartProduct.subCategory
              .map(
                (subCategory: SubCategoryCart) =>
                  subCategory.amount * subCategory.subCategory.price
              )
              .reduce((a, b) => a + b, 0)}
          </span>
        )}
        {cartProduct.subCategory == undefined &&
          cartProduct.amount != undefined && (
            <span className="text-center">
              {" "}
              total: $ {product.price * cartProduct.amount}
            </span>
          )}
      </section>
    </li>
  )
}
