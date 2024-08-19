import axios from "axios"

const axiosInstance = axios.create({
  baseURL: process.env.URL_BACK,
  withCredentials: true
})

axiosInstance.interceptors.request.use(
  function (config: any) {
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
