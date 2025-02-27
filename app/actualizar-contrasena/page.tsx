"use client"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { passwordRecovery, passwordReset } from "@/services/AuthService"
import { ResetPasswordSchema } from "@/utils/schemas/UserSchema"
import { Icon } from "@iconify/react/dist/iconify.js"
import { useMutation } from "@tanstack/react-query"
import { AxiosError } from "axios"
import { useFormik } from "formik"
import { useRouter } from "next/navigation"
import { useState } from "react"
import * as Yup from "yup"

const page = () => {
  const [password, setPassword] = useState("password")
  const [confirmPassword, setConfirmPassword] = useState("password")
  const [step, setStep] = useState(1)
  const { push } = useRouter()
  /* Password Recovery */
  const {
    getFieldProps: getFieldPropsEmail,
    handleSubmit: handleSubmitEmail,
    errors: errorsEmail,
    touched: touchedEmail,
  } = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email("Formato invalido")
        .required("El email es requerido"),
    }),
    onSubmit: async (values) => {
      mutateRecoveryPassword(values.email)
    },
  })

  const { mutate: mutateRecoveryPassword, isPending: isPendingRecovery } =
    useMutation({
      mutationFn: (email: string) => passwordRecovery(email),
      onSuccess: (data) => {
        setStep(2)
      },
    })

  /* Reset Password */

  const {
    getFieldProps: getFieldPropsResetPassword,
    handleSubmit: handleSubmitResetPassword,
    errors: errorsResetPassword,
    touched: touchedResetPassword,
  } = useFormik({
    initialValues: {
      email: "",
      code: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema: ResetPasswordSchema,
    onSubmit: async (values) => {
      mutateResetPassword(values)
    },
  })

  const {
    mutate: mutateResetPassword,
    isPending: isPendingResetPassword,
    error,
  } = useMutation({
    mutationFn: (values: {
      email: string
      code: string
      password: string
      confirmPassword: string
    }) => {
      if (values.password !== values.confirmPassword) {
        console.log("Las contraseñas no coinciden")

        return Promise.reject(new Error("Las contraseñas no coinciden"))
      }
      return passwordReset(values.code, values.password, values.email)
    },
    onSuccess: (data) => {
      push("/iniciar-sesion")
    },
  })

  return (
    <main className="bg-no-repeat bg-cover bg-center bg-[url('/background.jpeg')] w-full max-w-8xl min-h-screen">
      <div className="flex justify-center items-center h-screen">
        <div className="flex flex-col gap-6 border border-black bg-main p-4 w-[440px] rounded-md">
          <h3 className="text-2xl text-center">Restablecer contraseña</h3>
          {step == 1 && (
            <form className="flex flex-col gap-4" onSubmit={handleSubmitEmail}>
              <Label>Ingrese su email</Label>
              <Input
                placeholder="example@gmail.com"
                {...getFieldPropsEmail("email")}
                disabled={isPendingRecovery}
              />
              {touchedEmail.email && errorsEmail.email && (
                <small className="font-bold text-[#ff4444]">
                  {errorsEmail.email}
                </small>
              )}
              <div className="flex justify-center items.center">
                <Button
                  variant="secondary"
                  type="submit"
                  disabled={isPendingRecovery}
                >
                  Enviar
                </Button>
              </div>
            </form>
          )}

          {step == 2 && (
            <form
              className="flex flex-col gap-6"
              onSubmit={handleSubmitResetPassword}
            >
              <span>Se le envio un correo para restablecer su contraseña</span>
              <div className="flex flex-col gap-6">
                <div className="flex flex-col gap-2">
                  <Label>Ingrese su email</Label>
                  <Input
                    {...getFieldPropsResetPassword("email")}
                    placeholder="example@gmail.com"
                  />
                  {touchedResetPassword.email && errorsResetPassword.email && (
                    <small className="text-red-500 font-bold">
                      {errorsResetPassword.email}
                    </small>
                  )}
                </div>

                <div className="flex flex-col gap-2">
                  <Label>Ingrese el codigo</Label>
                  <Input
                    {...getFieldPropsResetPassword("code")}
                    placeholder="123456"
                  />
                  {touchedResetPassword.code && errorsResetPassword.code && (
                    <small className="text-red-500 font-bold">
                      {errorsResetPassword.code}
                    </small>
                  )}
                </div>

                <div className="flex flex-col gap-2">
                  <Label>Ingrese su nueva contraseña</Label>
                  <div className="relative">
                    <Input
                      {...getFieldPropsResetPassword("password")}
                      type={password}
                      placeholder="**********"
                    />
                    <button
                      type="button"
                      className="absolute inset-y-0 right-0 pr-3 flex items-center"
                      onClick={() =>
                        setPassword(
                          password === "password" ? "text" : "password"
                        )
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
                  {touchedResetPassword.password &&
                    errorsResetPassword.password && (
                      <small className="text-red-500 font-bold">
                        {errorsResetPassword.password}
                      </small>
                    )}
                </div>

                <div className="flex flex-col gap-2">
                  <Label>Confirme su nueva contraseña</Label>
                  <div className="relative">
                    <Input
                      {...getFieldPropsResetPassword("confirmPassword")}
                      type={confirmPassword}
                      placeholder="**********"
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
                  {touchedResetPassword.confirmPassword &&
                    errorsResetPassword.confirmPassword && (
                      <small className="text-red-500 font-bold">
                        {errorsResetPassword.confirmPassword}
                      </small>
                    )}
                </div>

                {error instanceof AxiosError && error.response ? (
                  <small className="text-red-500 font-bold">
                    {error.response.data.message}
                  </small>
                ) : (
                  <small className="text-red-500 font-bold">
                    {error?.message}
                  </small>
                )}

                <div className="flex justify-center items-center">
                  <Button type="submit" variant="secondary">
                    Actualizar contraseña
                  </Button>
                </div>
              </div>
            </form>
          )}
        </div>
      </div>
    </main>
  )
}
export default page
