"use client"
import { useFormik } from "formik"
import { useEffect, useState } from "react"
import Cookies from "js-cookie"
import { decodeJwt } from "@/utils/decodeJwt"
import { Button } from "@/components/ui/button"
export default function Send({
  product,
  defaultValue
}: {
  product: number
  defaultValue: number | string | null
}) {
  const [finished, setFinished] = useState(false)

  const formik = useFormik({
    initialValues: {
      price: defaultValue
    },
    onSubmit: async (values) => {
      try {
        const token = Cookies.get("token")
        if (!token) return
        const user = decodeJwt(token)
        if(values.price?.toString().length == 0) values.price = null
        
        const response = await fetch("/api/updatePrice", {
          method: "PUT",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            id: product,
            price: values.price,
            email: user.email
          })
        })

        if (!response.ok) {
          throw new Error("Error al actualizar el precio")
        }
        setFinished(true)
      } catch (error) {
        console.error("Error:", error)
      }
    }
  })

  return (
    <div className="relative flex flex-1 flex-shrink-0">
      <form
        onSubmit={formik.handleSubmit}
        className="flex gap-2"
      >
        <input
          className={`peer block w-full rounded-md border ${
            finished ? "border-green-600 bg-green-200" : "border-gray-200"
          } py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500`}
          defaultValue={defaultValue || ""}
          onChange={(e) => formik.setFieldValue("price", e.target.value)}
        />
        <Button variant="secondary" type="submit">Enviar</Button>
      </form>
    </div>
  )
}
