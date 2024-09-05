"use client"
import { getProducts } from "@/services/ProductService"
import { useQuery } from "@tanstack/react-query"
import CardsAdmin from "../../(components)/CardsAdmin"
import { Producto } from "@/interfaces/Product"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "@/components/ui/dialog"
import ChangeProduct from "./(components)/ChangeProduct"

const page = () => {
  const { data, error, isPending, refetch } = useQuery({
    queryKey: ["products"],
    queryFn: () => getProducts(1, ""),
    refetchOnWindowFocus: false,
    staleTime: 1000 * 60 * 60 * 24
  })
  console.log(data)

  return (
    <section className="flex flex-col relative">
      <Dialog>
        <DialogTrigger className="absolute -top-10 right-0 border border-secondary hover:bg-secondary/80 bg-white text-black transition-colors duration-300 h-10 px-4 py-2 rounded-md">
          Add
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Agregar un producto</DialogTitle>
            <ChangeProduct product={undefined} />
          </DialogHeader>
        </DialogContent>
      </Dialog>
      <div className="flex flex-wrap gap-4">
        {data?.data?.products.map((product: Producto) => (
          <CardsAdmin
            product={product}
            key={crypto.randomUUID()}
          />
        ))}
        {/* <div className="flex justify-center items-center h-full w-full">
        <div className="border border-white bg-white py-2 px-4 w-[440px] gap-2 rounded-md">
          <Link href="/admins/products/add">Products</Link>
        </div>
      </div> */}
      </div>
    </section>
  )
}
export default page
