"use client"
import { Button } from "@/components/ui/button"
import { useSearchParams, usePathname, useRouter } from "next/navigation"
import { useEffect, useState } from "react"

const CategoriesArray: string[] = [
  "Pasteleria",
  "Lunch",
  "Perniles y carnes",
  "Tortas",
  "Agregados y especiales",
  "Combos",
  "Eventos y servicios",
]

const Categories = () => {
  const searchParams = useSearchParams()
  const pathname = usePathname()
  const { replace } = useRouter()
  const params = new URLSearchParams(searchParams!)
  const categoryId = searchParams?.get("categoryId")

  function handleChange(value: string) {
    params.set("page", "1")
    params.set("query", searchParams?.get("query")?.toString() || "")
    if (value) {
      if (value === "nothing") {
        params.delete("categoryId")
      } else {
        params.set("categoryId", value)
      }
    } else {
      params.delete("categoryId")
    }

    replace(`${pathname}?${params.toString()}`)
  }

  const renderList = () => {
    return CategoriesArray.map((category, i) => {
      return (
        <li key={crypto.randomUUID()}>
          <Button
            onClick={() => handleChange(`${i + 1}`)}
            variant="items"
            className={
              categoryId === `${i + 1}`
                ? "bg-secondary text-white hover:bg-secondary/80"
                : "bg-white text-black hover:bg-secondary hover:text-white transition-colors duration-150"
            }
            size="ghost"
            disabled={categoryId === `${i + 1}`}
          >
            {category}
          </Button>
        </li>
      )
    })
  }
  return (
    <section className="flex flex-col gap-4 justify-center items-center w-full">
      <ul className="flex flex-wrap gap-4 items-center justify-center lg:gap-2">
        {categoryId && (
          <li>
            <Button
              onClick={() => handleChange("nothing")}
              variant="items"
              className={
                categoryId === "nothing"
                ? "bg-secondary text-white hover:bg-secondary/80"
                : "bg-white text-black hover:bg-secondary hover:text-white transition-colors duration-150"
              }
              size="ghost"
              disabled={categoryId === "nothing"}
            >
              Todos
            </Button>
          </li>
        )}
        {renderList()}
      </ul>
    </section>
  )
}
export default Categories
