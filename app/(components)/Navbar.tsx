"use client"
import { Sheet, SheetTrigger, SheetContent } from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import ItemsNavbar, { ItemsNavbarProps } from "@/components/shared/ItemsNavbar"
import { Icon } from "@iconify/react/dist/iconify.js"
import { useAuthContext } from "@/contexts/auth-context"
import { redirect } from "next/navigation"
import { usePathname } from "next/navigation"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"
import Cookies from "js-cookie"
import { MenuIcon } from "lucide-react"
import { useEffect, useMemo, useState } from "react"
import Cart from "@/components/shared/Cart"
import { CartProducts, useCartStore } from "@/stores/cart.store"

export default function Component() {
  const { authUser, setAuthUser } = useAuthContext()
  const pathname = usePathname()
  const [cartOpen, setCartOpen] = useState(false)
  const productStore = useCartStore((state) =>
    state.cart.find(
      (productStorage) => productStorage.userId === authUser?.user.id
    )
  )

  const total = useMemo(() => {
    let amount: number = 0
    if (productStore && productStore.products) {
      productStore.products.forEach((product: CartProducts) => {
        if (product.subCategory != undefined) {
          product.subCategory.map((subcategory) => {
            return (amount += subcategory.amount)
          })
        } else {
          return (amount += product.amount!)
        }
      })
    }
    return amount
  }, [productStore])

  useEffect(() => {
    // Deshabilitar scroll al abrir el modal
    if (cartOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "auto"
    }

    // Limpiar estilo al desmontar el componente
    return () => {
      document.body.style.overflow = "auto"
    }
  }, [cartOpen])

  function handleLogout() {
    setAuthUser(null)
    Cookies.set("token", "")
  }

  return (
    <header className="flex flex-col w-full max-w-8xl h-full shrink-0 bg-main sticky top-0 z-50">
      {/* PARA MOBILE */}
      <Sheet>
        <div className="flex flex-1 justify-between bg-main lg:hidden p-2 border-b border-secondary">
          <SheetTrigger asChild>
            <div>
              <Button variant="outline" size="icon">
                <MenuIcon className="h-6 w-6" />
                <span className="sr-only">Toggle navigation menu</span>
              </Button>
            </div>
          </SheetTrigger>
          {/* Cart button mobile */}
          {authUser != null && (
            <div className="flex items-center lg:hidden relative px-2">
              {total > 0 && (
                <span className="absolute top-0 right-2 inline-flex items-center justify-center px-2 py-1 text-[12px] font-bold leading-none text-red-100 transform translate-x-1/2 -translate-y-1/2 bg-red-main rounded-full">
                  {total}
                </span>
              )}
              <button
                type="button"
                className="flex items-center justify-center rounded-md text-black-main hover:bg-gray-main/80 hover:text-black-main focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                aria-controls="mobile-menu"
                aria-expanded={cartOpen}
                onClick={() => setCartOpen(!cartOpen)}
              >
                <span className="sr-only">Open main menu</span>

                {/* Open */}
                <Icon icon="mdi:cart" width="24" height="24" />
              </button>
            </div>
          )}
        </div>

        <SheetContent side="left" className="bg-main">
          <ul className="flex flex-col w-full justify-center gap-2 et-menu bg-main">
            <ItemsNavbar link={"/"} name={"Inicio"} pathname={pathname || ""} />

            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="item-1">
                <AccordionTrigger
                  className={`${
                    pathname == "/productos" && "text-secondary font-bold"
                  }`}
                >
                  Productos
                </AccordionTrigger>
                <AccordionContent>
                  <section className="flex flex-col text-left pl-2">
                    <ItemsListNavbar
                      link={"/productos"}
                      name={"Todos los productos"}
                      pathname={pathname || ""}
                    />

                    <ItemsListNavbar
                      link={"/productos?page=1&query=&categoryId=1"}
                      id="1"
                      name={"Pasteleria"}
                      pathname={pathname || ""}
                    />

                    <ItemsListNavbar
                      link={"/productos?page=1&query=&categoryId=2"}
                      id="2"
                      name={"Lunch"}
                      pathname={pathname || ""}
                    />

                    <ItemsListNavbar
                      link={"/productos?page=1&query=&categoryId=3"}
                      id="3"
                      name={"Perniles y carnes"}
                      pathname={pathname || ""}
                    />

                    <ItemsListNavbar
                      link={"/productos?page=1&query=&categoryId=4"}
                      id="4"
                      name={"Tortas"}
                      pathname={pathname || ""}
                    />

                    <ItemsListNavbar
                      link={"/productos?page=1&query=&categoryId=5"}
                      id="5"
                      name={"Agregados y especiales"}
                      pathname={pathname || ""}
                    />

                    <ItemsListNavbar
                      link={"/productos?page=1&query=&categoryId=6"}
                      id="6"
                      name={"Combos"}
                      pathname={pathname || ""}
                    />

                    <ItemsListNavbar
                      link={"/productos?page=1&query=&categoryId=5"}
                      id="7"
                      name={"Eventos y servicios"}
                      pathname={pathname || ""}
                    />
                  </section>
                </AccordionContent>
              </AccordionItem>
            </Accordion>

            <ItemsNavbar
              link={"/contacto"}
              name={"Contacto"}
              pathname={pathname || ""}
            />

            {authUser?.user.isAdmin && (
              <ItemsNavbar
                link={"/admins"}
                name={"Administración"}
                pathname={pathname || ""}
              />
            )}

            {authUser ? (
              <Button
                variant={"main"}
                size="default"
                className="rounded-[10px]"
                onClick={handleLogout}
              >
                Cerrar sesion
              </Button>
            ) : (
              <>
                <Button
                  variant={"main"}
                  size="default"
                  className="rounded-[10px]"
                >
                  <Link href="/registro">Registrarse</Link>
                </Button>
                <Button
                  variant={"main"}
                  size="default"
                  className="rounded-[10px]"
                >
                  <Link href="/iniciar-sesion">Iniciar Sesión</Link>
                </Button>
              </>
            )}
          </ul>
        </SheetContent>
      </Sheet>
      {/* PARA DESKTOP */}
      <nav className="hidden w-full border-y border-secondary py-4 lg:flex gap-6 bg-main">
        <div className="flex w-full justify-between items-center text-center bg-main px-4">
          <ul className="flex w-full items-center justify-start text-center flex-row gap-2">
            <ItemsNavbar link={"/"} name={"Inicio"} pathname={pathname || ""} />

            <NavigationMenu>
              <NavigationMenuItem>
                <NavigationMenuTrigger>
                  <ItemsNavbar
                    link={"/productos"}
                    name={"Productos"}
                    pathname={pathname || ""}
                    className="hidden md:flex"
                  />
                </NavigationMenuTrigger>
                <NavigationMenuContent className="bg-main w-full flex flex-col text-left">
                  <ItemsListNavbar
                    link={"/productos?page=1&query=&categoryId=1"}
                    id="1"
                    name={"Pasteleria"}
                    pathname={pathname || ""}
                  />

                  <ItemsListNavbar
                    link={"/productos?page=1&query=&categoryId=2"}
                    id="2"
                    name={"Lunch"}
                    pathname={pathname || ""}
                  />

                  <ItemsListNavbar
                    link={"/productos?page=1&query=&categoryId=3"}
                    id="3"
                    name={"Perniles y carnes"}
                    pathname={pathname || ""}
                  />

                  <ItemsListNavbar
                    link={"/productos?page=1&query=&categoryId=4"}
                    id="4"
                    name={"Tortas"}
                    pathname={pathname || ""}
                  />

                  <ItemsListNavbar
                    link={"/productos?page=1&query=&categoryId=5"}
                    id="5"
                    name={"Agregados y especiales"}
                    pathname={pathname || ""}
                  />

                  <ItemsListNavbar
                    link={"/productos?page=1&query=&categoryId=6"}
                    id="6"
                    name={"Combos"}
                    pathname={pathname || ""}
                  />

                  <ItemsListNavbar
                    link={"/productos?page=1&query=&categoryId=5"}
                    id="7"
                    name={"Eventos y servicios"}
                    pathname={pathname || ""}
                  />
                </NavigationMenuContent>
              </NavigationMenuItem>
            </NavigationMenu>

            <ItemsNavbar
              link={"/contacto"}
              name={"Contacto"}
              pathname={pathname || ""}
            />

            <ItemsNavbar
              link={"/favoritos"}
              name={"Favoritos"}
              pathname={pathname || ""}
            />

            {authUser?.user.isAdmin && (
              <ItemsNavbar
                link={"/admins"}
                name={"Administración"}
                pathname={pathname || ""}
              />
            )}
          </ul>
          {/* Cart button desktop */}
          {authUser != null && pathname !== "/ticket" && (
            <div className="flex items-center relative mr-2">
              {total > 0 && (
                <span className="absolute top-0 right-2 inline-flex items-center justify-center px-2 py-1 text-[12px] font-bold leading-none text-red-100 transform translate-x-1/2 -translate-y-1/2 bg-red-main rounded-full">
                  {total}
                </span>
              )}
              
              <button
                type="button"
                className="px-3 py-2 inline-flex items-center justify-center rounded-md text-black-main hover:bg-gray-main/80 hover:text-black-main focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                aria-controls="mobile-menu"
                aria-expanded={cartOpen}
                onClick={() => setCartOpen(!cartOpen)}
              >
                <span className="sr-only">Open main menu</span>

                {/* Open */}
                <Icon icon="mdi:cart" width="24" height="24" />
              </button>
            </div>
          )}
          {authUser ? (
            <Button
              variant={"main"}
              size="default"
              className="rounded-[10px]"
              onClick={handleLogout}
            >
              Cerrar sesion
            </Button>
          ) : (
            <>
              <Button
                variant={"main"}
                size="default"
                className="rounded-[10px]"
              >
                <Link href="/registro">Registrarse</Link>
              </Button>
              <Button
                variant={"main"}
                size="default"
                className="rounded-[10px]"
              >
                <Link href="/iniciar-sesion">Iniciar Sesión</Link>
              </Button>
            </>
          )}
        </div>
      </nav>

      <Cart cartOpen={cartOpen} setCartOpen={setCartOpen} />
    </header>
  )
}

const ItemsListNavbar = ({
  link,
  name,
  pathname,
  id,
}: {
  link: string
  name: string
  pathname: string
  id?: string
}) => {
  const searchParams = new URLSearchParams(window.location.search)
  const categoryId = searchParams.get("categoryId")

  return (
    <Link
      href={link}
      className={`rounded-md px-3 py-2 text-sm font-medium relative group transition-all duration-300 hover:text-secondary w-full"
      ${categoryId === id && "text-secondary cursor-not-allowed"}
        `}
      aria-disabled={categoryId == id}
    >
      {name}
    </Link>
  )
}
