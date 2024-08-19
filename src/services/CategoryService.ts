import axiosInstance from "@/api/axiosInstance"
import { Category } from "@/interfaces/Category"

export async function getCategories() {
  try {
    const response = axiosInstance.get("category")
    return response
  } catch (error) {
    throw error
  }
}

export async function getCategoryById(id: number) {
  try {
    const response = axiosInstance.get(`category/${id}`)
    return response
  } catch (error) {
    throw error
  }
}

export async function postCategory(Category: Category) {
  try {
    const response = axiosInstance.post("category", Category)
    return response
  } catch (error) {
    throw error
  }
}

export async function putCategory(Category: Category, id: number) {
  try {
    const response = axiosInstance.put(`category/${id}`, Category)
    return response
  } catch (error) {
    throw error
  }
}

export async function deleteCategory(id: number) {
  try {
    const response = axiosInstance.delete(`category/${id}`)
    return response
  } catch (error) {
    throw error
  }
}

export async function getCategoriesProduct(CategoryName: string) {
  try {
    const response = axiosInstance.get(`category/product/${CategoryName}`)
    return response
  } catch (error) {
    throw error
  }
}
