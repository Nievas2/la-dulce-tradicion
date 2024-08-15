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
      description: ""
    },
    validationSchema: ContactSchema,
    onSubmit: (values) => {
      setFinished(true)
      console.log(values)
    }
  })
  return (
    <div className="bg-no-repeat bg-cover bg-center bg-[url('/fondos/fondos7.jfif')] w-full max-w-7xl">
      <div className="flex flex-1 justify-center items-center h-screen">
        <div className="w-50 border border-white">
          <div>
            <div className="flex flex-col sm:flex-row bg-quaternary p-2">
              <div className="flex flex-col basis-1/2 justify-center items-center">
                <img
                  src="/sinfondo.webp"
                  className="w-[340px] h-[200px]"
                  id="center"
                  alt="logo"
                />
                <h2
                  className="text-white font-bold text-xl"
                  id="Contacto"
                >
                  PASTELERIA Y ALGO MÁS
                </h2>

                <div>
                  <div className="insta text-white flex flex-col justify-content items-center">
                    <Icon
                      icon="mdi:instagram"
                      width="50"
                      height="50"
                    />
                    <h5 className="text-white font-bold">INSTAGRAM</h5>
                    <a
                      href="https://www.instagram.com/ladulcetradicionpilar"
                      target="_blank"
                      className="decoration-none text-white"
                    >
                      <h5 className="enlaces">@ladulcetradicionpilar</h5>
                    </a>
                  </div>
                  <div className="whatsapp flex flex-col justify-content items-center">
                    <Icon
                      icon="ic:baseline-whatsapp"
                      width="50"
                      height="50"
                      color="#fff"
                    />
                    <h5 className="text-white font-bold">WHATSAPP</h5>
                    <a
                      href="https://wa.me/c/5491162569879"
                      target="_blank"
                      className="decoration-none text-white"
                    >
                      <h5 className="enlaces">11-6256-9879</h5>
                    </a>
                  </div>
                  <div className="ubicacion flex flex-col justify-content items-center">
                    <Icon
                      icon="bxs:map"
                      width="50"
                      height="50"
                      color="#fff"
                    />
                    <h5 className="text-white font-bold">UBICACION</h5>
                    <a
                      href="https://maps.app.goo.gl/QtHhp3iW9NbVMtwb6"
                      target="_blank"
                      className="decoration-none text-white"
                    >
                      <h5 className="blocka enlaces">
                        PILAR,BUENOS AIRES, ARGENTINA
                      </h5>
                    </a>
                  </div>
                </div>
              </div>
              <div className="flex flex-col basis-1/2">
                <div className="m-3">
                  <h5 className="text-lg">
                    ¡Hola! <br />
                    ¿Estas buscando hacer un evento en especial?
                    <br />
                    ¿O tenes alguna otra consulta?
                    <br />
                    Por ejemplo con el tipo de comida que buscabas, fecha y
                    cantidad de invitados.
                    <br />
                    Dejanos tu duda a la brevedad te estaremos respondiendo!
                    <br />
                    ¡Saludos, Flor & Lucas!
                  </h5>
                </div>
                <form
                  className="m-3"
                  onSubmit={formik.handleSubmit}
                >
                  <div className="mb-2 form-floating">
                    <Textarea
                      className="form-control"
                      placeholder="Escriba su consulta"
                      {...formik.getFieldProps("description")}
                      disabled={finished}
                    />
                    {formik.touched.description &&
                      formik.errors.description && (
                        <small className="font-bold text-[#ff4444]">
                          {formik.errors.description}
                        </small>
                      )}
                  </div>
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
                              className="text-white w-full rounded-[6px]"
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
                        ¡Para poder hacer compras es necesario que este
                        logueado, por favor redirijase{" "}
                        <Link href="/login">aquí</Link>
                      </h4>
                    </div>
                  )}
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
export default page
