import axiosInstance from "@/api/axiosInstance"
import { ImageProduct } from "@/interfaces/ImageProduct"

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


export function postImageProduct(imageProduct: ImageProduct) {
  try {
    const response = axiosInstance.post("imageproduct", imageProduct)
    return response
  } catch (error) {
    throw error
  }
}



export function putImageProduct(imageProduct: ImageProduct, id: number) {
  try {
    const response = axiosInstance.put(`imageproduct/${id}`, imageProduct)
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


