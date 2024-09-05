import axiosInstance from "@/api/axiosInstance"
import { SubCategory } from "@/interfaces/SubCategory"
import { SubCategoryForm } from "../../app/admins/subcategories/(components)/ChangeSubCategory"

export function getSubCategories() {
  try {
    const response = axiosInstance.get("subcategory")
    return response
  } catch (error) {
    throw error
  }
}

export function getSubCategoryById(id: number) {
  try {
    const response = axiosInstance.get(`subcategory/${id}`)
    return response
  } catch (error) {
    throw error
  }
}

export function postSubCategory(subCategory: SubCategoryForm) {
  try {
    const response = axiosInstance.post("subcategory", subCategory)
    return response
  } catch (error) {
    throw error
  }
}

export function putSubCategory(subCategory: SubCategoryForm, id: number) {
  try {
    console.log(subCategory, id);
    
    const response = axiosInstance.put(`subcategory/edit/${id}`, subCategory)
    return response
  } catch (error) {
    throw error
  }
}

export function deleteSubCategory(id: number) {
  try {
    const response = axiosInstance.delete(`subcategory/${id}`)
    return response
  } catch (error) {
    throw error
  }
}
