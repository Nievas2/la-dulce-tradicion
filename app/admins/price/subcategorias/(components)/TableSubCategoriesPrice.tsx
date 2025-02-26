import { getSubCategoriesPrice } from "@/services/PriceService"
import SendSubCategory from "./SendSubCategory"
import React from "react"

export default async function TableSubCategoriesPrice({
  query,
  currentPage,
  subCategory,
  value,
}: {
  query: string
  currentPage: number
  subCategory: string
  value: string
}) {
  const subCategories = await getSubCategoriesPrice(query, currentPage)

  return (
    <div className="mt-6 flow-root">
      <div className="inline-block min-w-full align-middle">
        <div className="rounded-lg bg-gray-50">
          <table className="min-w-full text-gray-900 table">
            <thead className="rounded-t-lg text-left text-sm font-normal bg-secondary text-white border-b">
              <tr>
                <th
                  scope="col"
                  className="px-0 sm:px-4 py-0 sm:py-2 font-medium sm:pl-6"
                >
                  Nombre de la sub categoria
                </th>
                <th scope="col" className="px-3 py-2 font-medium">
                  Precio
                </th>
              </tr>
            </thead>
            <tbody className="">
              {subCategories?.map((product: any, productIndex: number) => (
                <React.Fragment key={productIndex}>
                  <tr className="bg-secondary font-semibold text-white text-md px-2">
                    <td className="px-2" colSpan={2}>
                      {product.productName}
                    </td>
                  </tr>
                  {product.subCategories.map(
                    (subCategory: any, subCategoryIndex: number) => (
                      <tr
                        key={subCategoryIndex}
                        className="w-full border-b py-3 text-sm last-of-type:border-none [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg"
                      >
                        <td className="whitespace-nowrap px-0 sm:px-4 py-0">
                          <div className="flex items-center">
                            <p>{subCategory.subCategoryDate}</p>
                          </div>
                        </td>
                        <td className="whitespace-nowrap px-0 sm:px-4 py-1">
                          <SendSubCategory
                            defaultValue={subCategory.subCategoryPrice}
                            subCategory={subCategory.subCategoryId}
                          />
                        </td>
                      </tr>
                    )
                  )}
                </React.Fragment>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
