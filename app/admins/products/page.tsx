"use client"
import Link from "next/link"

const page = () => {
  return (
    <div className="">
      <div className="flex justify-center items-center h-full w-full">
        <div className="border border-white bg-white py-2 px-4 w-[440px] gap-2 rounded-md">
          <Link href="/admins/products/add">Products</Link>
        </div>
      </div>
    </div>
  )
}
export default page
