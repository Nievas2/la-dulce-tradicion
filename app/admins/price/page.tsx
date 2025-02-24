import { Button } from "@/components/ui/button"
import Link from "next/link"

export default async function Page() {
  return (
    <div className="flex flex-col gap-4 w-full">
      <Link href="/admins/price/productos">
        <Button variant="main">Productos</Button>
      </Link>

      <Link href="/admins/price/subcategorias">
        <Button variant="main">Subcategorias</Button>
      </Link>
    </div>
  )
}
