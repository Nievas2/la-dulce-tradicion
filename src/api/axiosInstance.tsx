"use client"
import axios from "axios"

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_URL_BACK,
  withCredentials: false
})

axiosInstance.interceptors.request.use(
  function (config: any) {
    console.log(process.env.NEXT_PUBLIC_URL_BACK);
    
    const token = localStorage.getItem("user-token")

    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }

    return config
  },

  function (error: any) {
    return Promise.reject(error)
  }
)

export default axiosInstance
