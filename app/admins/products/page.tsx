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
import { useEffect } from "react"
import Pagination from "@/components/shared/Pagination"
import Search from "@/components/shared/Search"

const page = ({
  searchParams
}: {
  searchParams?: {
    query?: string
    page?: string
  }
}) => {
  const { data, error, isPending, refetch } = useQuery({
    queryKey: ["products"],
    queryFn: () => getProducts(currentPage, query),
    refetchOnWindowFocus: false,
    staleTime: 1000 * 60 * 60 * 24
  })
  console.log(data)
  const query = searchParams?.query || ""
  const currentPage = Number(searchParams?.page) || 1
  let totalPages
  useEffect(() => {
    refetch()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query, currentPage])
  return (
    <section className="w-full flex flex-col gap-4 justify-center items-center p-4 relative">
      <Search placeholder="Buscar productos..." />
      <Dialog>
        <DialogTrigger className="absolute top-0 right-0 border border-secondary hover:bg-secondary/80 bg-white text-black transition-colors duration-300 h-10 px-4 py-2 rounded-md">
          Add
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Agregar un producto</DialogTitle>
            <ChangeProduct product={undefined} lastId={data?.data.totalProducts} />
          </DialogHeader>
        </DialogContent>
      </Dialog>
      <section className="grid sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 justify-center gap-5">
        {data?.data?.products.map((product: Producto) => (
          <CardsAdmin
            product={product}
            key={crypto.randomUUID()}
          />
        ))}
      </section>

      <Pagination
        totalPages={data?.data?.totalPages}
        disabled={isPending}
        products={data?.data?.products}
      />
    </section>
  )
}
export default page
