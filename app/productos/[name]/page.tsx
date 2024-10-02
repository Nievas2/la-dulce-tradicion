"use client"
import ProductCarousel from "../(components)/ProductCarousel"
import { useQuery } from "@tanstack/react-query"
import { getProductByName } from "@/services/ProductService"
const page = ({ params }: { params: { name: string } }) => {
  const name = params.name
  const { data, isPending } = useQuery({
    queryKey: ["productName"],
    queryFn: () => getProductByName(name)
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
