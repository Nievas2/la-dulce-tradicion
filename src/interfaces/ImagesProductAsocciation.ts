import { ImageProduct } from "./ImageProduct";

export interface ImagesProductAsocciations {
    id:number,
    ImageProductId: number,
    ProductId: number,
    ImageProduct : ImageProduct
}