import { Button } from "@/components/ui/button";
import Image from "next/image";
import Navbar from "./(components)/Navbar";
import Carrousel from "./(components)/Carrousel";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col max-w-7xl">
      <Navbar />
      <Carrousel />
    </main>
  );
}
