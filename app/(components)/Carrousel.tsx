"use client"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious
} from "@/components/ui/carousel"
import { useEffect, useState } from "react"
//import Autoplay from "embla-carousel-autoplay"

const Carrousel = () => {
  const [width, setWidth] = useState<number | undefined>()
  const handleWindowResize = () => {
    setWidth(window.innerWidth)
  }
  useEffect(() => {
    // component is mounted and window is available
    handleWindowResize()
    window.addEventListener("resize", handleWindowResize)
    // unsubscribe from the event on component unmount
    return () => window.removeEventListener("resize", handleWindowResize)
  }, [])
  return (
    <div className="mt-24 sm:mt-16 md:mt-0 flex justify-center items-center lg:mt-28">
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
        className="w-[100%] md:w-[80%]"
      >
        <CarouselContent>
          <CarouselItem>
            <img
              src={
                width! > 768
                  ? "/carrusel/1desktop.webp"
                  : "/carrusel/1mobile.webp"
              }
              alt=""
            />
          </CarouselItem>
          <CarouselItem>
            <img
              src={
                width! > 768
                  ? "/carrusel/2desktop.webp"
                  : "/carrusel/2mobile.webp"
              }
              alt=""
            />
          </CarouselItem>
          <CarouselItem>
            <img
              src={
                width! > 768
                  ? "/carrusel/3desktop.webp"
                  : "/carrusel/3mobile.webp"
              }
              alt=""
            />
          </CarouselItem>
        </CarouselContent>
        {width! < 768 ? (
          ""
        ) : (
          <>
            <CarouselPrevious />
            <CarouselNext />
          </>
        )}
      </Carousel>
    </div>
  )
}
export default Carrousel
