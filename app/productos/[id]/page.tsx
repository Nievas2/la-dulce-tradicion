"use client"
import Cards from "@/components/shared/Cards"

import { getProductById } from "@/services/ProductService"
import { useQuery } from "@tanstack/react-query"
import axios from "axios"
import { useEffect } from "react"
import ProductCarousel from "../(components)/ProductCarousel"
const page = ({ params }: { params: { id: number } }) => {
  const id = params.id
  const { data, isPending } = useQuery({
    queryKey: ["product"],
    queryFn: () => getProductById(id),
    refetchOnWindowFocus: false,
    staleTime: 1000 * 60 * 60 * 24
  })

  return (
    <section className="flex flex-col p-2">
      <div className="flex gap-2 p-2 bg-white">
        <div className="flex basis-1/3">
          {data && (
            <ProductCarousel images={data?.data?.ImagesProductAsocciations} />
          )}
        </div>
        <div className="flex flex-col basis-2/3 gap-4">
          <h2>{data?.data?.name}</h2>
          <h3>{data?.data?.price}</h3>
          <p>{data?.data?.description}</p>
        </div>
      </div>
    </section>
  )
}
export default page
