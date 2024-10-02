import { Producto } from "@/interfaces/Product"
import Image from "next/image"
import Link from "next/link"
interface CardProps {
  product: Producto
}
const Cards = ({ product }: CardProps) => {
  return (
    <Link
      href={`/productos/${product.name}`}
      className="flex flex-col w-full h-full"
    >
      <div className="bg-main border border-tertiary">
        <a className="text-black">
          <div className="absolute right-1 z-10"></div>

          <Image
            src={
              product.ImagesProductAsocciations[0] != null ||
              product.ImagesProductAsocciations[0] != undefined
                ? product.ImagesProductAsocciations[0].ImageProduct.image
                : "/fondos/fondos1.jpg"
            }
            className="w-full object-cover"
            width={200}
            height={200}
            alt={product.name}
          />

          <div className="card-body item-info p-2">
            <h3 className="text-lg font-bold">{product.name}</h3>

            <h4 className="text-lg text-end">${product.price}</h4>
          </div>
        </a>
      </div>
    </Link>
  )
}
export default Cards
