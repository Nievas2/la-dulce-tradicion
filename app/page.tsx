import { Button } from "@/components/ui/button"
import Image from "next/image"

import Questions from "./(components)/Questions"
import CategoriesSection from "./(components)/CategoriesSection"
import Hero from "./(components)/Hero"/* 
import Carrousel from "./(components)/Carrousel"
import Redes from "@/components/shared/Redes" */

export default function Home() {
  return (
    <main className="flex flex-1 max-w-8xl flex-col gap-4">
      <title>La dulce tradicion | Inicio</title>
      {/* <Carrousel /> */}
      <Hero />
      <div>
        <Questions />
        <CategoriesSection />
       {/*  <Redes /> */}
      </div>
    </main>
  )
}
