import { Producto } from "./Product"
export interface Category {
  id: number
  name: string
  image: string
  Products: [Producto]
}
