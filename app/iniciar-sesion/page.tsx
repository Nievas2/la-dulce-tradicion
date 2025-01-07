"use client"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { login, loginGoogle } from "@/services/AuthService"
import { loginSchema } from "@/utils/schemas/LoginSchema"
import { Icon } from "@iconify/react/dist/iconify.js"
import { useMutation } from "@tanstack/react-query"
import { useFormik } from "formik"
import Link from "next/link"
import { useState } from "react"
import { GoogleOAuthProvider, googleLogout } from "@react-oauth/google"
import { GoogleLogin } from "@react-oauth/google"
import { useGoogleLogin } from "@react-oauth/google"
import axios from "axios"
import { decodeJwt } from "@/utils/decodeJwt"
import Cookies from "js-cookie"
const page = () => {
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState(false)
  const googleLogin = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      const userInfo = await axios
        .get("https://www.googleapis.com/oauth2/v3/userinfo", {
          headers: { Authorization: `Bearer ${tokenResponse.access_token}` },
        })
        .then(async (res) => {
          const final = res.data
          const response = await loginGoogle(tokenResponse.access_token)
          if (response) {
            const data = decodeJwt(response.data.token)
            const user = {
              user: data,
              token: response.data.token,
            }
            localStorage.setItem("user", JSON.stringify(user))
            Cookies.set("token", response.data.token)
            window.location.href = "/"
          } else {
            setError(true)
          }
        })
        .catch((error) => {
          console.log(error)
        })
    },
  })
  const togglePasswordVisibility = () => {
    setShowPassword((prevState) => !prevState)
  }
  const mutate = useMutation({
    mutationFn: login,
    onSuccess: (data) => {
      const userToken = decodeJwt(data.token)
      const user = {
        user: userToken,
        token: data.token,
      }
      localStorage.setItem("user", JSON.stringify(user))
      Cookies.set("token", data.token)
      window.location.href = "/"
    },
    onError: (error) => {
      console.log(error)
    },
  })
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: loginSchema,
    onSubmit: (values) => {
      mutate.mutate(values)
    },
  })
  return (
    <div className="bg-no-repeat bg-cover bg-center bg-[url('/fondos/fondos1.jpg')] w-full max-w-8xl min-h-screen">
      <div className="flex justify-center items-center h-screen">
        <div className="border border-white bg-white p-4 w-[440px] gap-2 rounded-md">
          <div className="flex flex-col gap-2">
            <div className="flex">
              <h5 className="text-lg text-wrap font-semibold">
                Gracias por volver! Inicia sesion para realizar tu proxima
                compra.
              </h5>
            </div>

            <form
              className="flex flex-col gap-3"
              onSubmit={formik.handleSubmit}
            >
              <Label>Email</Label>
              <Input
                className="form-control"
                type="email"
                placeholder="Escribe tu email"
                {...formik.getFieldProps("email")}
                disabled={mutate.isPending}
              />
              {formik.touched.email && formik.errors.email && (
                <small className="text-red-500">{formik.errors.email}</small>
              )}
              <Label>Contraseña</Label>
              <div className="relative">
                <Input
                  className="form-control"
                  type={showPassword ? "text" : "password"}
                  placeholder="************"
                  {...formik.getFieldProps("password")}
                  disabled={mutate.isPending}
                />
                {formik.touched.password && formik.errors.password && (
                  <small className="text-red-500">
                    {formik.errors.password}
                  </small>
                )}
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  onClick={togglePasswordVisibility}
                >
                  <Icon
                    className={`h-5 w-5 text-black transition-opacity duration-200 ${
                      showPassword ? "opacity-100" : "opacity-0"
                    }`}
                    icon="ph:eye-bold"
                  />
                  <Icon
                    className={`h-5 w-5 text-black transition-opacity duration-200 absolute ${
                      showPassword ? "opacity-0" : "opacity-100"
                    }`}
                    icon="ph:eye-closed-bold"
                  />
                </button>
              </div>
              <div className="flex flex-col gap-4">
                <Button className="w-full" variant="secondary" type="submit">
                  login
                </Button>
                <div className="flex items-center before:mt-0.5 before:flex-1 before:border-t before:border-black after:mt-0.5 after:flex-1 after:border-t after:border-black dark:before:border-light dark:after:border-light">
                  <p className="mx-4 mb-0 text-center dark:text-white">o</p>
                </div>
                <button
                  onClick={() => googleLogin()}
                  type="button"
                  className="text-black w-full p-2 flex items-center justify-center gap-2 border border-black hover:bg-slate-200 rounded-md"
                >
                  <Icon icon="devicon:google" width="24" height="24" />
                  Continuá con google
                </button>
              {error && (
                <small className="text-red-500">Error al iniciar sesion</small>
              )}
              <h5 className="text-sm">
                Si no tiene una cuenta puede crearse una desde{" "}
                <Link className="text-blue-800 font-bold" href="registro">
                  aqui
                </Link>
              </h5>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
export default page
