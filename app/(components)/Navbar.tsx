"use client"
import { Sheet, SheetTrigger, SheetContent } from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import ItemsNavbar from "@/components/shared/ItemsNavbar"
import { Icon } from "@iconify/react/dist/iconify.js"
import { useAuthContext } from "@/contexts/auth-context"

export default function Component() {
  const admin = false
  const logueado = false
  const { authUser } = useAuthContext()
  const items = [
    {
      name: "Inicio",
      link: "/"
    },
    {
      name: "Productos",
      link: "/productos"
    },
    {
      name: "Preguntas Frecuentes",
      link: "/preguntas-frecuentes"
    },
    {
      name: "Contacto",
      link: "/contacto"
    }
  ]
  function handleLogout() {
    console.log("logout")
  }
  return (
    <header className="flex flex-col w-full max-w-8xl h-20 shrink-0 bg-main sm:mb-[76px] md:mb-[80px] lg:mb-[114px]">
      <div className="flex flex-col items-center justify-center w-full bg-main">
        <img
          src="/sinfondo.webp"
          className="h-20 "
          alt="LaDulceTradicion logo"
        />
        <h5 className="font-bold bg-main">
          Flor & Lucas - Pastelería, Lunch y algo más
        </h5>
      </div>
      <Sheet>
        
        <SheetTrigger asChild>
          <div className="flex flex-1 bg-main p-2">
            <div>
              <Button
                variant="outline"
                size="icon"
                className="lg:hidden"
              >
                <MenuIcon className="h-6 w-6" />
                <span className="sr-only">Toggle navigation menu</span>
              </Button>
            </div>
          </div>
        </SheetTrigger>

        <SheetContent
          side="left"
          className="bg-main"
        >
          <ul className="flex flex-col w-full justify-center gap-2 et-menu bg-main">
            {items.map((item) => (
              <ItemsNavbar
                key={crypto.randomUUID()}
                link={item.link}
                name={item.name}
              />
            ))}
            {authUser?.user.isAdmin ? (
              <li>
                <a href="/admins">Administración</a>
              </li>
            ) : (
              ""
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
      <nav className="hidden w-full border-y border-secondary py-4 lg:flex gap-6 bg-main ">
        <div className="flex w-full justify-center items-center text-center gap-2 dl-menu-style1 bg-main">
          <ul className="flex gap-8 et-menu">
            {items.map((item) => (
              <ItemsNavbar
                key={crypto.randomUUID()}
                link={item.link}
                name={item.name}
              />
            ))}
            {authUser?.user.isAdmin ? (
              <li>
                <a href="/admins">Administración</a>
              </li>
            ) : (
              ""
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

function MenuIcon(props: any) {
  return (
    <Icon
      icon="material-symbols:menu"
      width="24"
      height="24"
    />
  )
}
