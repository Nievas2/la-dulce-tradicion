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

export function postImageProduct(imageProduct: FormData, id: number) {
  try {
    const response = axiosInstance.post(`imageproduct/add/${id}`, imageProduct)
    return response
  } catch (error) {
    throw error
  }
}

export function putImageProduct(image: FormData, imageId: number) {
  try {
    const response = axiosInstance.put(`imageproduct/edit/${imageId}`, image)
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
