import axiosInstance from "@/api/axiosInstance"
import { ProductForm } from "../../app/admins/products/(components)/ChangeProduct"
import db from "../../db"

export async function getProducts(
  page: number,
  query: string,
  categoryId: string
) {
  try {
    const response = axiosInstance.get(
      "product/" + page + "?query=" + query + "&categoryId=" + categoryId
    )
    return response
  } catch (error) {
    throw error
  }
}

export async function getProductById(id: number) {
  try {
    const response = axiosInstance.get(`product/get/${id}`)
    return response
  } catch (error) {
    throw error
  }
}

export async function getProductByName(name: string) {
  try {
    const response = axiosInstance.get(`product/name/${name}`)
    return response
  } catch (error) {
    throw error
  }
}

export async function postProduct(product: ProductForm) {
  console.log(product)

  try {
    const response = axiosInstance.post("product", product)
    return response
  } catch (error) {
    throw error
  }
}

export async function putProduct(product: ProductForm, id: number) {
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
