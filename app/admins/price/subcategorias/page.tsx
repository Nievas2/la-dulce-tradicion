import { getPagesPrice, getPagesPriceSubCategories } from "@/services/PriceService"
import Search from "../(componets)/Search"
import Pagination from "../(componets)/Pagination"
import TableSubCategoriesPrice from "./(components)/TableSubCategoriesPrice"

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
  const totalPages = await getPagesPriceSubCategories(query)
  const product = searchParams?.product || ""
  const value = searchParams?.value || ""
  return (
    <div className="flex flex-col gap-4 w-full">
      <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
        <Search placeholder="Buscar productos..." />
      </div>
      <TableSubCategoriesPrice
        query={query}
        currentPage={currentPage}
        subCategory={product}
        value={value}
      />
      {/*  </Suspense> */}
      <div className="mt-5 flex w-full justify-center">
        <Pagination totalPages={totalPages} />
      </div>
    </div>
  )
}
