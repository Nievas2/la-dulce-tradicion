import axiosInstance from "@/api/axiosInstance"

export async function uploadImage(formData: FormData) {
  try {
    const response = await axiosInstance.post("/image/upload", formData)
    return response
  } catch (error) {
    throw error
  }
}
