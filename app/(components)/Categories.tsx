"use client"
import { Button } from "@/components/ui/button"
import { useSearchParams, usePathname, useRouter } from "next/navigation"
import { useEffect, useState } from "react"

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

  return (
    <section className="flex flex-col gap-4">
      <h2 className="text-xl text-center lg:text-start font-bold">Tipos de productos</h2>
      <ul className="flex flex-row flex-wrap gap-4 items-center justify-center lg:justify-start lg:items-start lg:flex-col lg:gap-2">
        <li>
          {categoryId && (
            <Button
              onClick={() => handleChange("nothing")}
              variant="items"
              size="ghost"
            >
              Todos
            </Button>
          )}
        </li>
        <li>
          <Button
            onClick={() => handleChange("1")}
            className={
              categoryId === "1"
                ? "bg-secondary text-white hover:bg-secondary/80"
                : ""
            }
            variant="items"
            size="ghost"
          >
            Pasteleria
          </Button>
        </li>
        <li>
          <Button
            onClick={() => handleChange("2")}
            variant="items"
            className={
              categoryId === "2"
                ? "bg-secondary text-white hover:bg-secondary/80"
                : ""
            }
            size="ghost"
          >
            Lunch
          </Button>
        </li>
        <li>
          <Button
            onClick={() => handleChange("3")}
            variant="items"
            className={
              categoryId === "3"
                ? "bg-secondary text-white hover:bg-secondary/80"
                : ""
            }
            size="ghost"
          >
            Perniles y carnes
          </Button>
        </li>
        <li>
          <Button
            onClick={() => handleChange("4")}
            variant="items"
            className={
              categoryId === "4"
                ? "bg-secondary text-white hover:bg-secondary/80"
                : ""
            }
            size="ghost"
          >
            Tortas
          </Button>
        </li>
        <li>
          <Button
            onClick={() => handleChange("5")}
            variant="items"
            className={
              categoryId === "5"
                ? "bg-secondary text-white hover:bg-secondary/80"
                : ""
            }
            size="ghost"
          >
            Combos y agregados
          </Button>
        </li>
      </ul>
    </section>
    /*     <Select onValueChange={handleChange} defaultValue={searchParams?.get("categoryId") || "nothing"}>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Categorias" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="nothing">Todos</SelectItem>
        {categories &&
          categories.map((category) => (
            <SelectItem
              key={category.id}
              value={category.id?.toString() || "1"}
            >
              {category.name}
            </SelectItem>
          ))}
      </SelectContent>
    </Select> */
  )
}
export default Categories
