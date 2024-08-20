"use client"
import Link from "next/link"

const page = () => {
  return (
    <div className="bg-no-repeat bg-cover bg-center bg-[url('/fondos/fondos1.jpg')] w-full max-w-7xl">
      <div className="flex justify-center items-center h-screen">
        <div className="border border-white bg-white py-2 px-4 w-[440px] gap-2 rounded-md">
          <Link href="/admins/products/add">Products</Link>
        </div>
      </div>
    </div>
  )
}
export default page
