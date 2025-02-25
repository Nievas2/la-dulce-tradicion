"use client"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { SubCategory } from "@/interfaces/SubCategory"
import { getSubCategories } from "@/services/SubCategoryService"
import { useQuery } from "@tanstack/react-query"
import ChangeSubCategoryProduct from "./(components)/ChangeSubCategory"
const page = () => {
  const { data, error, isPending } = useQuery({
    queryKey: ["sub-categories"],
    queryFn: getSubCategories,
    refetchOnWindowFocus: false,
    staleTime: 1000 * 60 * 60 * 24,
  })

  return (
    <section className="flex flex-col gap-8">
      <div className="flex justify-end w-full">
        <Dialog>
          <DialogTrigger className="w-fit border border-secondary hover:bg-secondary/80 hover:text-white bg-white text-black transition-colors duration-300 h-10 px-4 py-2 rounded-md">
            Agregar sub categoria
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Agregar una sub categoría</DialogTitle>
              <ChangeSubCategoryProduct />
            </DialogHeader>
          </DialogContent>
        </Dialog>
      </div>
      <div className="flex flex-wrap gap-4">
        {data?.data?.map((subCategory: SubCategory) => (
          <Dialog key={crypto.randomUUID()}>
            <DialogTrigger className="border border-secondary hover:bg-secondary/80 bg-white text-black transition-colors duration-300 h-10 px-4 py-2 rounded-md">
              {subCategory.date} - {subCategory.price}
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Editar una sub categoría</DialogTitle>
                <ChangeSubCategoryProduct
                  Product={subCategory.Product}
                  subCategory={subCategory}
                  id={subCategory.id}
                />
              </DialogHeader>
            </DialogContent>
          </Dialog>
        ))}
        {/* <div className="flex justify-center items-center h-full w-full">
        <div className="border border-white bg-white py-2 px-4 w-[440px] gap-2 rounded-md">
          <Link href="/admins/products/add">Products</Link>
        </div>
      </div> */}
      </div>
    </section>
  )
}
export default page
