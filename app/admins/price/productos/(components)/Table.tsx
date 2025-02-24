import { getProductsPrice } from "@/services/PriceService"
import Send from "./Send"

export default async function Table({
  query,
  currentPage,
  categoryId,
  product,
  value,
}: {
  query: string
  currentPage: number
  categoryId: string
  product: string
  value: string
}) {
  const products = await getProductsPrice(
    query,
    currentPage,
    Number(categoryId)
  )  

  return (
    <div className="mt-6 flow-root">
      <div className="inline-block min-w-full align-middle">
        <div className="rounded-lg bg-gray-50 p-2 md:pt-0">
          <table className="min-w-full text-gray-900 table">
            <thead className="rounded-lg text-left text-sm font-normal">
              <tr>
                <th
                  scope="col"
                  className="px-0 sm:px-4 py-0 sm:py-5 font-medium sm:pl-6"
                >
                  Nombre del producto
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Precio
                </th>
              </tr>
            </thead>
            <tbody className="bg-white">
              {products?.map((product) => (
                <tr
                  key={crypto.randomUUID()}
                  className="w-full border-b py-3 text-sm last-of-type:border-none [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg"
                >
                  <td className="whitespace-nowrap px-0 sm:px-4 py-0">
                    <div className="flex items-center">
                      <p>{product.name}</p>
                    </div>
                  </td>
                  <td className="whitespace-nowrap px-0 sm:px-4 py-0">
                    <Send defaultValue={product.price} product={product.id} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
