import { Product } from "@/interfaces/Product"
import { SubCategory } from "@/interfaces/SubCategory"
import { StateCreator, create } from "zustand"
import { persist } from "zustand/middleware"
import { immer } from "zustand/middleware/immer"
export interface SubCategoryCart {
  subCategory: SubCategory
  amount: number
}
export interface CartProducts {
  product: Product
  amount?: number
  subCategory?: SubCategoryCart[]
}

interface CartState {
  cart: { userId: string; products: CartProducts[] }[]
  getProductsByUserId: (userId: string) => {
    userId: string
    products: CartProducts[]
  }
  addProduct: ({
    userId,
    product,
  }: {
    userId: string
    product: CartProducts
  }) => void
  addSubCategory: ({
    userId,
    productCart,
  }: {
    userId: string
    productCart: CartProducts
  }) => void
  deleteProductFromCart: (userId: string, productId: number) => void
  findCartByUserId: (userId: string) => CartProducts[]
  decreaseAmountProduct: (userId: string, productId: number) => void
  increaseAmountProduct: (userId: string, productId: number) => void
  decreaseAmountSubCategory: (
    userId: string,
    productId: number,
    subCategoryId: number
  ) => void
  increaseAmountSubCategory: (
    userId: string,
    productId: number,
    subCategoryId: number
  ) => void
  deleteSubCategory: (
    userId: string,
    productId: number,
    subCategoryId: number
  ) => void
  clearCart: (userId: string) => void
}

const storeApi: StateCreator<CartState, [["zustand/immer", never]]> = (
  set
) => ({
  cart: [],

  // Función para agregar un producto al carrito de un usuario
  addProduct: ({
    userId,
    product,
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
  getProductsByUserId: (userId) => {
    const cartItem = useCartStore
      .getState()
      .cart.find((cartItem) => cartItem.userId === userId)
    return cartItem || { userId, products: [] } // Devuelve un valor por defecto si no encuentra el carrito
  },

  addSubCategory({ userId, productCart }) {
    console.log(productCart)

    set((state) => {
      const existingIndex = state.cart.findIndex(
        (product: any) => product.userId === userId
      ) // Busca el índice de los productos del usuario
      if (existingIndex !== -1) {
        // Si ya existen, agrega la nueva Product a la lista
        state.cart[existingIndex].products.forEach((product: any) => {
          if (
            product.product.id === productCart.product.id &&
            productCart.subCategory != undefined
          ) {
            product.subCategory.push(productCart.subCategory[0])
          }
        })
        // Actualiza el localStorage con la nueva lista de products
        localStorage.setItem(
          `cart-${userId}`,
          JSON.stringify(state.cart[existingIndex].products)
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

      if (
        existingIndex !== -1 &&
        state.cart[0].products[existingIndex].amount != undefined
      ) {
        state.cart[0].products[existingIndex].amount -= 1
        localStorage.setItem(
          `cart-${userId}`,
          JSON.stringify(state.cart[0].products)
        )
      }
    })
  },
  decreaseAmountSubCategory(userId, productId, subCategoryId) {
    set((state) => {
      const existingIndex = state.cart.findIndex(
        (product: any) => product.userId === Number(userId)
      )
      if (existingIndex !== -1) {
        state.cart[existingIndex].products.forEach(
          (product: CartProducts, index: number) => {
            if (
              product.product.id === productId &&
              product.subCategory != undefined
            ) {
              // Busca la subcategoría específica y reduce su `amount`
              const subCategory = product.subCategory.findIndex(
                (subCategory: SubCategoryCart) => {
                  return subCategory.subCategory.id === subCategoryId
                }
              )

              if (subCategory >= 0) {
                product.subCategory[subCategory].amount -= 1 // decrementa el valor
              }
            }
          }
        )
        // Guarda el carrito actualizado en localStorage
        localStorage.setItem(
          `cart-${userId}`,
          JSON.stringify(state.cart[existingIndex].products)
        )
      }
    })
  },

  increaseAmountProduct(userId, productId) {
    set((state) => {
      const existingIndex = state.cart[0].products.findIndex(
        (product: CartProducts) => product.product.id === productId
      ) // Busca el índice de los productos del usuario
      if (
        existingIndex !== -1 &&
        state.cart[0].products[existingIndex].amount != undefined
      ) {
        state.cart[0].products[existingIndex].amount += 1
        localStorage.setItem(
          `cart-${userId}`,
          JSON.stringify(state.cart[0].products)
        )
      }
    })
  },

  increaseAmountSubCategory(userId, productId, subCategoryId) {
    set((state) => {
      const existingIndex = state.cart.findIndex(
        (product: any) => product.userId === Number(userId)
      )
      if (existingIndex !== -1) {
        state.cart[existingIndex].products.forEach(
          (product: CartProducts, index: number) => {
            if (
              product.product.id === productId &&
              product.subCategory != undefined
            ) {
              // Busca la subcategoría específica y aumenta su `amount`
              const subCategory = product.subCategory.findIndex(
                (subCategory: SubCategoryCart) => {
                  return subCategory.subCategory.id === subCategoryId
                }
              )

              if (subCategory >= 0) {
                product.subCategory[subCategory].amount += 1 // Incrementa el valor
              }
            }
          }
        )
        // Guarda el carrito actualizado en localStorage
        localStorage.setItem(
          `cart-${userId}`,
          JSON.stringify(state.cart[existingIndex].products)
        )
      }
    })
  },

  deleteSubCategory(userId, productId, subCategoryId) {
    set((state) => {
      const existingIndex = state.cart.findIndex(
        (product: any) => product.userId === Number(userId)
      )
  
      if (existingIndex !== -1) {
        const updatedProducts = state.cart[existingIndex].products.map((product) => {
          if (
            product.product.id === productId &&
            product.subCategory !== undefined
          ) {
            // Filtrar las subcategorías eliminando la específica
            const updatedSubCategories = product.subCategory.filter(
              (subCategory) => subCategory.subCategory.id !== subCategoryId
            );
  
            if (updatedSubCategories.length === 0) {
              // Si no quedan subcategorías, eliminamos el producto
              return null;
            }
  
            // Si quedan subcategorías, actualizamos el producto
            return {
              ...product,
              subCategory: updatedSubCategories,
            };
          }
          return product;
        });
  
        // Filtramos los productos eliminados (aquellos que retornaron `null`)
        const filteredProducts = updatedProducts.filter(
          (product) => product !== null
        );
  
        // Actualizamos el carrito con los productos restantes
        const updatedCart = state.cart.map((cartItem, index) => {
          if (index === existingIndex) {
            return {
              ...cartItem,
              products: filteredProducts,
            };
          }
          return cartItem;
        });
  
        // Guardar el estado actualizado
        state.cart = updatedCart;
  
        // Guarda el carrito actualizado en localStorage
        localStorage.setItem(
          `cart-${userId}`,
          JSON.stringify(updatedCart[existingIndex].products)
        );
      }
    });
  },
  
  
  clearCart(userId) {
    set((state) => {
      const existingIndex = state.cart.findIndex(
        (product: any) => product.userId === Number(userId)
      )

      if (existingIndex !== -1) {
        localStorage.removeItem(`cart-${userId}`)
        state.cart[existingIndex] = {
          userId: userId,
          products: [],
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
