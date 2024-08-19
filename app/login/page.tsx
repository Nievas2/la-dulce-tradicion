"use client"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { login } from "@/services/AuthService"
import { loginSchema } from "@/utils/schemas/LoginSchema"
import { Icon } from "@iconify/react/dist/iconify.js"
import { useMutation } from "@tanstack/react-query"
import { useFormik } from "formik"
import Link from "next/link"
import { useState } from "react"

const page = () => {
  const [showPassword, setShowPassword] = useState(false)
  const togglePasswordVisibility = () => {
    setShowPassword((prevState) => !prevState)
  }
  const mutate = useMutation({
    mutationFn: login,
    onSuccess: (data) => {
      localStorage.setItem("user-token", data.token)
      window.location.href = "/"
    },
    onError: (error) => {
      console.log(error)
    }
  })
  const formik = useFormik({
    initialValues: {
      email: "",
      password: ""
    },
    validationSchema:loginSchema,
    onSubmit: (values) => {
      mutate.mutate(values)
      console.log(values)
    }
  })
  return (
    <div className="bg-no-repeat bg-cover bg-center bg-[url('/fondos/fondos1.jpg')] w-full max-w-7xl">
      <div className="flex justify-center items-center h-screen">
        <div className="border border-white bg-white py-2 px-4 w-[440px] gap-2 rounded-md">
          <div className="flex flex-col gap-2">
            <div className="flex">
              <h5 className="text-lg text-wrap font-semibold">
                Gracias por volver! Inicia sesion para realizar tu proxima
                compra
              </h5>
            </div>

            <h5 className="font-bold">Iniciar sesion</h5>

            <form className="flex flex-col gap-3" onSubmit={formik.handleSubmit}>
              <Label>Email</Label>
              <Input
                className="form-control"
                type="email"
                placeholder="Escribe tu email"
                {...formik.getFieldProps("email")}
                disabled={mutate.isPending}
              />
              {
                formik.touched.email && formik.errors.email && (
                  <small className="text-red-500">{formik.errors.email}</small>
                )
              }
              <Label>Contraseña</Label>
              <div className="relative">
                <Input
                  className="form-control"
                  type={showPassword ? "text" : "password"}
                  placeholder="************"
                  {...formik.getFieldProps("password")}
                  disabled={mutate.isPending}
                />
                {
                  formik.touched.password && formik.errors.password && (
                    <small className="text-red-500">{formik.errors.password}</small>
                  )
                }
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

              <Button
                className="text-white w-full"
                variant="secondary"
                type="submit"
              >
                login
              </Button>
              <h5 className="text-sm">
                Si no tiene una cuenta puede crearse una desde{" "}
                <Link
                  className="text-blue-800 font-bold"
                  href="register"
                >
                  aqui
                </Link>
              </h5>
            </form>
          </div>
          {/* <Link href="recuperarcontraseña" className="">Recuperar contraseña</Link> */}

          {/* <h5 className="text-center">
            Si tiene problemas con su código ingrese
            <a href="crear-codigo">aqui</a>
          </h5> */}
        </div>
      </div>
    </div>
  )
}
export default page
