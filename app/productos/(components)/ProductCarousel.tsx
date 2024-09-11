import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious
} from "@/components/ui/carousel"
import { ImagesProductAsocciations } from "@/interfaces/ImagesProductAsocciation"
interface ProductCarouselProps {
  images: ImagesProductAsocciations[]
}
const ProductCarousel = ({ images }: ProductCarouselProps) => {
  return (
    <Carousel
      opts={{
        align: "start",
        loop: true
      }}
      /* plugins={[
          Autoplay({
            delay: 2000
          })
        ]} */
      className="w-full"
    >
      <CarouselContent>
        {images.map((image, index) => (
          <CarouselItem key={index}>
            <img
              src={image.ImageProduct.image}
              alt=""
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
