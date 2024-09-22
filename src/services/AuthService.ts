import axiosInstance from "@/api/axiosInstance"
import { LoginData } from "@/interfaces/Login"
import db from "../../db"

export async function login(login: LoginData) {
  try {
    const response = await axiosInstance.post("auth", login)
    return response.data
  } catch (error) {
    throw error
  }
}
export async function loginGoogle(token: string) {
  try {
    const response = await axiosInstance.post("auth/login/google", {
      token: token
    })
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

