"use client"
import axios from "axios"
import Cookies from "js-cookie"

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_URL_BACK,
  withCredentials: false
})

axiosInstance.interceptors.request.use(
  function (config: any) {    
    const user = localStorage.getItem("user")
    const data = JSON.parse(user!)
    if (data) {
      const token = data.token
      
      config.headers.Authorization = `Bearer ${token}`  
    }

    return config
  },

  function (error: any) {
    return Promise.reject(error)
  }
)

axiosInstance.interceptors.response.use(
  function (response: any) {
    return response
  },

  function (error: any) {
    if (error.response.status === 401) {
      localStorage.removeItem("user")
      Cookies.remove("token")
      window.location.href = "/iniciar-sesion"
    }

    return Promise.reject(error)
  }
)

export default axiosInstance
