import { Category } from "./Category"
import { ImagesProductAsocciations } from "./ImagesProductAsocciation"
import { SubCategoryProduct } from "./SubCategoryProduct"

export interface Product {
  id: number
  name: string
  description: string
  price: number
  image: string
  Category: Category
  SubCategoryProducts: [SubCategoryProduct]
  ImagesProductAsocciations: [ImagesProductAsocciations]
}