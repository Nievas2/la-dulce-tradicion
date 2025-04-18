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
import axios, { AxiosError } from "axios"
import { decodeJwt } from "@/utils/decodeJwt"
import Cookies from "js-cookie"
const page = () => {
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
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
            Cookies.set("token", response.data.token, {
              expires: 30,
            })
            window.location.href = "/"
          } else {
            setError(true)
          }
        })
        .catch((error) => {
          setError(error.response.data.message)
          console.log(error)
        })
        .finally(() => {
          setLoading(false)
        })
    },
  })

  const togglePasswordVisibility = () => {
    setShowPassword((prevState) => !prevState)
  }

  const mutation = useMutation({
    mutationFn: login,
    onSuccess: (data) => {
      const userToken = decodeJwt(data.token)
      const user = {
        user: userToken,
        token: data.token,
      }
      console.log(data)
      Cookies.set("token", data.token, {
        expires: 30,
      })
      window.location.href = "/"
    },
    onError: (error) => {
      setError(true)
    },
  })

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: loginSchema,
    onSubmit: (values) => {
      mutation.mutate(values)
    },
  })

  return (
    <main className="bg-no-repeat bg-cover bg-center bg-[url('/background.jpeg')] w-full max-w-8xl min-h-screen">
      <div className="flex justify-center items-center h-screen">
        <div className="border border-black bg-main p-4 w-[440px] gap-2 rounded-md">
          <div className="flex flex-col gap-2">
            <div className="flex flex-col items-center justify-center">
              <p className="text-lg text-wrap font-semibold">
                Gracias por volver!
              </p>
              <p className="text-lg text-wrap font-semibold">
                Inicia sesion para realizar tu proxima compra.
              </p>
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
                disabled={mutation.isPending}
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
                  disabled={mutation.isPending}
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
                  disabled={mutation.isPending}
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
              {/* {error ||
                (mutation.error && (
                  <small className=" font-bold text-red-500">
                    Error al iniciar sesion, verfique su contraseña o email.{" "}
                    <br />
                    Si el error persiste, Verifique que se haya registrado
                    anteriormente.
                  </small>
                ))} */}

              {mutation.error instanceof AxiosError &&
                mutation.error.response && (
                  <small className="text-red-500 font-bold">
                    {mutation.error.response.data.message}
                  </small>
                )}

              <div className="flex flex-col gap-4">
                <Button
                  className="w-full"
                  variant="secondary"
                  type="submit"
                  disabled={mutation.isPending}
                >
                  Iniciar sesion
                </Button>
                <div className="flex items-center before:mt-0.5 before:flex-1 before:border-t before:border-black after:mt-0.5 after:flex-1 after:border-t after:border-black dark:before:border-light dark:after:border-light">
                  <p className="mx-4 mb-0 text-center dark:text-white">o</p>
                </div>
                <button
                  onClick={() => {
                    setLoading(true)
                    googleLogin()
                  }}
                  type="button"
                  disabled={mutation.isPending || loading}
                  className="bg-white text-black w-full p-2 flex items-center justify-center gap-2 border border-black hover:bg-gray-200 transition-colors duration-200 rounded-md"
                >
                  {loading ? (
                    <>
                      <Icon
                        icon="eos-icons:bubble-loading"
                        width="24"
                        height="24"
                      />{" "}
                      Cargando
                    </>
                  ) : (
                    <>
                      <Icon icon="devicon:google" width="24" height="24" />{" "}
                      Continuár con google
                    </>
                  )}
                </button>

                <h5 className="text-sm">
                  Si no tiene una cuenta puede crearse una desde{" "}
                  <Link className="text-blue-800 font-bold" href="registro">
                    aquí
                  </Link>
                </h5>
                <h5 className="text-sm">
                  ¿Olvidaste tu contraseña?{" "}
                  <Link
                    className="text-blue-800 font-bold"
                    href="actualizar-contrasena"
                  >
                    aquí
                  </Link>
                </h5>
              </div>
            </form>
          </div>
        </div>
      </div>
    </main>
  )
}
export default page
