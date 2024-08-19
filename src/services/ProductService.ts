import axiosInstance from "@/api/axiosInstance"
import { Producto } from "@/interfaces/Product"

export async function getProducts() {
  try {
    const response = axiosInstance.get("product")
    return response
  } catch (error) {
    throw error
  }
}

export async function getProductById(id: number) {
  try {
    const response = axiosInstance.get(`product/${id}`)
    return response
  } catch (error) {
    throw error
  }
}

export async function postProduct(product: Producto) {
  try {
    const response = axiosInstance.post("product", product)
    return response
  } catch (error) {
    throw error
  }
}

export async function putProduct(product: Producto, id: number) {
  try {
    const response = axiosInstance.put(`product/${id}`, product)
    return response
  } catch (error) {
    throw error
  }
}

export async function deleteProduct(id: number) {
  try {
    const response = axiosInstance.delete(`product/${id}`)
    return response
  } catch (error) {
    throw error
  }
}
