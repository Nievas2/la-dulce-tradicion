import { useAuthContext } from "@/contexts/auth-context"
import { Product } from "@/interfaces/Product"
import { useFavoriteStore } from "@/stores/favorites"
import { Heart } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
interface CardProps {
  product: Product
}
const Cards = ({ product }: CardProps) => {
  const { authUser } = useAuthContext()
  const favorites = useFavoriteStore((state) => {
    if (state.favorites.length === 0) return

    const favorites = state.favorites.find(
      (fav) => fav.userId === authUser?.user.id
    )?.products
    return favorites
  })
  console.log(favorites)

  const isFavorite = favorites?.some((fav) => fav.id === product.id)
  const addFavoriteLibrary = useFavoriteStore(
    (state) => state.addFavoriteProduct
  )

  const deleteFavoriteLibrary = useFavoriteStore(
    (state) => state.deleteFavoriteProduct
  )

  const toggleFavorite = () => {
    if (authUser == null) {
      return console.log("No esta logueado")
    }
    if (isFavorite) {
      deleteFavoriteLibrary(authUser?.user.id, product.id)
    } else {
      addFavoriteLibrary(authUser?.user.id, product)
    }
  }
  return (
    <Link
      href={`/productos/${product.name}`}
      className="flex flex-col w-full bg-white rounded-b-lg px-2 pt-2 shadow-md shadow-gray-200 hover:shadow-lg hover:scale-105 transition-all duration-300 ease-in-out relative"
    >
      <div
        onClick={toggleFavorite}
        className="absolute z-50 top-2 right-2 w-8 h-8 rounded-full flex justify-center items-center"
      >
        {isFavorite ? (
          <div className=" mx-auto flex justify-center items-center cursor-pointer rounded-lg">
            <Heart
              className={`text-[#E81224] h-6 w-6 animate-heart`}
              fill="#E81224"
            />
          </div>
        ) : (
          <div className="mx-auto flex justify-center items-center cursor-pointer transition-colors duration-300">
            <Heart />
          </div>
        )}
      </div>
      <div className="">
        <Image
          src={
            product.ImagesProductAsocciations[0] != null ||
            product.ImagesProductAsocciations[0] != undefined
              ? product.ImagesProductAsocciations[0].ImageProduct.image
              : "/fondos/fondos1.jpg"
          }
          className="w-full object-cover"
          width={225}
          height={225}
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
