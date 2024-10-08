"use client"
import Cards from "@/components/shared/Cards"
import Pagination from "@/components/shared/Pagination"
import Search from "@/components/shared/Search"
import { Select } from "@/components/ui/select"
import { Producto } from "@/interfaces/Product"
import { getCategories } from "@/services/CategoryService"
import { getProducts } from "@/services/ProductService"
import { useQuery } from "@tanstack/react-query"
import axios from "axios"
import { useEffect } from "react"
import Categories from "../(components)/Categories"

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator
} from "@/components/ui/breadcrumb"

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

  const query = searchParams?.query || ""
  const currentPage = Number(searchParams?.page) || 1
  const categoryId = searchParams?.categoryId || ""
  let totalPages

  useEffect(() => {
    refetch()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query, currentPage, categoryId])
  console.log(data)

  return (
    <section className="w-full flex flex-col gap-4 justify-center items-center p-4">
      <div className="flex justify-start items-start w-full">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/">Inicio</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Productos</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>

      <Search placeholder="Buscar productos..." />
      <div className="flex justify-start items-start w-full">
        <Categories />
      </div>
      <section className="mx-auto max-w-[1240px] grid sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 justify-center gap-5 min-h-screen">
        {data?.data?.products.map((producto: Producto) => (
          <div
            className="flex"
            key={crypto.randomUUID()}
          >
            <Cards product={producto} />
          </div>
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
