"use client"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { useQuery } from "@tanstack/react-query"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select"
import Link from "next/link"
import { useEffect } from "react"
import { getCategories } from "@/services/CategoryService"
const page = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["categories"],
    queryFn: getCategories,
    refetchOnWindowFocus: false,
    staleTime: 1000 * 60 * 60 * 24,
  })
  console.log(data, error)

  return (
    <>
      <div className="flex flex-col mb-3 mt-3 offset-lg-2  h-full w-full">
        <Link href="/admins/categories/add">Add</Link>
        {data?.data.map((category: any) => (
          <div key={category.id}>
            {category.name}
          </div>
        ))}
      </div>
    </>
  )
}
export default page
