import axiosInstance from "@/api/axiosInstance"
import { ImageProduct } from "@/interfaces/ImageProduct"
import { ImageProductForm } from "../../app/admins/imageproduct/(components)/ChangeImageProduct"

export function getImageProducts() {
  try {
    const response = axiosInstance.get("imageproduct")
    return response
  } catch (error) {
    throw error
  }
}


export function getImageProductById(id: number) {
  try {
    const response = axiosInstance.get(`imageproduct/${id}`)
    return response
  } catch (error) {
    throw error
  }
}


export function postImageProduct(imageProduct: ImageProductForm) {
  try {
    const response = axiosInstance.post("imageproduct", imageProduct)
    return response
  } catch (error) {
    throw error
  }
}



export function putImageProduct(image : string, Product : number) {
  try {
    console.log(image, Product);
    
    const response = axiosInstance.put(`imageproduct/edit/${Product}`, {image})
    return response
  } catch (error) {
    throw error
  }
}



export function deleteImageProduct(id: number) {
  try {
    const response = axiosInstance.delete(`imageproduct/${id}`)
    return response
  } catch (error) {
    throw error
  }
}


