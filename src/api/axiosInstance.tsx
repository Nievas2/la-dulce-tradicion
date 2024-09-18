"use client"
import axios from "axios"

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

export default axiosInstance
