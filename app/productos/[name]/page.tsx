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
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select"
import { useState } from "react"
import { SubCategoryProduct } from "@/interfaces/SubCategoryProduct"
import { Input } from "@/components/ui/input"
import { Label } from "@radix-ui/react-label"
import { Button } from "@/components/ui/button"
import Zoom from "./(components)/zoom"

const page = ({ params }: { params: { name: string } }) => {
  const [imageSelected, setImageSelected] = useState(0)
  const name = params.name
  const { data, isPending } = useQuery({
    queryKey: ["productName"],
    queryFn: () => getProductByName(name),
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

      <div className="flex flex-col lg:flex-row gap-8 p-4 bg-white rounded-md ">
        <div className="hidden lg:flex gap-4 sm">
          <div className="flex flex-col items-center gap-6">
            {data?.data?.ImagesProductAsocciations.map(
              (image: any, index: number) => (
                <button
                  className={`size-11 ${
                    imageSelected === index && "scale-110 ring-2 ring-secondary"
                  } hover:scale-125 transition-transform duration-150 `}
                  onClick={() => setImageSelected(index)}
                  key={image.id}
                >
                  <img src={image.ImageProduct.image} alt="image" />
                </button>
              )
            )}
          </div>

          <div className="flex w-full items-center justify-center">
            {
              <Zoom
                src={
                  data?.data?.ImagesProductAsocciations[imageSelected]
                    .ImageProduct.image
                }
                alt={data?.data?.name}
              />
            }
          </div>
        </div>
        <div className="flex lg:hidden items-center justify-center">
          {data && (
            <ProductCarousel images={data.data.ImagesProductAsocciations} />
          )}
        </div>
        <div className="flex flex-col gap-4">
          <h2 className="text-5xl font-semibold">{data?.data?.name}</h2>
          <h3 className="text-3xl">{data?.data?.price}</h3>
          <p dangerouslySetInnerHTML={{ __html: data?.data?.description }}></p>
          <div className="flex gap-3 items-end justify-start">
            <div>
              {data?.data?.SubCategoryProducts.length > 0 && (
                <>
                  <Label>Categoria</Label>
                  <Select>
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Categoria" />
                    </SelectTrigger>
                    <SelectContent>
                      {data?.data?.SubCategoryProducts &&
                        data?.data?.SubCategoryProducts.map(
                          (subCategoryProducts: SubCategoryProduct) => (
                            <SelectItem
                              className="text-start"
                              key={crypto.randomUUID()}
                              value={subCategoryProducts.SubCategory.date}
                            >
                              {subCategoryProducts.SubCategory.date} :{" "}
                              {subCategoryProducts.SubCategory.price}
                            </SelectItem>
                          )
                        )}
                    </SelectContent>
                  </Select>
                </>
              )}
            </div>
            <div>
              <Label>Cantidad</Label>
              <Input
                className="w-[68px] text-center"
                defaultValue={1}
                min={1}
                type="number"
              />
            </div>
          </div>
          <div>
            <Button variant="secondary">Agregar al carrito</Button>
          </div>
        </div>
      </div>
    </section>
  )
}
export default page
