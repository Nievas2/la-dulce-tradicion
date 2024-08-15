import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Link from "next/link"

const page = () => {
  return (
    <div className="bg-no-repeat bg-cover bg-center bg-[url('/fondos/fondos3.jpg')] w-full max-w-7xl">
      <div className="flex justify-center items-center min-h-screen">
        <div className="border border-white bg-main py-2 px-4 rounded-md">
          <div className="flex flex-col">
            {/* <div className="flex">
              <h5>
                Hola! registrate en nuestra pagina para recibir novedades y que
                la proxima compra sea mas rapido.
              </h5>
            </div> */}
            <div className="flex">
              <h5 className="font-bold text-xl">Registro</h5>
            </div>
            <form className="flex flex-col gap-2">
              <div>
                <Label>Nombres </Label>
                <Input
                  className="form-control"
                  name="firstName"
                  type="text"
                  placeholder="Escribe tus nombres"
                />
              </div>
              <div>
                <Label>Apellidos </Label>
                <Input
                  className="form-control"
                  name="lastName"
                  type="text"
                  placeholder="Escribe tu/s apellido/s"
                />
              </div>
              <div>
                <Label>Teléfono</Label>
                <Input
                  className="form-control"
                  name="phone"
                  type="text"
                  placeholder="Escribe tu numero de telefono"
                />
              </div>
              <div>
                <Label>Email</Label>
                <Input
                  className="form-control"
                  name="email"
                  type="email"
                  placeholder="Escribe tu email"
                />
              </div>
              <div>
                <Label>Contraseña:</Label>
                <Input
                  className="form-control"
                  name="password"
                  type="password"
                  placeholder="************"
                />
              </div>
              <div>
                <Label>Repetir contraseña</Label>
                <Input
                  className="form-control"
                  name="repeatpassword"
                  type="password"
                  placeholder="************"
                />
              </div>
              <div className="flex">
                <Button
                  className="text-white w-full"
                  type="submit"
                  variant="secondary"
                >
                  Suscribirse
                </Button>
              </div>
            </form>
            <h5 className="text-center">
              Si ya tiene una cuenta puede ingresar desde aqui {" "}
              <Link className="text-blue-800 font-bold" href="/login">aqui</Link>
            </h5>
          </div>
          <div className="flex">
            {/* <h2 className="p-4">
          ESTAS A UN PASO DE CREAR TU CUENTA <br />
          <br />
  
          Te enviamos un link a tu email {{ user.email }} para que valides que
          eres tú.
        </h2> */}
            {/* <div className="flex m-2">
          <Button
            className="btn"
          >
            Login
          </Button>
        </div> */}
          </div>
        </div>
      </div>
    </div>
  )
}
export default page
