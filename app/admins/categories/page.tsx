"use client"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { useQuery } from "@tanstack/react-query"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "@/components/ui/dialog"
import Link from "next/link"
import { useEffect } from "react"
import { getCategories } from "@/services/CategoryService"
import ChangeCategory from "./(components)/ChangeCategory"
import { Category } from "@/interfaces/Category"
const page = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["categories"],
    queryFn: getCategories,
    refetchOnWindowFocus: false,
    staleTime: 1000 * 60 * 60 * 24
  })
  console.log(data, error)

  return (
    <>
      <div className="flex flex-col mb-3 mt-3 offset-lg-2  h-full w-full relative">
        <Dialog>
          <DialogTrigger className="absolute -top-10 right-0 border border-secondary hover:bg-secondary/80 bg-white text-black transition-colors duration-300 h-10 px-4 py-2 rounded-md">
            Add
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Agregar un producto</DialogTitle>
              <ChangeCategory />
            </DialogHeader>
          </DialogContent>
        </Dialog>
        {data?.data?.map((category: Category) => (
          <Dialog key={crypto.randomUUID()}>
            <DialogTrigger className="border border-secondary hover:bg-secondary/80 bg-white text-black transition-colors duration-300 h-10 px-4 py-2 rounded-md">
              Add
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Agregar una category</DialogTitle>

                <ChangeCategory
                  id={category.id}
                  name={category.name}
                  image={category.image}
                />
              </DialogHeader>
            </DialogContent>
          </Dialog>
        ))}
      </div>
    </>
  )
}
export default page
