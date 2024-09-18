import axiosInstance from "@/api/axiosInstance"
import { Category } from "@/interfaces/Category"
import { CategoryForm } from "../../app/admins/categories/add/page"

export async function getCategories() : Promise<any> {
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

export async function postCategory(Category: CategoryForm) {
  try {
    const response = axiosInstance.post("category/add", {
      name: Category.name,
      image: Category.image
    })
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
