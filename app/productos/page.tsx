"use client"
import Cards from "@/components/shared/Cards"
import Pagination from "@/components/shared/Pagination"
import Search from "@/components/shared/Search"
import { getProducts } from "@/services/ProductService"
import { useQuery } from "@tanstack/react-query"
import { Suspense, useEffect } from "react"
import Categories from "../(components)/Categories"

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import NotFound from "../(components)/NotFound"
import { Product } from "@/interfaces/Product"
import { renderSkeletonProducts } from "@/components/shared/skeletons/CardsProducts"

const page = ({
  searchParams,
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
    staleTime: 1000 * 60 * 60 * 24,
  })

  const query = searchParams?.query || ""
  const currentPage = Number(searchParams?.page) || 1
  const categoryId = searchParams?.categoryId || ""
  let totalPages

  useEffect(() => {
    refetch()
  }, [query, currentPage, categoryId])

  return (
    <section className="w-full flex flex-col gap-4 justify-center items-center pt-2 p-4">
      <div className="flex justify-start items-start w-full ">
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
      <section className="flex flex-col lg:flex-row w-full gap-4">
        <div className="flex flex-col">
          <Categories />
        </div>

        <div className="flex flex-col w-full items-center justify-center gap-4">
          <div className="flex w-full gap-4">
            <Search placeholder="Buscar productos..." />
          </div>

          {isPending ? (
            renderSkeletonProducts()
          ) : data?.data?.products.length === 0 ? (
            <div className="flex justify-center items-center w-full col-span-full">
              <NotFound />
            </div>
          ) : (
            <section className="mx-auto w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 justify-center gap-x-6 gap-y-3 xl:gap-8">
              {data?.data?.products.map((product: Product) => (
                <Cards product={product} key={crypto.randomUUID()} />
              ))}
            </section>
          )}

          <Pagination
            totalPages={data?.data?.totalPages}
            disabled={isPending}
            products={data?.data?.products}
          />
        </div>
      </section>
    </section>
  )
}
export default page
