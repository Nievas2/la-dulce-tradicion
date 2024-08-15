import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select"
const page = () => {
  return (
    <>
      <div className="flex flex-col mb-3 mt-3 offset-lg-2">
        <div className="text-white mb-3">
          <div className="card-header text-center fs-3">
            <b> Agregar producto</b>
          </div>
          <div className="bg-white">
            <form className="flex flex-1 flex-col p-4">
              <div className="row mb-3">
                <Label className="form-Label mb-0 p-0">
                  <b>Nombre</b>
                </Label>
                <Input
                  type="text"
                  className="form-control"
                  placeholder="Ingrese Nombre"
                />
              </div>
              <div className="row mb-3">
                <Label className="form-Label mb-0 p-0">
                  <b>Descripción</b>
                </Label>
                <Textarea
                  className="form-control mt-2"
                  placeholder="Ingrese descripcion"
                />
              </div>
              <div className="row mb-3">
                <Label className="form-Label mb-0 p-0">
                  <b>Imagen</b>
                </Label>
                <Input
                  type="text"
                  className="form-control mt-2"
                  placeholder="Ingrese imagen"
                />
              </div>
              <div className="row mb-3">
                <Label className="form-Label mb-0 p-0">
                  <b>Precio</b>
                </Label>
                <Input
                  type="number"
                  className="form-control mt-2"
                  placeholder="Ingrese el precio"
                />
              </div>
              <div className="row mb-3">
                <Label className="form-Label mb-0 p-0">
                  <b>Nombre de la categoria</b>
                </Label>
                {/* <select
              name="CategoryName"
              className="form-control"
            >
              <option value="">Selecciona una categoría</option>
              <option >
                <h1>{ category.name }</h1>
              </option>
            </select> */}
                <Select>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Selecciona una categoría" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="light">Light</SelectItem>
                    <SelectItem value="dark">Dark</SelectItem>
                    <SelectItem value="system">System</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="row mb-3 mt-2 text-center">
                <div className="col-lg-6">
                  {/* <Button className="btn boton" routerLink="/admins/productos">
                Volver
              </Button> */}
                </div>
                <div className="col-lg-6">
                  <Button
                    type="submit"
                    className="btn boton"
                  >
                    Aceptar
                  </Button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  )
}
export default page

