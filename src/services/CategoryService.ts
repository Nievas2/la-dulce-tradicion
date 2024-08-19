import axiosInstance from "@/api/axiosInstance"
import { Category } from "@/interfaces/Category"

export async function getCategories() {
  try {
    const response = axiosInstance.get("categories")
    return response
  } catch (error) {
    throw error
  }
}

export async function getCategoryById(id: number) {
  try {
    const response = axiosInstance.get(`categories/${id}`)
    return response
  } catch (error) {
    throw error
  }
}

export async function postCategory(Category: Category) {
  try {
    const response = axiosInstance.post("categories", Category)
    return response
  } catch (error) {
    throw error
  }
}

export async function putCategory(Category: Category, id: number) {
  try {
    const response = axiosInstance.put(`categories/${id}`, Category)
    return response
  } catch (error) {
    throw error
  }
}

export async function deleteCategory(id: number) {
  try {
    const response = axiosInstance.delete(`categories/${id}`)
    return response
  } catch (error) {
    throw error
  }
}

export async function getCategoriesProduct(CategoryName: string) {
  try {
    const response = axiosInstance.get(`categories/product/${CategoryName}`)
    return response
  } catch (error) {
    throw error
  }
}
