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
import { useEffect, useState } from "react"
import Cart from "@/components/shared/Cart"

export default function Component() {
  const { authUser, setAuthUser } = useAuthContext()
  const pathname = usePathname()
  const [cartOpen, setCartOpen] = useState(false)

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
    localStorage.removeItem("user")
    setAuthUser(null)
    Cookies.set("token", "")
  }

  return (
    <header className="flex flex-col w-full max-w-8xl h-full shrink-0 bg-main sticky top-0 z-50">
      {/* PARA MOBILE */}
      <Sheet>
        <SheetTrigger asChild>
          <div className="flex flex-1 justify-end bg-main lg:hidden p-2">
            <div>
              <Button variant="outline" size="icon">
                <MenuIcon className="h-6 w-6" />
                <span className="sr-only">Toggle navigation menu</span>
              </Button>
            </div>
          </div>
        </SheetTrigger>

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
                      name={"Combos y agregados"}
                      pathname={pathname || ""}
                    />
                  </section>
                </AccordionContent>
              </AccordionItem>
            </Accordion>

            <ItemsNavbar
              link={"contacto"}
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
            {/* Cart button mobile */}
            {authUser != null && (
              <div className="flex items-center md:hidden w-full">
                <button
                  type="button"
                  className="absolute right-16 flex items-center justify-center rounded-md text-black-main hover:bg-gray-main/80 hover:text-black-main focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
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
                  <Link href="/register">Registrarse</Link>
                </Button>
                <Button
                  variant={"main"}
                  size="default"
                  className="rounded-[10px]"
                >
                  <Link href="/login">Iniciar Sesión</Link>
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
                    name={"Combos y agregados"}
                    pathname={pathname || ""}
                  />
                </NavigationMenuContent>
              </NavigationMenuItem>
            </NavigationMenu>

            <ItemsNavbar
              link={"contacto"}
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
            {/* Cart button desktop */}
            {authUser != null && (
              <div>
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
          </ul>
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
                <Link href="/register">Registrarse</Link>
              </Button>
              <Button
                variant={"main"}
                size="default"
                className="rounded-[10px]"
              >
                <Link href="/login">Iniciar Sesión</Link>
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
