import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious
} from "@/components/ui/carousel"
//import Autoplay from "embla-carousel-autoplay"

const Carrousel = () => {
  return (
    <div className="mt-16 flex justify-center items-center lg:mt-28">
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
        className="w-[80%]"
      >
        <CarouselContent>
          <CarouselItem>
            <img
              src="/1.webp"
              alt=""
            />
          </CarouselItem>
          <CarouselItem>
            <img
              src="/1.webp"
              alt=""
            />
          </CarouselItem>
          <CarouselItem>
            <img
              src="/1.webp"
              alt=""
            />
          </CarouselItem>
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  )
}
export default Carrousel
