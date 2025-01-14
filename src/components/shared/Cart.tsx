"use client"
import { useAuthContext } from "@/contexts/auth-context"
import { Button } from "../ui/button"
import { Icon } from "@iconify/react/dist/iconify.js"
import { useMutation } from "@tanstack/react-query"
import { CartProducts, useCartStore } from "@/stores/cart.store"
import { Product } from "@/interfaces/Product"

interface CartProps {
  cartOpen: boolean
  setCartOpen: Function
}
export default function Cart({ cartOpen, setCartOpen }: CartProps) {
  const { authUser } = useAuthContext()

  const products = useCartStore(
    (state) =>
      state.cart.find((product) => product.userId === authUser?.user.id) ?.products
  )
/* .find((product) => {product.userId === authUser?.user.id})
        ?.products || [] */
  const increaseAmountProduct = useCartStore(
    (state) => state.increaseAmountProduct
  )
  const decreaseAmountProduct = useCartStore(
    (state) => state.decreaseAmountProduct
  )

  const clearCart = useCartStore((state) => state.clearCart)

  let subtotal: number = 0

 /*  if (products) {
    products.forEach((product: CartProducts) => {
      subtotal += product.amount * product.product.price
    })
  } */

  function handleSubmit() {
    if (products != undefined && products.length > 0) {
      window.location.href = "/ticket"
    }
  }

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
          {products &&
            products.map((product: CartProducts) => (
              <CartCard
                key={crypto.randomUUID()}
                amount={product.amount}
                product={product.product}
                cartProduct={product}
                userId={Number(authUser!.user.id)}
                decreaseAmountProduct={decreaseAmountProduct}
                increaseAmountProduct={increaseAmountProduct}
              />
            ))}

          {products?.length === 0 && (
            <p className="text-center">No hay productos en el carrito</p>
          )}
        </ol>
        <div className="flex flex-col w-full gap-8">
          <div className="flex">
            <span className="w-full">Subtotal: </span>
            <span className="w-full text-end">$ {subtotal}</span>
          </div>

          <Button
            variant="main"
            className="flex gap-2 w-full"
            onClick={handleSubmit}
          >
            <Icon
              icon="material-symbols:shopping-cart"
              width="24"
              height="24"
            />
            Ir al ticket
          </Button>
        </div>
      </div>
    </div>
  )
}

interface CartCardProps {
  product: Product
  amount: number | undefined
  increaseAmountProduct: Function
  decreaseAmountProduct: Function
  userId: number
  cartProduct : CartProducts
}

function CartCard({
  product,
  amount,
  decreaseAmountProduct,
  increaseAmountProduct,
  userId,
  cartProduct
}: CartCardProps) {
  const deleteProductFromCart = useCartStore(
    (state) => state.deleteProductFromCart
  )
  function handleDeleteProduct() {
    deleteProductFromCart(userId.toString(), product.id!)
  }
  return (
    <li className="flex gap-4 w-full">
      <section className="flex flex-col w-full gap-2">
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

              <div className="flex items-center justify-center md:justify-start">
                <Button
                  variant="secondary"
                  className="text-xs py-1 w-[80%]"
                  onClick={handleDeleteProduct}
                >
                 
                </Button>
               {/*  {cartProduct.subCategory[0].date} */}
              </div>
            </div>

            <div className="flex items-center justify-center gap-2 max-w-[110px]">
              <div>
                <button
                  className="rounded-full bg-gray-200 p-2 min-h-8 min-w-8"
                  /* onClick={() => {
                    if (amount > 1) {
                      decreaseAmountProduct(userId, product.id)
                    }
                  }} */
                >
                  <Icon icon="material-symbols:remove" width="16" height="16" />
                </button>
              </div>
              <div>
                <span className="text-center">{amount}</span>
              </div>
              <div>
                <button
                  className="rounded-full bg-gray-200 p-2 min-h-8 min-w-8"
                  onClick={() => increaseAmountProduct(userId, product.id)}
                >
                  <Icon icon="material-symbols:add" width="16" height="16" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </li>
  )
}
