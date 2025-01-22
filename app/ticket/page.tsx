"use client"
import { useAuthContext } from "@/contexts/auth-context"
import { checkCart } from "@/services/ProductService"
import { useCartStore } from "@/stores/cart.store"
import { useMutation } from "@tanstack/react-query"
import { useEffect, useState } from "react"
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import Image from "next/image"

const NEXT_PUBLIC_PHONE = process.env.NEXT_PUBLIC_PHONE

export interface CheckPrices {
  products: { id: number; price: number }[] // Cambiado de `[{ id: number; price: number }]`
  subcategories: { id: number; price: number }[] // Cambiado de `[{ id: number; price: number }]`
}

const page = () => {
  const [success, setSuccess] = useState("")
  const [cart, setCart] = useState<CheckPrices>({
    products: [],
    subcategories: [],
  })
  const [total, setTotal] = useState(0)
  const { authUser } = useAuthContext()
  const productStore = useCartStore((state) =>
    state.cart.find(
      (productStorage) => productStorage.userId === authUser?.user.id
    )
  )

  const { mutate, data, isSuccess } = useMutation({
    mutationKey: ["check-prices"],
    mutationFn: () => {
      return checkCart(cart)
    },
  })

  useEffect(() => {
    if (productStore != undefined && productStore?.products.length > 0) {
      let body: CheckPrices = {
        products: [],
        subcategories: [],
      }

      productStore.products.map((cartProducts) => {
        if (cartProducts.subCategory != undefined) {
          cartProducts.subCategory.map((subcategory) => {
            let subcategoryObject = {
              id: subcategory.subCategory.id,
              price: subcategory.subCategory.price,
            }
            body.subcategories.push(subcategoryObject)
          })
        } else {
          let productObject = {
            id: cartProducts.product.id,
            price: cartProducts.product.price,
          }
          body.products.push(productObject)
        }
      })
      setCart(body)
      mutate()
      console.log(body)
    }
  }, [productStore])

  useEffect(() => {
    console.log(data?.data)

    if (
      data?.data.productDiscrepancies.length === 0 &&
      data?.data.subcategoryDiscrepancies.length === 0
    )
      return setSuccess("Carrito cargado correctamente")

    if (data?.data.productDiscrepancies.length > 0) {
      console.log("hay discrepancias en products")
      data?.data.productDiscrepancies.map(
        (discrepancy: { id: number; price: number }) => {
          productStore?.products.forEach((product) => {
            if (product.product.id === discrepancy.id) {
              product.product.price = discrepancy.price
            }
          })
        }
      )
    }

    if (data?.data.subcategoryDiscrepancies.length > 0) {
      console.log("hay discrepancias en subcategories")
      data?.data.subcategoryDiscrepancies.map(
        (discrepancy: { id: number; price: number }) => {
          productStore?.products.forEach((product) => {
            if (product.subCategory != undefined) {
              product.subCategory.forEach((subcategory) => {
                if (subcategory.subCategory.id === discrepancy.id) {
                  subcategory.subCategory.price = discrepancy.price
                }
              })
            }
          })
        }
      )
    }
    setSuccess("debido a un error, los precios se han actualizado")
    let subtotal = 0
    productStore?.products.map((product) => {
      if (product.subCategory != undefined) {
        product.subCategory.map((subcategory) => {
          subtotal += subcategory.amount * subcategory.subCategory.price
        })
      }
      if (product.amount != undefined) {
        subtotal += product.amount * product.product.price
      }
    })
    setTotal(subtotal)
  }, [data])

  function handleSubmit() {
    const whatsAppUrl = `https://wa.me/${NEXT_PUBLIC_PHONE}?text=`
    window.open(whatsAppUrl, "_self")
  }

  return (
    <section className="flex flex-col w-full min-h-[78vh] items-center justify-center p-0 sm:p-2 gap-6 relative">
      <img
        src={"/svgs/Blob.svg"}
        height={300}
        width={300}
        alt="blob"
        className="absolute top-0 right-0 z-0"
      />
      <img
        src={"/svgs/Blob2.svg"}
        height={300}
        width={300}
        alt="blob"
        className="absolute bottom-0 left-0 z-0"
      />
      <img
        src={"/svgs/Blob3.svg"}
        height={150}
        width={150}
        alt="blob"
        className="hidden md:block absolute bottom-10 left-[450px] z-0"
      />
      <img
        src={"/svgs/Blob4.svg"}
        height={100}
        width={100}
        alt="blob"
        className="hidden md:block absolute bottom-28 right-64 z-0"
      />
      <img
        src={"/svgs/Blob3.svg"}
        height={100}
        width={100}
        alt="blob"
        className="hidden md:block absolute top-10 left-96 z-0"
      />
      <div className="flex flex-col w-full items-center justify-center gap-6 p-0 py-6 sm:p-4 backdrop-blur-md bg-white/30 border border-secondary rounded-xl">
      <h2 className="text-3xl font-bold">Finalizar compra</h2>
        <Table>
          <TableCaption>
            Envianos tu pedido y a la brevedad te responderemos.
          </TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>Producto</TableHead>
              <TableHead className="max-w-[100px]">Cantidad</TableHead>
              <TableHead className="max-w-[100px]">Precio U</TableHead>
              <TableHead className="max-w-[100px]">Total</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {productStore?.products.map((product) => (
              <>
                {product.subCategory != undefined ? (
                  product.subCategory.map((subcategory) => (
                    <TableRow key={crypto.randomUUID()}>
                      <TableCell>
                        {product.product.name} | {subcategory.subCategory.date}
                      </TableCell>
                      <TableCell>{subcategory.amount}</TableCell>
                      <TableCell>$ {subcategory.subCategory.price}</TableCell>
                      <TableCell>
                        $ {subcategory.amount * subcategory.subCategory.price}
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow key={crypto.randomUUID()}>
                    <TableCell>{product.product.name}</TableCell>
                    <TableCell>{product.amount}</TableCell>
                    <TableCell>$ {product.product.price}</TableCell>
                    <TableCell>
                      ${" "}
                      {product.amount != undefined &&
                        product.amount * product.product.price}
                    </TableCell>
                  </TableRow>
                )}
              </>
            ))}
            <TableRow>
              <TableCell colSpan={3} className="text-right font-medium">
                Total:
              </TableCell>
              <TableCell className="text-right font-medium">
                $ {total}
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
        <Button variant="main" onClick={handleSubmit}>
          Enviar a whatsapp
        </Button>
      </div>
    </section>
  )
}
export default page
