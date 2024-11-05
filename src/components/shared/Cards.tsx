import { Producto } from "@/interfaces/Product"
import Image from "next/image"
import Link from "next/link"
interface CardProps {
  product: Producto
}
const Cards = ({ product }: CardProps) => {
  /*  console.log(product); */
  console.log(
    product.ImagesProductAsocciations[0] != null ||
      product.ImagesProductAsocciations[0] != undefined
      ? product.ImagesProductAsocciations[0].ImageProduct.image
      : "/fondos/fondos1.jpg"
  )

  return (
    <Link
      href={`/productos/${product.name}`}
      className="flex flex-col w-full bg-white rounded-b-lg px-2 pt-2 shadow-md shadow-gray-200 hover:shadow-lg hover:scale-105 transition-all duration-300 ease-in-out"
    >
      <div className="">
        <Image
          src={
            product.ImagesProductAsocciations[0] != null ||
            product.ImagesProductAsocciations[0] != undefined
              ? product.ImagesProductAsocciations[0].ImageProduct.image
              : "/fondos/fondos1.jpg"
          }
          className="w-full object-cover"
          width={100}
          height={100}
          alt={product.name}
        />

        <div className="flex flex-col gap-1 py-1">
          <h3 className="text-lg font-bold leading-none">{product.name}</h3>

          <h4 className="text-lg text-end leading-none">${product.price}</h4>
        </div>
      </div>
    </Link>
  )
}
export default Cards
