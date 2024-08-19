import { ImagesProductAsocciations } from "./ImagesProductAsocciation"
import { SubCategoryProduct } from "./SubCategoryProduct"

export interface Producto {
  id: number
  name: string
  description: string
  price: number
  image: string
  CategoryName: string
  SubCategoryProducts: [SubCategoryProduct]
  ImagesProductAsocciations: [ImagesProductAsocciations]
}