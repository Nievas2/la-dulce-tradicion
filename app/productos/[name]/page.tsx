"use client"
import ProductCarousel from "../(components)/ProductCarousel"
import { useQuery } from "@tanstack/react-query"
import { getProductByName } from "@/services/ProductService"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator
} from "@/components/ui/breadcrumb"
import { useState } from "react"

const page = ({ params }: { params: { name: string } }) => {
  const [imageSelected, setImageSelected] = useState(0)
  const name = params.name
  const { data, isPending } = useQuery({
    queryKey: ["productName"],
    queryFn: () => getProductByName(name)
  })

  return (
    <section className="flex flex-col p-4 gap-4">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/">Inicio</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink href="/productos">Productos</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>{name}</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <div className="flex flex-col sm:flex-row gap-2 p-4 bg-white rounded-md">
        <div className="hidden sm:flex gap-4 sm">
          <div className="flex flex-col justify-between items-center gap-2">
            {data?.data?.ImagesProductAsocciations.map((image: any, index : number) => (
              <button
                className="size-11"
                onClick={() => setImageSelected(index)}
                key={image.id}
              >
                <img
                  src={image.ImageProduct.image}
                  alt="image"
                />
              </button>
            ))}
          </div>

          <div className="flex w-full items-center justify-center">
            {
              <img
                src={
                  data?.data?.ImagesProductAsocciations[imageSelected].ImageProduct.image
                }
                alt="image"
                className="max-w-96"
              />
            }
          </div>
        </div>
        <div className="flex items-center justify-center sm:hidden">
          {data && (
            <ProductCarousel images={data.data.ImagesProductAsocciations} />
          )}
        </div>
        <div className="flex flex-col gap-4">
          <h2>{data?.data?.name}</h2>
          <h3>{data?.data?.price}</h3>
          <p>{data?.data?.description}</p>
        </div>
      </div>
    </section>
  )
}
export default page
