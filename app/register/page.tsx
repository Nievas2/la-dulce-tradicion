"use client"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { postUser } from "@/services/UserService"
import { UserSchema } from "@/utils/schemas/UserSchema"
import { Icon } from "@iconify/react/dist/iconify.js"
import { useMutation } from "@tanstack/react-query"
import { useFormik } from "formik"
import Link from "next/link"
import { GoogleOAuthProvider, googleLogout } from "@react-oauth/google"
import { GoogleLogin } from "@react-oauth/google"
import { useGoogleLogin } from "@react-oauth/google"
import axios from "axios"
import { decodeJwt } from "@/utils/decodeJwt"
import { useState } from "react"
import { loginGoogle } from "@/services/AuthService"
const page = () => {
  const [error, setError] = useState(false)
  const [password, setPassword] = useState("password")
  const [confirmPassword, setConfirmPassword] = useState("password")
  const mutation = useMutation({
    mutationFn: postUser,
    onSuccess: (data) => {
      console.log(data)
    },
    onError: (error) => {
      console.log(error)
    },
  })
  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema: UserSchema,
    onSubmit: (values) => {
      const { confirmPassword, ...data } = values
      mutation.mutate(data)
    },
  })
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
  return (
    <div className="bg-no-repeat bg-cover bg-center bg-[url('/fondos/fondos3.jpg')] w-full max-w-8xl">
      <div className="flex justify-center items-center min-h-screen py-8">
        <div className="border border-white bg-main p-4 rounded-md">
          <div className="flex flex-col">
            <h5 className="font-bold text-xl text-center">Registro</h5>

            <form
              className="flex flex-col gap-2"
              onSubmit={formik.handleSubmit}
            >
              <div>
                <Label>Nombres </Label>
                <Input
                  type="text"
                  placeholder="Escribe tus nombres"
                  {...formik.getFieldProps("firstName")}
                  disabled={mutation.isPending}
                />
                {formik.touched.firstName && formik.errors.firstName && (
                  <small className="font-bold text-[#ff4444]">
                    {formik.errors.firstName}
                  </small>
                )}
              </div>
              <div>
                <Label>Apellidos </Label>
                <Input
                  type="text"
                  placeholder="Escribe tu/s apellido/s"
                  {...formik.getFieldProps("lastName")}
                  disabled={mutation.isPending}
                />
                {formik.touched.lastName && formik.errors.lastName && (
                  <small className="font-bold text-[#ff4444]">
                    {formik.errors.lastName}
                  </small>
                )}
              </div>
              <div>
                <Label>Teléfono</Label>
                <Input
                  type="text"
                  placeholder="Escribe tu numero de telefono"
                  {...formik.getFieldProps("phone")}
                  disabled={mutation.isPending}
                />
                {formik.touched.phone && formik.errors.phone && (
                  <small className="font-bold text-[#ff4444]">
                    {formik.errors.phone}
                  </small>
                )}
              </div>
              <div>
                <Label>Email</Label>
                <Input
                  type="email"
                  placeholder="Escribe tu email"
                  {...formik.getFieldProps("email")}
                  disabled={mutation.isPending}
                />
                {formik.touched.email && formik.errors.email && (
                  <small className="font-bold text-[#ff4444]">
                    {formik.errors.email}
                  </small>
                )}
              </div>
              <div>
                <Label>Contraseña:</Label>
                <div className="relative">
                  <Input
                    type={password}
                    placeholder="************"
                    {...formik.getFieldProps("password")}
                    disabled={mutation.isPending}
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                    onClick={() =>
                      setPassword(password === "password" ? "text" : "password")
                    }
                  >
                    <Icon
                      className={`h-5 w-5 text-black transition-opacity duration-200 ${
                        password == "password" ? "opacity-100" : "opacity-0"
                      }`}
                      icon="ph:eye-bold"
                    />
                    <Icon
                      className={`h-5 w-5 text-black transition-opacity duration-200 absolute ${
                        password == "password" ? "opacity-0" : "opacity-100"
                      }`}
                      icon="ph:eye-closed-bold"
                    />
                  </button>
                </div>
                {formik.touched.password && formik.errors.password && (
                  <small className="font-bold text-[#ff4444]">
                    {formik.errors.password}
                  </small>
                )}
              </div>
              <div>
                <Label>Repetir contraseña</Label>
                <div className="relative">
                  <Input
                    type={confirmPassword}
                    placeholder="************"
                    {...formik.getFieldProps("confirmPassword")}
                    disabled={mutation.isPending}
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                    onClick={() =>
                      setConfirmPassword(
                        confirmPassword === "password" ? "text" : "password"
                      )
                    }
                  >
                    <Icon
                      className={`h-5 w-5 text-black transition-opacity duration-200 ${
                        confirmPassword == "password"
                          ? "opacity-100"
                          : "opacity-0"
                      }`}
                      icon="ph:eye-bold"
                    />
                    <Icon
                      className={`h-5 w-5 text-black transition-opacity duration-200 absolute ${
                        confirmPassword == "password"
                          ? "opacity-0"
                          : "opacity-100"
                      }`}
                      icon="ph:eye-closed-bold"
                    />
                  </button>
                </div>
                {formik.touched.confirmPassword &&
                  formik.errors.confirmPassword && (
                    <small className="font-bold text-[#ff4444]">
                      {formik.errors.confirmPassword}
                    </small>
                  )}
              </div>
              <div className="flex flex-col gap-4">
                <Button
                  className="text-white w-full"
                  type="submit"
                  variant="secondary"
                >
                  Suscribirse
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
                  <small className="text-red-500">
                    Error al iniciar sesion
                  </small>
                )}
                <h5 className="text-center">
                  Si ya tiene una cuenta puede ingresar desde{" "}
                  <Link className="text-blue-800 font-bold" href="/login">
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
