"use client"
import { useEffect, useState } from "react"
import SideItem from "./SideItem"
import { Icon } from "@iconify/react/dist/iconify.js"
import { Button } from "@/components/ui/button"

const SideNav = () => {
  const [open, setOpen] = useState(false)
  const [width, setWidth] = useState<number | undefined>()
  const handleWindowResize = () => {
    setWidth(window.innerWidth)
  }
  useEffect(() => {
    handleWindowResize()
    window.addEventListener("resize", handleWindowResize)
    return () => window.removeEventListener("resize", handleWindowResize)
  }, [])
  return (
    <div className="h-full min-h-screen flex md:w-64 md:bg-main">
      <div
        className={`${
          width! < 768 && open ? "sticky top-0" : "hidden"
        } w-14 md:w-64 h-full md:flex flex-col min-h-screen left-0 z-40 bg-main border-r border-secondary`}
      >
        <ul className="flex flex-col p-2 gap-3 w-full sticky top-14 md:top-20 overflow-y-auto bg-main">
          {open == true && width! < 768 && (
            <button
              className="flex p-2 items-center justify-center w-full"
              onClick={() => setOpen(false)}
            >
              <Icon icon="material-symbols:close" width="24" height="24" />
            </button>
          )}
          <SideItem
            icon="mingcute:chicken-fill"
            name="Productos"
            link="/admins/products"
          />
          <SideItem
            icon="clarity:dollar-solid"
            name="Precios"
            link="/admins/price"
          />
          {/* <SideItem
            icon="mdi:tag-outline"
            name="Categorias"
            link="/admins/categories"
          /> */}
          <SideItem
            icon="ph:tag-chevron-fill"
            name="Sub Categorias"
            link="/admins/subcategories"
          />
          <SideItem
            icon="mdi:image-multiple-outline"
            name="Imagenes"
            link="/admins/imageproduct"
          />
        </ul>
      </div>

      {!open && width! < 768 && (
        <Button
          className="absolute top-2 left-2 rounded-full px-2 z-50"
          variant="main"
          size="default"
          onClick={() => setOpen(true)}
        >
          <Icon icon="weui:arrow-filled" width="24" height="24" />
        </Button>
      )}
    </div>
  )
}
export default SideNav
