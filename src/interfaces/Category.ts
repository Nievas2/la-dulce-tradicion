import { Product } from "./Product"
export interface Category {
  id?: number
  name: string
  image: string
  Products?: [Product]
}
