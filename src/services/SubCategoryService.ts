import axiosInstance from "@/api/axiosInstance"
import { SubCategory } from "@/interfaces/SubCategory"

export function getSubCategories() {
  try {
    const response = axiosInstance.get("sub-category")
    return response
  } catch (error) {
    throw error
  }
}

export function getSubCategoryById(id: number) {
  try {
    const response = axiosInstance.get(`sub-category/${id}`)
    return response
  } catch (error) {
    throw error
  }
}

export function postSubCategory(subCategory: SubCategory) {
  try {
    const response = axiosInstance.post("sub-category", subCategory)
    return response
  } catch (error) {
    throw error
  }
}

export function putSubCategory(subCategory: SubCategory, id: number) {
  try {
    const response = axiosInstance.put(`sub-category/${id}`, subCategory)
    return response
  } catch (error) {
    throw error
  }
}

export function deleteSubCategory(id: number) {
  try {
    const response = axiosInstance.delete(`sub-category/${id}`)
    return response
  } catch (error) {
    throw error
  }
}
