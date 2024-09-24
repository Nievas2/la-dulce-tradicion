"use client"
import { Sheet, SheetTrigger, SheetContent } from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import ItemsNavbar from "@/components/shared/ItemsNavbar"
import { Icon } from "@iconify/react/dist/iconify.js"
import { useAuthContext } from "@/contexts/auth-context"
import { redirect } from "next/navigation"
import { usePathname } from "next/navigation"

export default function Component() {
  const { authUser, setAuthUser } = useAuthContext()
  const pathname = usePathname()
  const items = [
    {
      name: "Inicio",
      link: "/"
    },
    {
      name: "Productos",
      link: "/productos"
    },
    /*  {
      name: "Preguntas Frecuentes",
      link: "/preguntas-frecuentes"
    }, */
    {
      name: "Contacto",
      link: "/contacto"
    }
  ]
  function handleLogout() {
    localStorage.removeItem("user")
    setAuthUser(null)
  }
  return (
    <header className="flex flex-col w-full max-w-8xl h-full shrink-0 bg-main sticky top-0 z-50">
     
      {/* PARA MOBILE */}
      <Sheet>
        <SheetTrigger asChild>
          <div className="flex flex-1 bg-main lg:hidden">
            <div>
              <Button
                variant="outline"
                size="icon"
              
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
                pathname={pathname || ""}
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
      {/* PARA DESKTOP */}
      <nav className="hidden w-full border-y border-secondary py-4 lg:flex gap-6 bg-main">
        <div className="flex w-full justify-between items-center text-center bg-main px-4">
          <ul className="flex w-full items-center justify-start text-center flex-row gap-2">
            {items.map((item) => (
              <ItemsNavbar
                key={crypto.randomUUID()}
                link={item.link}
                name={item.name}
                pathname={pathname || ""}
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
