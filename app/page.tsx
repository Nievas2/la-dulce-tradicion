import { Button } from "@/components/ui/button"
import Image from "next/image"

import Carrousel from "./(components)/Carrousel"
import Questions from "./(components)/Questions"
import CategoriesSection from "./(components)/CategoriesSection"
import Hero from "./(components)/Hero"

export default function Home() {
  return (
    <main className="flex flex-1 max-w-8xl flex-col gap-4">
      <title>La dulce tradicion | home</title>
      {/* <Carrousel /> */}
      <Hero />
      <div className="px-4">
        <Questions />
        <CategoriesSection />
      </div>
    </main>
  )
}
