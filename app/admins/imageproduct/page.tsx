"use client"

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "@/components/ui/dialog"
import ChangeImageProduct from "./(components)/ChangeImageProduct"
import { getImageProducts } from "@/services/ImageProduct"
import { useQuery } from "@tanstack/react-query"
import ImageCard from "./(components)/ImageCard"

const page = () => {
  const { data, error, isPending } = useQuery({
    queryKey: ["imagesproducts"],
    queryFn: getImageProducts,
    refetchOnWindowFocus: false,
    staleTime: 1000 * 60 * 60 * 24
  })

  return (
    <section className="flex flex-col gap-8 relative">
      <div className="flex justify-end w-full">

      <Dialog>
        <DialogTrigger className="w-fit border border-secondary hover:bg-secondary/80 bg-white text-black transition-colors duration-300 h-10 px-4 py-2 rounded-md">
          Agregar una imagen
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Agregar un producto</DialogTitle>
            <ChangeImageProduct
              Product={undefined}
              image={undefined}
              imageId={undefined}
            />
          </DialogHeader>
        </DialogContent>
      </Dialog>
      </div>
      <div className="flex flex-wrap gap-4 items-center justify-center">
        {data?.data?.map((image: any) => (
          <ImageCard
            key={crypto.randomUUID()}
            image={image}
          />
        ))}
      </div>
    </section>
  )
}
export default page
