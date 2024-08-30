"use client"
import { getProducts } from "@/services/ProductService"
import { useQuery } from "@tanstack/react-query"
import Link from "next/link"
import CardsAdmin from "../../(components)/CardsAdmin"
import { Producto } from "@/interfaces/Product"

const page = () => {
  const { data, error, isPending } = useQuery({
    queryKey: ["products"],
    queryFn: getProducts,
    refetchOnWindowFocus: false,
    staleTime: 1000 * 60 * 60 * 24,
  })
  console.log(data);
  
  return (
    <div className="flex flex-wrap gap-4">
      {
        data?.data?.map((product : Producto) => (
          <CardsAdmin product={product} key={crypto.randomUUID()} />
        ))
      }
      {/* <div className="flex justify-center items-center h-full w-full">
        <div className="border border-white bg-white py-2 px-4 w-[440px] gap-2 rounded-md">
          <Link href="/admins/products/add">Products</Link>
        </div>
      </div> */}
    </div>
  )
}
export default page
