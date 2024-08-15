"use client"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Icon } from "@iconify/react/dist/iconify.js"
import Link from "next/link"
import { useState } from "react"

const page = () => {
  const [showPassword, setShowPassword] = useState(false)
  const togglePasswordVisibility = () => {
    setShowPassword((prevState) => !prevState)
  }
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

            <form className="flex flex-col gap-3">
              <Label>Email</Label>
              <Input
                className="form-control"
                name="email"
                type="email"
                placeholder="Escribe tu email"
              />
              <Label>Contraseña</Label>
              <div className="relative">
                <Input
                  className="form-control"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="************"
                />
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
