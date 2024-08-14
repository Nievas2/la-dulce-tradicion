import { Button } from "@/components/ui/button"
import Image from "next/image"
import Navbar from "./(components)/Navbar"
import Carrousel from "./(components)/Carrousel"
import Questions from "./(components)/Questions"

export default function Home() {
  return (
    <main className="flex flex-1 max-w-7xl flex-col">
      <Navbar />
      <Carrousel />
      <Questions />
    </main>
  )
}
