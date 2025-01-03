import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import { ImagesProductAsocciations } from "@/interfaces/ImagesProductAsocciation"
import Image from "next/image"
interface ProductCarouselProps {
  images: ImagesProductAsocciations[]
}
const ProductCarousel = ({ images }: ProductCarouselProps) => {
  return (
    <Carousel
      opts={{
        align: "start",
        loop: true,
      }}
      /* plugins={[
          Autoplay({
            delay: 2000
          })
        ]} */
      className="size-64 max-w-64 max-h-64"
    >
      <CarouselContent>
        {images.map((image, index) => (
          <CarouselItem key={crypto.randomUUID()}>
            <Image
              width={320}
              height={320}
              src={image.ImageProduct.image}
              alt="imagen del producto"
            />
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious className="left-2" />
      <CarouselNext className="right-2" />
    </Carousel>
  )
}
export default ProductCarousel
