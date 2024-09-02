import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from "@/components/ui/accordion"
import { Card, CardContent } from "@/components/ui/card"

const Questions = () => {
  const qaItems = [
    {
      question: "¿Qué es React?",
      answer:
        "Una biblioteca de JavaScript para construir interfaces de usuario."
    },
    {
      question: "¿Qué es Tailwind CSS?",
      answer:
        "Un framework de CSS utilidad-primero para crear diseños personalizados rápidamente."
    },
    {
      question: "¿Qué es Next.js?",
      answer:
        "Un framework de React para producción con renderizado del lado del servidor."
    },
    {
      question: "¿Qué es TypeScript?",
      answer:
        "Un superconjunto tipado de JavaScript que se compila a JavaScript puro."
    },
    {
      question: "¿Qué es un componente en React?",
      answer:
        "Una pieza reutilizable e independiente de la interfaz de usuario."
    },
    {
      question: "¿Qué son los hooks en React?",
      answer:
        "Funciones que permiten usar estado y otras características de React en componentes funcionales."
    }
  ]
  return (
    <div className="w-full max-w-8xl mb-16">
      {/*  <Accordion
        type="single"
        collapsible
        className="w-full max-w-8xl bg-white px-2"
      >
        <AccordionItem value="item-1">
          <AccordionTrigger>¿COMO COMPRAR?</AccordionTrigger>
          <AccordionContent>
            1. Navega por nuestra web y mira todas las opciones que tenemos{" "}
            <br />
            2. Elegi los productos que quieras y sumalos al carrito <br />
            3. En cada producto podes elegir categorias y cantidades <br />
            4. Una vez hecho el carrito, {`"continuar compra"`}, confirmar el
            ticket y se mandara el detalle a nuestro email <br />
            5. Nos estaremos comunicando para confirmar fecha y disponibilidad
            (tambien podes escribirnos primero para ver si tenemos lugar) <br />
            6. Una vez cerrado los detalles, se realiza el deposito de la seña{" "}
            <br />
            7. En el dia y horario pactado entregamos tu pedido. <br />
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-2">
          <AccordionTrigger>
            ¿CON CUANTA ANTICIPACION DEBO HACER MI PEDIDO?
          </AccordionTrigger>
          <AccordionContent>
            2 o 3 dias minimo,una semana seria lo ideal, pero siempre depende un
            poco de la disponibilidad que tengamos esa fecha por eso
            recomendamos primero consultar.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-3">
          <AccordionTrigger>LOS PRECIOS ESTAN ACTUALIZADOS?</AccordionTrigger>
          <AccordionContent>
            Si, toda la web, asi como el catalogo de whatsapp cuentan con los
            precios actuales.{" "}
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-4">
          <AccordionTrigger>¿HAY QUE SEÑAR LOS PEDIDOS?</AccordionTrigger>
          <AccordionContent>
            Si, se pide una seña para confirmar el pedido. <br />
            Una vez señado, el precio final se congela. <br />
            Los valores actuales se mantienen por 15 dias. <br />
            No tomamos pedidos con mas de un mes de anticipacion. <br />{" "}
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-5">
          <AccordionTrigger>¿REALIZAN PEDIDOS?</AccordionTrigger>
          <AccordionContent>
            Si, realizamos entregas a domicilio con costo adicional, si nos
            pasan su ubicacion aproximada, les cotizamos el envio. Tambien se
            pueden retirar los pedidos por nuestro domicilio. <br />
            (villa astolfi, pilar){" "}
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-6">
          <AccordionTrigger>
            ¿REALIZAN PRODUCTOS SIN TACC, VEGANOS O VEGETARIANOS?
          </AccordionTrigger>
          <AccordionContent>
            Productos veganos y vegetarianos de lunch si es posible, se pueden
            adaptar a las necesidades o gustos del cliente. <br />
            Pasteleria vegana no realizamos por el momento. <br />
            Sin Tacc NO REALIZAMOS por motivos de contaminacion cruzada, no
            contamos con el lugar adecuado para ese tipo de productos. <br />{" "}
          </AccordionContent>
        </AccordionItem>
      </Accordion> */}
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-6 text-center">
          Preguntas y Respuestas de Desarrollo Web
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <Card className="overflow-hidden md:col-span-1 lg:col-span-2 bg-main shadow-md">
            <CardContent className="p-6">
              <h2 className="text-lg font-semibold mb-2">item.question</h2>
              <p className="text-sm text-muted-foreground">item.answer</p>
            </CardContent>
          </Card>
          <Card className="overflow-hidden md:col-span-1 lg:col-span-1 bg-main shadow-md">
            <CardContent className="p-6">
              <h2 className="text-lg font-semibold mb-2">item.question</h2>
              <p className="text-sm text-muted-foreground">item.answer</p>
            </CardContent>
          </Card>

          <Card className="overflow-hidden md:col-span-1 lg:col-span-1 bg-main shadow-md">
            <CardContent className="p-6">
              <h2 className="text-lg font-semibold mb-2">item.question</h2>
              <p className="text-sm text-muted-foreground">item.answer</p>
            </CardContent>
          </Card>
          <Card className="overflow-hidden md:col-span-1 lg:col-span-2 bg-main shadow-md">
            <CardContent className="p-6">
              <h2 className="text-lg font-semibold mb-2">item.question</h2>
              <p className="text-sm text-muted-foreground">item.answer</p>
            </CardContent>
          </Card>

          <Card className="overflow-hidden md:col-span-1 lg:col-span-2 bg-main shadow-md">
            <CardContent className="p-6">
              <h2 className="text-lg font-semibold mb-2">item.question</h2>
              <p className="text-sm text-muted-foreground">item.answer</p>
            </CardContent>
          </Card>
          <Card className="overflow-hidden md:col-span-1 lg:col-span-1 bg-main shadow-md">
            <CardContent className="p-6">
              <h2 className="text-lg font-semibold mb-2">item.question</h2>
              <p className="text-sm text-muted-foreground">item.answer</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
export default Questions
