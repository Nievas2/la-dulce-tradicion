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
import * as React from "react"
import Cookies from "js-cookie"
import { MenuIcon } from "lucide-react"

export default function Component() {
  const { authUser, setAuthUser } = useAuthContext()
  const pathname = usePathname()

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
    <a
      href={link}
      className={`rounded-md px-3 py-2 text-sm font-medium relative group transition-all duration-300 hover:text-secondary w-full"
      ${categoryId === id && "text-secondary"}
        `}
    >
      {name}
    </a>
  )
}
