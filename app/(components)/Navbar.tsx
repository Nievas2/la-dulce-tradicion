"use client"
import { Sheet, SheetTrigger, SheetContent } from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import ItemsNavbar from "@/components/shared/ItemsNavbar"

export default function Component() {
  const admin = true
  const logueado = false
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
    <header className="flex flex-col w-full max-w-7xl h-20 shrink-0 bg-main sm:mb-[76px] md:mb-[80px] lg:mb-[114px]">
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
          <ul className="flex flex-col w-full justify-around gap-2 et-menu bg-main">
            {items.map((item) => (
              <ItemsNavbar
                key={crypto.randomUUID()}
                link={item.link}
                name={item.name}
              />
            ))}
            {admin ? (
              <li>
                <a href="administracion">Administración</a>
              </li>
            ) : (
              ""
            )}
            {logueado ? (
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
                  <Link href="logout">Registrarse</Link>
                </Button>
                <Button
                  variant={"main"}
                  size="default"
                  className="rounded-[10px]"
                >
                  <Link href="login">Iniciar Sesión</Link>
                </Button>
              </>
            )}
          </ul>
        </SheetContent>
      </Sheet>
      <nav className="hidden w-full border-y border-secondary py-4 lg:flex gap-6 bg-main dl-menu-style1">
        <ul className="flex w-full justify-around items-center text-center gap-2 et-menu bg-main">
          {items.map((item) => (
            <ItemsNavbar
              key={crypto.randomUUID()}
              link={item.link}
              name={item.name}
            />
          ))}
          {admin ? (
            <li>
              <a href="administracion">Administración</a>
            </li>
          ) : (
            ""
          )}
          {logueado ? (
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
                <Link href="logout">Registrarse</Link>
              </Button>
              <Button
                variant={"main"}
                size="default"
                className="rounded-[10px]"
              >
                <Link href="login">Iniciar Sesión</Link>
              </Button>
            </>
          )}
        </ul>
      </nav>
    </header>
  )
}

function MenuIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line
        x1="4"
        x2="20"
        y1="12"
        y2="12"
      />
      <line
        x1="4"
        x2="20"
        y1="6"
        y2="6"
      />
      <line
        x1="4"
        x2="20"
        y1="18"
        y2="18"
      />
    </svg>
  )
}

function MountainIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m8 3 4 8 5-5 5 15H2L8 3z" />
    </svg>
  )
}