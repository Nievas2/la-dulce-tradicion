import { Button } from "@/components/ui/button"
import { CakeIcon } from "lucide-react"
import Link from "next/link"

export default function notfound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-main text-brown-800 p-4">
      <CakeIcon className="w-24 h-24 text-secondary mb-8" />
      <h1 className="text-4xl md:text-6xl font-bold text-center mb-4">¡Oops! Pastel no encontrado</h1>
      <p className="text-xl md:text-2xl text-center mb-8">
        Parece que este pastel se ha desvanecido del horno. ¡Volvamos a la cocina principal!
      </p>
      <Link href="/">
        <Button className="bg-secondary hover:bg-amber-600 text-white font-bold py-2 px-4 rounded-full transition duration-300 ease-in-out transform hover:scale-105">
          Volver al Inicio
        </Button>
      </Link>
    </div>
  )
}