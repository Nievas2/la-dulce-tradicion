import axiosInstance from "@/api/axiosInstance"
import { User } from "@/interfaces/User"

export function postTicket(email: string, mensage: string) {
  try {
    const response = axiosInstance.post("/ticket", { email, mensage })
    return response
  } catch (error) {
    throw error
  }
}

export function patchAdmins(userId: number) {
  try {
    const response = axiosInstance.patch("user/admins", { userId })
    return response
  } catch (error) {
    throw error
  }
}

export function getUsers() {
  try {
    const response = axiosInstance.get("user")
    return response
  } catch (error) {
    throw error
  }
}

export function getUser(id: number) {
  try {
    const response = axiosInstance.get("user/" + id)
    return response
  } catch (error) {
    throw error
  }
}

export function postUser(user: User) {
  try {
    const response = axiosInstance.post("user", user)
    return response
  } catch (error) {
    throw error
  }
}

export function createCode(email: string) {
  try {
    const response = axiosInstance.post("user/createnewcode", { email })
    return response
  } catch (error) {
    throw error
  }
}

export function putUser(user: User, id: number) {
  try {
    const response = axiosInstance.put("user/" + id, user)
    return response
  } catch (error) {
    throw error
  }
}

export function deleteUser(id: number) {
  try {
    const response = axiosInstance.delete("user/" + id)
    return response
  } catch (error) {
    throw error
  }
}

export function getUserByEmail(email: string) {
  try {
    const response = axiosInstance.get("user/email/" + email)
    return response
  } catch (error) {
    throw error
  }
}

export function validateCode(email: string, code: string) {
  try {
    const response = axiosInstance.get(
      "user/validatecode/" + email + "/" + code
    )
    return response
  } catch (error) {
    throw error
  }
}

export function postContact(mensage: string, email: string) {
  try {
    const response = axiosInstance.post("user/contact/" + email, { mensage })
    return response
  } catch (error) {
    throw error
  }
}


