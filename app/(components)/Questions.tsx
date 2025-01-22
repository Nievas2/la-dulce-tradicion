"use client"
import { Card, CardContent } from "@/components/ui/card"
import { Icon } from "@iconify/react/dist/iconify.js"
import { motion } from "framer-motion"

const Questions = () => {
  return (
    <div className="w-full max-w-8xl">
      <div className="flex flex-col w-full gap-10 p-0 sm:p-6">
        {/* <h1 className="text-4xl font-bold mb-6 text-center">
          Preguntas Frecuentes
        </h1> */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-4">
          <motion.div
            whileInView={{ x: 0, opacity: 1 }}
            initial={{ x: -10, opacity: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="md:col-span-1 lg:col-span-2 h-full"
          >
            <Card className="overflow-hidden bg-main shadow-md h-full">
              <CardContent className="p-6 relative">
                <Icon
                  className="absolute top-1 right-1 text-red-main"
                  icon="game-icons:cupcake"
                  width="24"
                  height="24"
                />
                <h2 className="text-lg font-semibold mb-2">¿COMO COMPRAR?</h2>
                <p className="text-sm text-muted-foreground">
                  1. Navega por nuestra web y mira todas las opciones que
                  tenemos
                  <br />
                  2. Elegi los productos que quieras y sumalos al carrito <br />
                  3. En cada producto podes elegir categorias y cantidades{" "}
                  <br />
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
          </motion.div>

          <motion.div
            whileInView={{ x: 0, opacity: 1 }}
            initial={{ x: 10, opacity: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className=" md:col-span-1 lg:col-span-1 h-full"
          >
            <Card className="overflow-hidden bg-main shadow-md h-full">
              <CardContent className="p-6 relative">
                <Icon
                  className="absolute top-1 right-1 text-red-main"
                  icon="game-icons:cupcake"
                  width="24"
                  height="24"
                />
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
          </motion.div>

          <motion.div
            whileInView={{ x: 0, opacity: 1 }}
            initial={{ x: -10, opacity: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="md:col-span-1 lg:col-span-1 h-full"
          >
            <Card className="overflow-hidden  bg-main shadow-md h-full">
              <CardContent className="p-6 relative">
                <Icon
                  className="absolute top-1 right-1 text-red-main"
                  icon="game-icons:cupcake"
                  width="24"
                  height="24"
                />
                <h2 className="text-lg font-semibold mb-2">
                  LOS PRECIOS ESTAN ACTUALIZADOS?
                </h2>
                <p className="text-sm text-muted-foreground">
                  Si, toda la web, asi como el catalogo de whatsapp cuentan con
                  los precios actuales.
                </p>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            whileInView={{ x: 0, opacity: 1 }}
            initial={{ x: 10, opacity: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="md:col-span-1 lg:col-span-2 h-full"
          >
            <Card className="overflow-hidden bg-main shadow-md h-full">
              <CardContent className="p-6 relative">
                <Icon
                  className="absolute top-1 right-1 text-red-main"
                  icon="game-icons:cupcake"
                  width="24"
                  height="24"
                />
                <h2 className="text-lg font-semibold mb-2">
                  ¿CON CUANTA ANTICIPACION DEBO HACER MI PEDIDO?
                </h2>
                <p className="text-sm text-muted-foreground">
                  2 o 3 dias minimo,una semana seria lo ideal, pero siempre
                  depende un poco de la disponibilidad que tengamos esa fecha
                  por eso recomendamos primero consultar.
                </p>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            whileInView={{ x: 0, opacity: 1 }}
            initial={{ x: -10, opacity: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="md:col-span-1 lg:col-span-2 h-full"
          >
            <Card className="overflow-hidden bg-main shadow-md h-full">
              <CardContent className="p-6 relative">
                <Icon
                  className="absolute top-1 right-1 text-red-main"
                  icon="game-icons:cupcake"
                  width="24"
                  height="24"
                />
                <h2 className="text-lg font-semibold mb-2">
                  ¿REALIZAN PRODUCTOS SIN TACC, VEGANOS O VEGETARIANOS?
                </h2>
                <p className="text-sm text-muted-foreground">
                  Productos veganos y vegetarianos de lunch si es posible, se
                  pueden adaptar a las necesidades o gustos del cliente. <br />
                  Pasteleria vegana no realizamos por el momento. <br />
                  Sin Tacc NO REALIZAMOS por motivos de contaminacion cruzada,
                  no contamos con el lugar adecuado para ese tipo de productos.
                  <br />
                </p>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            whileInView={{ x: 0, opacity: 1 }}
            initial={{ x: 10, opacity: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="md:col-span-1 lg:col-span-1 h-full"
          >
            <Card className="overflow-hidden bg-main shadow-md h-full">
              <CardContent className="p-6 relative">
                <Icon
                  className="absolute top-1 right-1 text-red-main"
                  icon="game-icons:cupcake"
                  width="24"
                  height="24"
                />
                <h2 className="text-lg font-semibold mb-2">
                  ¿REALIZAN PEDIDOS?
                </h2>
                <p className="text-sm text-muted-foreground">
                  Si, realizamos entregas a domicilio con costo adicional, si
                  nos pasan su ubicacion aproximada, les cotizamos el envio.
                  Tambien se pueden retirar los pedidos por nuestro domicilio.{" "}
                  <br />
                  (villa astolfi, pilar)
                </p>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
export default Questions
