import { Button } from "@/components/ui/button"
import Link from "next/link"

export default async function Page() {
  return (
    <div className="flex justify-center items-center h-64 w-full">
      <div className="flex flex-col border border-white bg-white py-2 px-4 w-[440px] gap-6 rounded-md">
        <h4 className="text-center text-2xl font-bold">Precios</h4>
        <Link href="/admins/price/productos" className="w-full">
          <Button variant="secondary" className="w-full">
            Productos
          </Button>
        </Link>

        <Link href="/admins/price/subcategorias" className="w-full">
          <Button variant="secondary" className="w-full">
            Subcategorias
          </Button>
        </Link>
      </div>
    </div>
  )
}
