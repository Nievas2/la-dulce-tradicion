"use client"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { ContactSchema } from "@/utils/schemas/ContactSchema"
import { Icon } from "@iconify/react"
import { useFormik } from "formik"
import Link from "next/link"
import { useState } from "react"
const page = () => {
  const [finished, setFinished] = useState(false)
  const logueado = true
  const formik = useFormik({
    initialValues: {
      description: "",
    },
    validationSchema: ContactSchema,
    onSubmit: (values) => {
      setFinished(true)
    },
  })
  return (
    <main className="flex justify-center items-center bg-no-repeat bg-cover bg-center bg-[url('/fondos/fondos1.jpg')] w-full min-h-screen max-w-8xl py-8 text-black">
      <section className="flex flex-col bg-main p-8 w-[80%] rounded-lg gap-4 shadow-lg shadow-gray-400">
        <div className="flex md:hidden flex-col items-center justify-center w-full">
          <img
            src="/flor.png"
            id="center"
            alt="logo"
            width={100}
            height={100}
          />
          <h2 className="font-bold text-xl text-center">
            PASTELERÍA Y ALGO MÁS
          </h2>
        </div>
        <div className="flex flex-col-reverse md:flex-row gap-8">
          <div className="flex flex-col basis-5/12 justify-center items-start gap-4">
            <div className="hidden md:flex flex-col items-center justify-center w-full ">
              <img
                src="/flor.png"
                id="center"
                alt="logo"
                width={100}
                height={100}
              />
              <h2 className=" font-bold text-xl text-center">
                PASTELERIA Y ALGO MÁS
              </h2>
            </div>

            <div className="flex flex-col gap-4">
              <a
                href="https://www.instagram.com/ladulcetradicionpilar"
                target="_blank"
                className="decoration-none flex flex-row justify-content items-center gap-4 w-full"
              >
                <Icon icon="mdi:instagram" width="50" height="50" />
                <div className="flex flex-col">
                  <h5 className=" font-bold">INSTAGRAM</h5>
                  <h5 className="enlaces">@ladulcetradicionpilar</h5>
                </div>
              </a>

              <a
                href="https://wa.me/c/5491162569879"
                target="_blank"
                className="decoration-none flex flex-row justify-content items-center gap-4 w-full"
              >
                <Icon icon="ic:baseline-whatsapp" width="50" height="50" />

                <div className="flex flex-col">
                  <h5 className="font-bold">WHATSAPP</h5>
                  <h5 className="enlaces">11-6256-9879</h5>
                </div>
              </a>

              <a
                href="https://maps.app.goo.gl/QtHhp3iW9NbVMtwb6"
                target="_blank"
                className="decoration-none flex flex-row justify-content items-center gap-4 w-full"
              >
                <Icon icon="bxs:map" width="50" height="50" />

                <div className="flex flex-col">
                  <h5 className="font-bold">UBICACIÓN</h5>
                  <h5 className="blocka enlaces">
                    PILAR,BUENOS AIRES, ARGENTINA
                  </h5>
                </div>
              </a>
            </div>
          </div>

          <div className="flex flex-col basis-7/12 gap-4">
            <div className="flex flex-col gap-4 font-medium text-lg">
              <p className="leading-7">
                ¡Hola! Somos Flor y Lucas, desde 2018 dedicados a la cocina.
                Elaboramos todo lo que necesites para comer rico y abundante en
                tu proximo evento.
              </p>
              <p>No dudes en contactarnos!</p>
            </div>

            <form
              className="flex flex-col gap-4"
              onSubmit={formik.handleSubmit}
            >
              <Textarea
                className="form-control"
                placeholder="Escriba su consulta"
                rows={5}
                {...formik.getFieldProps("description")}
                disabled={finished}
              />
              {formik.touched.description && formik.errors.description && (
                <small className="font-bold text-[#ff4444]">
                  {formik.errors.description}
                </small>
              )}

              {logueado ? (
                <div>
                  {finished ? (
                    <p>
                      Hemos recibido su correo, pronto estaremos dandole una
                      respuesta via email, ¡Muchas gracias!
                    </p>
                  ) : (
                    <>
                      <div className="flex ">
                        <Button
                          className="w-full rounded-[6px]"
                          variant="secondary"
                          type="submit"
                        >
                          Enviar
                        </Button>
                      </div>
                    </>
                  )}
                </div>
              ) : (
                <div className="rounded p-2">
                  <h4>
                    ¡Para poder hacer compras es necesario que este logueado,
                    por favor redirijase <Link href="/iniciar-sesion">aquí</Link>
                  </h4>
                </div>
              )}
            </form>
          </div>
        </div>
      </section>
    </main>
  )
}
export default page
