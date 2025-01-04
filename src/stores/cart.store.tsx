import { Product } from "@/interfaces/Product"
import { SubCategory } from "@/interfaces/SubCategory"
import { StateCreator, create } from "zustand"
import { persist } from "zustand/middleware"
import { immer } from "zustand/middleware/immer"
export interface CartProducts {
  product: Product
  amount: number
  subCategory: SubCategory
}

interface CartState {
  cart: { userId: string; products: CartProducts[] }[]
  addProduct: ({
    userId,
    product,
  }: {
    userId: string
    product: CartProducts
  }) => void
  deleteProductFromCart: (userId: string, productId: number) => void
  findCartByUserId: (userId: string) => CartProducts[]
  decreaseAmountProduct: (userId: string, productId: number) => void
  increaseAmountProduct: (userId: string, productId: number) => void
  clearCart: (userId: string) => void
}

const storeApi: StateCreator<CartState, [["zustand/immer", never]]> = (
  set
) => ({
  cart: [],

  // Función para agregar un producto al carrito de un usuario
  addProduct: ({
    userId,
    product
  }: {
    userId: string
    product: CartProducts
  }) => {
    set((state) => {
      const existingIndex = state.cart.findIndex(
        (product: any) => product.userId === userId
      ) // Busca el índice de los productos del usuario
      if (existingIndex !== -1) {

        // Si ya existen, agrega la nueva Product a la lista
        state.cart[existingIndex].products.push(product)
        // Actualiza el localStorage con la nueva lista de products
        localStorage.setItem(
          `cart-${userId}`,
          JSON.stringify(state.cart[existingIndex].products)
        )
      } else {
        // Si no existen, crea una nueva entrada y agrega la Product
        const newProducts = { userId, products: [product] }
        state.cart.push(newProducts)
        // Actualiza el localStorage con la nueva lista de products
        localStorage.setItem(
          `cart-${userId}`,
          JSON.stringify(newProducts.products)
        )
      }
    })
  },

  // Función para eliminar un producto del carrito de un usuario
  deleteProductFromCart: (userId: string, productId: number) => {
    set((state) => {
      const existingIndex = state.cart.findIndex(
        (product: any) => product.userId === Number(userId)
      ) // Busca el índice de los productos del usuario

      if (existingIndex !== -1) {
        // Si existen productos, filtra la Product que se desea eliminar
        const filteredProducts = (state.cart[existingIndex].products =
          state.cart[existingIndex].products.filter(
            (product: any) => product.product.id !== productId
          ))

        state.cart[existingIndex].products = filteredProducts
        // Actualiza el localStorage con la nueva lista de products
        localStorage.setItem(
          `cart-${userId}`,
          JSON.stringify(state.cart[existingIndex].products)
        )
      }
    })
  },

  // Función para obtener los productos de un usuario
  findCartByUserId(userId?: string) {
    return (
      this.cart.find((product) => product.userId === userId)?.products || []
    )
  },

  decreaseAmountProduct(userId, productId) {
    set((state) => {
      const existingIndex = state.cart[0].products.findIndex(
        (product: CartProducts) => product.product.id === productId
      ) // Busca el índice de los productos del usuario

      if (existingIndex !== -1) {
        state.cart[0].products[existingIndex].amount -= 1
        localStorage.setItem(
          `cart-${userId}`,
          JSON.stringify(state.cart[0].products)
        )
      }
    })
  },

  increaseAmountProduct(userId, productId) {
    set((state) => {
      const existingIndex = state.cart[0].products.findIndex(
        (product: CartProducts) => product.product.id === productId
      ) // Busca el índice de los productos del usuario
      if (existingIndex !== -1) {
        state.cart[0].products[existingIndex].amount += 1
        localStorage.setItem(
          `cart-${userId}`,
          JSON.stringify(state.cart[0].products)
        )
      }
    })
  },
  clearCart(userId) {
    set((state)=>{
      const existingIndex = state.cart.findIndex(
        (product: any) => product.userId === Number(userId)
      ) 
      
      if (existingIndex !== -1) {
        localStorage.removeItem(
          `cart-${userId}`
        )
        state.cart[existingIndex] = {
          userId: userId,
          products: []
        }
      }
    })
  },
})

export const useCartStore = create<CartState>()(
  persist(immer(storeApi), {
    name: "Cart-storage",
  })
)