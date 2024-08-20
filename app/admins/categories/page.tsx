"use client"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select"
import Link from "next/link"
const page = () => {
  return (
    <>
      <div className="flex flex-col mb-3 mt-3 offset-lg-2">
        <Link href="/admins/categories/add">Add</Link>
      </div>
    </>
  )
}
export default page
