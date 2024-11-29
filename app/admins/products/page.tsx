"use client"
import { getProducts } from "@/services/ProductService"
import { useQuery } from "@tanstack/react-query"
import CardsAdmin from "../../(components)/CardsAdmin"
import { Product } from "@/interfaces/Product"
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
import Categories from "../../(components)/Categories"

const page = ({
  searchParams
}: {
  searchParams?: {
    query?: string
    page?: string
    categoryId?: string
  }
}) => {
  const { data, error, isPending, refetch } = useQuery({
    queryKey: ["products"],
    queryFn: () => getProducts(currentPage, query, categoryId),
    refetchOnWindowFocus: false,
    staleTime: 1000 * 60 * 60 * 24
  })
  console.log(data)
  const query = searchParams?.query || ""
  const currentPage = Number(searchParams?.page) || 1
  const categoryId = searchParams?.categoryId || ""
  let totalPages
  useEffect(() => {
    refetch()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query, currentPage])
  return (
    <section className="w-full flex flex-col gap-4 justify-center items-center p-4 relative z-20">
      <Search placeholder="Buscar productos..." />
      <div className="flex items-start justify-start w-full gap-4">
        <Categories />
        <Dialog>
          <DialogTrigger className="flex border border-secondary hover:bg-secondary/80 bg-white text-black transition-colors duration-300 h-10 px-4 py-2 rounded-md">
            Add
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Agregar un producto</DialogTitle>
              <ChangeProduct
                product={undefined}
                lastId={data?.data.lastId}
              />
            </DialogHeader>
          </DialogContent>
        </Dialog>
      </div>
      <section className="grid sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-5">
        {data?.data?.products.map((product: Product) => (
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
