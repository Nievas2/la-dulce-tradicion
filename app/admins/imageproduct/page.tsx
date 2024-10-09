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
  console.log(data)

  return (
    <section className="flex flex-col relative">
      <Dialog>
        <DialogTrigger className="absolute -top-10 right-0 border border-secondary hover:bg-secondary/80 bg-white text-black transition-colors duration-300 h-10 px-4 py-2 rounded-md">
          Add
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
      <div className="flex flex-wrap gap-4">
        {data?.data?.map((image: any) => (
          <ImageCard
            key={crypto.randomUUID()}
            image={image}
          />
          /*  <Dialog key={crypto.randomUUID()}>
            <DialogTrigger className="border border-secondary hover:bg-secondary/80 bg-white text-black transition-colors duration-300 h-10 px-4 py-2 rounded-md">
              Add
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Agregar un producto</DialogTitle>

                <ChangeImageProduct
                  Product={undefined}
                  image={image.image}
                  imageId={image.id}
                />
              </DialogHeader>
            </DialogContent>
          </Dialog> */
        ))}
      </div>
    </section>
  )
}
export default page
