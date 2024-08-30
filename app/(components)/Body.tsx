"use client"
import ProviderQuery from "@/utils/ProviderQuery"
import FloatButtons from "./FloatButtons"
import { AuthContextProvider } from "@/contexts/auth-context"
import Navbar from "./Navbar"

const Body = ({ children }: { children: React.ReactNode }) => {

  return (
    <>
      <FloatButtons />
      <ProviderQuery>
        <AuthContextProvider>
          <Navbar />
          {children}
        </AuthContextProvider>
      </ProviderQuery>
    </>
  )
}
export default Body