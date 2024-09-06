"use client"
import ProviderQuery from "@/utils/ProviderQuery"
import FloatButtons from "./FloatButtons"
import { AuthContextProvider } from "@/contexts/auth-context"
import Navbar from "./Navbar"

const Body = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="flex flex-1 max-w-8xl flex-col h-full w-full min-h-screen">
      <FloatButtons />
      <ProviderQuery>
        <AuthContextProvider>
          <Navbar />
          <div className="w-full h-full mt-20 sm:mt-0">{children}</div>
        </AuthContextProvider>
      </ProviderQuery>
    </main>
  )
}
export default Body
