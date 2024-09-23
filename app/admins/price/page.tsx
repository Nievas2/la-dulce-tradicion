import { getPagesPrice } from "@/services/PriceService"
import Prices from "./(componets)/Prices"
import Search from "./(componets)/Search"
import Table from "./(componets)/Table"
import Pagination from "./(componets)/Pagination"
import Categories from "./(componets)/Categories"

export default async function Page({
  searchParams
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
    <div className="w-full">
      <div className="flex w-full items-center justify-between">
        <h1 className={`text-2xl`}>Precios</h1>
      </div>
      <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
        <Search placeholder="Buscar productos..." />
      </div>
      {/* <Suspense
        key={query + currentPage}
        fallback={<InvoicesTableSkeleton />}
      > */}
      <Categories />
      <Table
        query={query}
        currentPage={currentPage}
        CategoryId={categoryId}
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
