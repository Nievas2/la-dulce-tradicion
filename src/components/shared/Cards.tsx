import { Producto } from "@/interfaces/Product"
interface CardProps {
  product: Producto
}
const Cards = ({ product }: CardProps) => {
  return (
    <div className="flex flex-col w-full h-full">
      <div className="bg-main border border-tertiary">
        <a className="text-black">
          <div className="absolute right-1 z-10"></div>

          <img
            src={product.image}
            className="w-full h-48 object-cover"
            alt={product.name}
          />

          <div className="card-body item-info p-2">
            <h3 className="text-lg font-bold">{product.name}</h3>

            <h4 className="text-lg text-end">${product.price}</h4>
          </div>
        </a>
      </div>
    </div>
  )
}
export default Cards
