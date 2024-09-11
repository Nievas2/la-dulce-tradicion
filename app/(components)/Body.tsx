"use client"
import ProviderQuery from "@/utils/ProviderQuery"
import FloatButtons from "./FloatButtons"
import { AuthContextProvider } from "@/contexts/auth-context"
import Navbar from "./Navbar"
import { GoogleOAuthProvider } from "@react-oauth/google"

const Body = ({ children }: { children: React.ReactNode }) => {
  const client_id = process.env.NEXT_PUBLIC_CLIENT_ID
  return (
    <main className="flex flex-1 max-w-8xl flex-col h-full w-full min-h-screen">
      <FloatButtons />
      <ProviderQuery>
        <GoogleOAuthProvider clientId={client_id || ""}>
          <AuthContextProvider>
            <Navbar />
            <div className="w-full h-full mt-20 sm:mt-0">{children}</div>
          </AuthContextProvider>
        </GoogleOAuthProvider>
      </ProviderQuery>
    </main>
  )
}
export default Body
