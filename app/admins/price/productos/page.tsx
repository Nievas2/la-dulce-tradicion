import { getPagesPrice } from "@/services/PriceService"
import Search from "../(componets)/Search"
import Table from "./(components)/Table"
import Pagination from "../(componets)/Pagination"
import Categories from "../../products/(components)/Categories"

export default async function Page({
  searchParams,
}: {
  searchParams?: {
    query?: string
    page?: string
    categoryId?: string
    product?: string
    value?: string
  }
}) {
  const query = searchParams?.query || ""
  const currentPage = Number(searchParams?.page) || 1
  const categoryId = searchParams?.categoryId || ""
  const totalPages = await getPagesPrice(query, categoryId)
  const product = searchParams?.product || ""
  const value = searchParams?.value || ""
  return (
    <div className="flex flex-col gap-4 w-full">
      <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
        <Search placeholder="Buscar productos..." />
      </div>
      <Categories />
      <Table
        query={query}
        currentPage={currentPage}
        categoryId={categoryId}
        product={product}
        value={value}
      />
      {/*  </Suspense> */}
      <div className="mt-5 flex w-full justify-center">
        <Pagination totalPages={totalPages} />
      </div>
    </div>
  )
}
