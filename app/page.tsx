import { Button } from "@/components/ui/button"
import Image from "next/image"

import Carrousel from "./(components)/Carrousel"
import Questions from "./(components)/Questions"
import CategoriesSection from "./(components)/CategoriesSection"

export default function Home() {
  return (
    <main className="flex flex-1 max-w-8xl flex-col p-4 gap-24">
      <title>La dulce tradicion | home</title>
      <Carrousel />
      <CategoriesSection />
      <Questions />
    </main>
  )
}
