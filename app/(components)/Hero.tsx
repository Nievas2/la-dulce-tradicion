"use client"
import Search from "@/components/shared/Search"
import { Icon } from "@iconify/react/dist/iconify.js"
import { useFormik } from "formik"
import { useRouter } from "next/navigation"
import { useState } from "react"

const Hero = () => {
  const [text, setText] = useState("")
  const router = useRouter()

  /*   function searchProduct() {
    router.push(`/products?page=1&query=${text}`)
  } */

  const formik = useFormik({
    initialValues: {
      query: "",
    },
    onSubmit: (values) => {
      router.push(`/productos?page=1&query=${values.query}`)
    },
  })
  return (
    /* bg-[url('/hero.jpg')] */
    <section className=" w-full h-[90vh] flex justify-center items-center bg-[url('/hero.jpg')] bg-cover bg-no-repeat">
      <div className="p-4 flex flex-col items-center justify-center gap-6">
        <div className="px-1 py-2 border border-main rounded-full">
          <img
            src="/flor.png"
            alt="logo"
            height={40}
            width={40}
          />
        </div>

        <h1 className="font-sans font-bold leading-10 tracking-wide text-5xl text-white">
          Tortas, mesa dulce, lunch y más...
        </h1>

        <h2 className="font-sans font-semibold leading-2 tracking-wide text-lg text-white">
          Que producto estabas buscando..
        </h2>

        <form className="flex w-full relative" onSubmit={formik.handleSubmit}>
          <input
            className="block w-full rounded-md rounded-r-none border border-secondary py-[9px] px-2 text-sm font-semibold outline-1 outline-secondary placeholder:font-medium placeholder:text-red-main"
            placeholder="Escribe aquí"
            {...formik.getFieldProps("query")}
            /* onChange={(e) => {
              setText(e.target.value)
                          }} */
          />

          {text && (
            <button
              className="absolute right-16 top-1/2 -translate-y-1/2 z-0"
              onClick={() => setText("")}
            >
              <Icon
                icon="material-symbols:close"
                className="text-secondary"
                width="24"
                height="24"
              />
            </button>
          )}
          <button
            className="flex items-center justify-center rounded-r-md border border-secondary bg-main px-4"
            /*  onClick={searchProduct} */
            type="submit"
          >
            <Icon icon="mdi:search" width="24" height="24" />
          </button>
        </form>
      </div>
    </section>
  )
}
export default Hero
