"use client"

import { Button } from "@/components/ui/button"
import { usePathname, useRouter, useSearchParams } from "next/navigation"

const Nullable = () => {
  const searchParams = useSearchParams()
  const pathname = usePathname()
  const { replace } = useRouter()
  const params = new URLSearchParams(searchParams!)
  const isNullable = searchParams?.get("nulleable")
  return (
    <Button
      onClick={() => {
        params.set("nulleable", isNullable === "true" ? "false" : "true")
        replace(`${pathname}?${params.toString()}`)
      }}
      variant={isNullable === "true" ? "secondary" : "link"}
      size="sm"
    >
      {isNullable === "true" ? "Ocultar" : "Mostrar"} nulos
    </Button>
  )
}
export default Nullable
