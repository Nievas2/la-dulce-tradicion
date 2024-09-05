import { Card, CardContent } from "@/components/ui/card"

const Questions = () => {
  return (
    <div className="w-full max-w-8xl mb-16">
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-6 text-center">
          Preguntas Frecuentes
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <Card className="overflow-hidden md:col-span-1 lg:col-span-2 bg-main shadow-md">
            <CardContent className="p-6">
              <h2 className="text-lg font-semibold mb-2">¿COMO COMPRAR?</h2>
              <p className="text-sm text-muted-foreground">
                1. Navega por nuestra web y mira todas las opciones que tenemos
                <br />
                2. Elegi los productos que quieras y sumalos al carrito <br />
                3. En cada producto podes elegir categorias y cantidades <br />
                4. Una vez hecho el carrito, {`"continuar compra"`}, confirmar
                el ticket y se mandara el detalle a nuestro email <br />
                5. Nos estaremos comunicando para confirmar fecha y
                disponibilidad (tambien podes escribirnos primero para ver si
                tenemos lugar) <br />
                6. Una vez cerrado los detalles, se realiza el deposito de la
                seña <br />
                7. En el dia y horario pactado entregamos tu pedido. <br />
              </p>
            </CardContent>
          </Card>
          <Card className="overflow-hidden md:col-span-1 lg:col-span-1 bg-main shadow-md">
            <CardContent className="p-6">
              <h2 className="text-lg font-semibold mb-2">
                ¿HAY QUE SEÑAR LOS PEDIDOS?
              </h2>
              <p className="text-sm text-muted-foreground">
                Si, se pide una seña para confirmar el pedido. <br />
                Una vez señado, el precio final se congela. <br />
                Los valores actuales se mantienen por 15 dias. <br />
                No tomamos pedidos con mas de un mes de anticipacion. <br />
              </p>
            </CardContent>
          </Card>

          <Card className="overflow-hidden md:col-span-1 lg:col-span-1 bg-main shadow-md">
            <CardContent className="p-6">
              <h2 className="text-lg font-semibold mb-2">
                LOS PRECIOS ESTAN ACTUALIZADOS?
              </h2>
              <p className="text-sm text-muted-foreground">
                Si, toda la web, asi como el catalogo de whatsapp cuentan con
                los precios actuales.
              </p>
            </CardContent>
          </Card>
          <Card className="overflow-hidden md:col-span-1 lg:col-span-2 bg-main shadow-md">
            <CardContent className="p-6">
              <h2 className="text-lg font-semibold mb-2">
                ¿CON CUANTA ANTICIPACION DEBO HACER MI PEDIDO?
              </h2>
              <p className="text-sm text-muted-foreground">
                2 o 3 dias minimo,una semana seria lo ideal, pero siempre
                depende un poco de la disponibilidad que tengamos esa fecha por
                eso recomendamos primero consultar.
              </p>
            </CardContent>
          </Card>

          <Card className="overflow-hidden md:col-span-1 lg:col-span-2 bg-main shadow-md">
            <CardContent className="p-6">
              <h2 className="text-lg font-semibold mb-2">
                ¿REALIZAN PRODUCTOS SIN TACC, VEGANOS O VEGETARIANOS?
              </h2>
              <p className="text-sm text-muted-foreground">
                Productos veganos y vegetarianos de lunch si es posible, se
                pueden adaptar a las necesidades o gustos del cliente. <br />
                Pasteleria vegana no realizamos por el momento. <br />
                Sin Tacc NO REALIZAMOS por motivos de contaminacion cruzada, no
                contamos con el lugar adecuado para ese tipo de productos.
                <br />
              </p>
            </CardContent>
          </Card>
          <Card className="overflow-hidden md:col-span-1 lg:col-span-1 bg-main shadow-md">
            <CardContent className="p-6">
              <h2 className="text-lg font-semibold mb-2">¿REALIZAN PEDIDOS?</h2>
              <p className="text-sm text-muted-foreground">
                Si, realizamos entregas a domicilio con costo adicional, si nos
                pasan su ubicacion aproximada, les cotizamos el envio. Tambien
                se pueden retirar los pedidos por nuestro domicilio. <br />
                (villa astolfi, pilar)
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
export default Questions
