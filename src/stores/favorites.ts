import { Product } from "@/interfaces/Product"
import { StateCreator, create } from "zustand"
import { persist } from "zustand/middleware"
import { immer } from "zustand/middleware/immer"

interface FavoriteState {
  favorites: { userId: string; products: Product[] } []
  addFavoriteProduct: (userId: string, product: Product) => void
  deleteFavoriteProduct: (userId: string, productId: number) => void
  setUserFavorites: (userId: string, products: Product[]) => void
  findFavoritesByUserId: (userId: string) => Product[]
}

const storeApi: StateCreator<FavoriteState, [["zustand/immer", never]]> = (
  set
) => ({
  favorites: [],

  // Función para establecer o actualizar los favoritos de un usuario
  setUserFavorites: (userId: string, products: Product[]) => {
    set((state) => {
      const existingIndex = state.favorites.findIndex(
        (fav: any) => fav.userId === userId
      ) // Busca el índice de los favoritos del usuario
      if (existingIndex !== -1) {
        // Si ya existen favoritos para el usuario, actualiza la lista de products
        state.favorites[existingIndex].products = products
      } else {
        // Si no existen, crea una nueva entrada en el arreglo de favoritos
        state.favorites.push({ userId, products })
      }
    })
  },

  // Función para agregar una Product a los favoritos de un usuario
  addFavoriteProduct: (userId: string, product: Product) => {
    set((state) => {
      const existingIndex = state.favorites.findIndex(
        (fav: any) => fav.userId === userId
      ) // Busca el índice de los favoritos del usuario
      if (existingIndex !== -1) {
        // Si ya existen, agrega la nueva Product a la lista
        state.favorites[existingIndex].products.push(product)
        // Actualiza el localStorage con la nueva lista de products
        localStorage.setItem(
          `favorites-${userId}`,
          JSON.stringify(state.favorites[existingIndex].products)
        )
      } else {
        // Si no existen, crea una nueva entrada y agrega la Product
        const newFavorites = { userId, products: [product] }
        state.favorites.push(newFavorites)
        // Actualiza el localStorage con la nueva lista de products
        localStorage.setItem(
          `favorites-${userId}`,
          JSON.stringify(newFavorites.products)
        )
      }
    })
  },

  // Función para eliminar una Product de los favoritos de un usuario
  deleteFavoriteProduct: (userId: string, productId: number) => {
    set((state) => {
      const existingIndex = state.favorites.findIndex(
        (fav: any) => fav.userId === userId
      ) // Busca el índice de los favoritos del usuario
      if (existingIndex !== -1) {
        // Si existen favoritos, filtra la Product que se desea eliminar
        state.favorites[existingIndex].products = state.favorites[
          existingIndex
        ].products.filter((fav: any) => fav.id !== productId)
        // Actualiza el localStorage con la nueva lista de products
        localStorage.setItem(
          `favorites-${userId}`,
          JSON.stringify(state.favorites[existingIndex].products)
        )
      }
    })
  },

  // Función para obtener los favoritos de un usuario
  findFavoritesByUserId(userId? : string) {
    return this.favorites.find((fav) => fav.userId === userId)?.products || []
  },
})

export const useFavoriteStore = create<FavoriteState>()(
  persist(immer(storeApi), {
    name: "Product-storage",
  })
)
