// import LinkedinIcon from "../../../utils/LinkedinIcon"

import { Icon } from "@iconify/react/dist/iconify.js"
import Link from "next/link"

/* import { Icon } from "@iconify/react/dist/iconify.js" */

const Footer = () => {
  return (
    <div className="bg-main z-20 flex flex-col w-full max-w-8xl border-t border-secondary ">
      <div className="flex flex-col gap-10 lg:flex-row lg:gap-4 items-start justify-between mx-auto max-w-8xl w-full px-6 md:px-8 py-10">
        <div className="flex flex-col gap-2 mx-auto text-center lg:text-left lg:mx-0">
          <div className="flex flex-row justify-center items-center lg:justify-start gap-2">
            <img
              src="/flor.png"
              alt="logo"
              height="80"
              width="80"
            />
          </div>
          <p className="text-base max-w-[342px]">
            Flor & Lucas - Pastelería y algo más
          </p>
        </div>

        <div className="flex flex-col gap-8 mx-auto xsm:grid xsm:grid-cols-2 lg:flex lg:flex-row lg:mx-0 lg:gap-10 xl:gap-20">
          <div className="flex flex-col gap-3 items-center lg:items-start">
            <h3 className="font-semibold text-lg">Sobre nosotros</h3>
            <div className="flex flex-col items-center lg:items-start gap-2">
              <Link
                className="hover:underline hover:text-secondary transition-colors duration-150"
                href="/"
              >
                Inicio
              </Link>
              <Link
                className="hover:underline hover:text-secondary transition-colors duration-150"
                href="/contact"
              >
                Contactanos
              </Link>
            </div>
          </div>

          <div className="flex flex-col gap-3 items-center lg:items-start">
            <h3 className="font-semibold text-lg">Servicios</h3>
            <div className="flex flex-col items-center lg:items-start gap-2">
              <Link
                className="hover:underline hover:text-secondary transition-colors duration-150"
                href="/productos"
              >
                Productos
              </Link>
            </div>
          </div>

          <div className="flex flex-col gap-3 items-center lg:items-start">
            <h3 className="font-semibold text-lg text-center lg:text-left">
              Contacto
            </h3>
            <div className="flex flex-col items-center lg:items-start gap-2">
              <p>ladulcetradicion@gmail.com</p>
            </div>
          </div>

          <div className="flex flex-col gap-2 items-center lg:items-start">
            <h3 className="font-semibold text-lg">Redes sociales</h3>
            <div className="flex flex-row gap-2 mx-auto">
              <Link
                href="https://www.instagram.com/ladulcetradicionpilar"
                className="flex justify-center items-center shadow-md shadow-secondary rounded-full p-[10px] h-auto hover:bg-secondary transition-all duration-300 hover:shadow-none"
                target="_blank"
              >
                <Icon
                  icon="mdi:instagram"
                  width={28}
                />
              </Link>

              <Link
                href="https://wa.me/5491162569879"
                className="flex justify-center items-center shadow-md shadow-secondary rounded-full p-[10px] h-auto hover:bg-secondary transition-all duration-300 hover:shadow-none"
                target="_blank"
              >
                <Icon
                  icon="ic:baseline-whatsapp"
                  width={28}
                />
              </Link>
            </div>
          </div>
        </div>
      </div>

      <hr className="h-[1px] mt-4 bg-black border-0 w-full"></hr>
      <div className="max-w-[1280px] mx-auto px-6 md:px-8">
        <div className="flex w-full justify-center text-center font-semibold text-[15px] gap-2">
          Si necesitas ayuda
          <Link
            href="/contacto"
            className="text-secondary font-bold hover:underline cursor-pointer"
          >
            contactanos.
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Footer
