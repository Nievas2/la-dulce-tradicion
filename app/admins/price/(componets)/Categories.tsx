"use client"
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem
} from "@/components/ui/select"
import { Category } from "@/interfaces/Category"
import { useSearchParams, usePathname, useRouter } from "next/navigation"
import { useEffect, useState } from "react"

const Categories = () => {
  const [categories, setCategories] = useState<Category[]>()
  const searchParams = useSearchParams()
  const pathname = usePathname()
  const { replace } = useRouter()
  useEffect(() => {
    fetchCategories()
  }, [])

  async function fetchCategories() {
    try {
      const response = await fetch("/api/categories").then((res) => res.json())
      console.log(response)

      setCategories(response)
    } catch (error) {
      throw error
    }
  }
  function handleChange(value: string) {
    const params = new URLSearchParams(searchParams!)
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
    <Select onValueChange={handleChange} defaultValue={searchParams?.get("categoryId") || "nothing"}>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Theme" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="nothing">todos</SelectItem>
        {categories &&
          categories.map((category) => (
            <SelectItem
              key={category.id}
              value={category.id?.toString() || "1"}
            >
              {category.name}
            </SelectItem>
          ))}
        {/*         <SelectItem value="dark">Dark</SelectItem>
        <SelectItem value="system">System</SelectItem> */}
      </SelectContent>
    </Select>
  )
}
export default Categories
