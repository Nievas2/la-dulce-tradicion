import axiosInstance from "@/api/axiosInstance"

export function login(email: string, password: string) {
  try {
    const response = axiosInstance.post("auth/login", { email, password })
    return response
  } catch (error) {
    throw error
  }
}

export function passwordRecovery(email: string) {
  try {
    const response = axiosInstance.post("user/passwordrecovery", { email })
    return response
  } catch (error) {
    throw error
  }
}

export function createPassword(password: string) {
  try {
    const response = axiosInstance.post("user/createpassword", { password })
    return response
  } catch (error) {
    throw error
  }
}
