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
  const mutation = useMutation({
    mutationFn: postUser,
    onSuccess: (data) => {
      console.log(data)
    },
    onError: (error) => {
      console.log(error)
    }
  })
  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      password: "",
      confirmPassword: ""
    },
    validationSchema: UserSchema,
    onSubmit: (values) => {
      const { confirmPassword, ...data } = values
      mutation.mutate(data)
    }
  })
  const googleLogin = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      const userInfo = await axios
        .get("https://www.googleapis.com/oauth2/v3/userinfo", {
          headers: { Authorization: `Bearer ${tokenResponse.access_token}` }
        })
        .then(async (res) => {
          const final = res.data
          const response = await loginGoogle(tokenResponse.access_token)
          if (response) {
            const data = decodeJwt(response.data.tokenValue)
            console.log(response.data.tokenValue)
            const user = {
              user: data,
              token: response.data.tokenValue
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
    }
  })
  return (
    <div className="bg-no-repeat bg-cover bg-center bg-[url('/fondos/fondos3.jpg')] w-full max-w-8xl">
      <div className="flex justify-center items-center min-h-screen">
        <div className="border border-white bg-main py-2 px-4 rounded-md">
          <div className="flex flex-col">
            {/* <div className="flex">
              <h5>
                Hola! registrate en nuestra pagina para recibir novedades y que
                la proxima compra sea mas rapido.
              </h5>
            </div> */}
            <div className="flex">
              <h5 className="font-bold text-xl">Registro</h5>
            </div>
            <form
              className="flex flex-col gap-2"
              onSubmit={formik.handleSubmit}
            >
              <div>
                <Label>Nombres </Label>
                <Input
                  className="form-control"
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
                  className="form-control"
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
                  className="form-control"
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
                  className="form-control"
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
                <Input
                  className="form-control"
                  type="password"
                  placeholder="************"
                  {...formik.getFieldProps("password")}
                  disabled={mutation.isPending}
                />
                {formik.touched.password && formik.errors.password && (
                  <small className="font-bold text-[#ff4444]">
                    {formik.errors.password}
                  </small>
                )}
              </div>
              <div>
                <Label>Repetir contraseña</Label>
                <Input
                  className="form-control"
                  type="password"
                  placeholder="************"
                  {...formik.getFieldProps("confirmPassword")}
                  disabled={mutation.isPending}
                />
                {formik.touched.confirmPassword &&
                  formik.errors.confirmPassword && (
                    <small className="font-bold text-[#ff4444]">
                      {formik.errors.confirmPassword}
                    </small>
                  )}
              </div>
              <div className="flex">
                <Button
                  className="text-white w-full"
                  type="submit"
                  variant="secondary"
                >
                  Suscribirse
                </Button>
                <button
                  onClick={() => googleLogin()}
                  type="button"
                  className="text-black w-full p-2 flex items-center justify-center gap-2 border border-black hover:bg-slate-200 rounded-md"
                >
                  <Icon
                    icon="devicon:google"
                    width="24"
                    height="24"
                  />
                  Continuá con google
                </button>
                {error && (
                  <small className="text-red-500">
                    Error al iniciar sesion
                  </small>
                )}
              </div>
            </form>
            <h5 className="text-center">
              Si ya tiene una cuenta puede ingresar desde aqui{" "}
              <Link
                className="text-blue-800 font-bold"
                href="/login"
              >
                aqui
              </Link>
            </h5>
          </div>
          <div className="flex">
            {/* <h2 className="p-4">
          ESTAS A UN PASO DE CREAR TU CUENTA <br />
          <br />
  
          Te enviamos un link a tu email {{ user.email }} para que valides que
          eres tú.
        </h2> */}
            {/* <div className="flex m-2">
          <Button
            className="btn"
          >
            Login
          </Button>
        </div> */}
          </div>
        </div>
      </div>
    </div>
  )
}
export default page
