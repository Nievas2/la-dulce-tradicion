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
export interface SubCategoryProduct {
  id: number
  ProductId: number
  SubCategoryId: number
  SubCategory: SubCategory
}
export interface ImagesProductAsocciations {
  id: number
  ImageProductId: number
  ProductId: number
  ImageProduct: ImageProduct
}
export interface ImageProduct{
    id: number;
    image: string;
    Product: number;
}
export interface SubCategory{
    id: number;
    date: string;
    price:number
    Product: number;
}
