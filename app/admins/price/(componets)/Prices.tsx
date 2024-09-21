import getProductsPrice from "@/services/PriceService"
interface PricesProps {
  categoryId?: number
}
const Prices = async ({ categoryId }: PricesProps) => {
  const prices = await getProductsPrice(categoryId)

  return (
    <div>
      <h1>Prices</h1>
      {prices.map((price: any) => (
        <div key={price.name}>
          <h1>{price.name}</h1>
          <h1>{price.price}</h1>
        </div>
      ))}
    </div>
  )
}
export default Prices
