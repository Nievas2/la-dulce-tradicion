"use client"
import Cards from "@/components/shared/Cards"
import { useAuthContext } from "@/contexts/auth-context"
import { useFavoriteStore } from "@/stores/favorites"

const Page = () => {
  const { authUser } = useAuthContext()
  const favorites = useFavoriteStore(
    (state) =>
      state.favorites.find((fav) => fav.userId === authUser?.user.id)
        ?.products
  )

  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-3xl font-bold text-center">Favoritos</h1>
      {/* <CardsContainer libraries={favorites} /> */}
      {favorites != undefined && favorites.length > 0 ? (
        <div className="mx-auto w-full grid sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 justify-center gap-x-6 gap-y-3">
          {
            favorites.map((product) => (
              <Cards key={crypto.randomUUID()} product={product} />
            ))
          }
        </div>
      ) : (
        <div className="flex justify-center items-center h-[58vh] text-center">
          <p className="text-2xl font-bold">
            Aún no has agregado productos a tus favoritos...
          </p>
        </div>
      )}
    </div>
  )
}
export default Page