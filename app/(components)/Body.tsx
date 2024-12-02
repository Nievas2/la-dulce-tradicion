"use client"
import ProviderQuery from "@/utils/ProviderQuery"
import FloatButtons from "./FloatButtons"
import { AuthContextProvider } from "@/contexts/auth-context"
import Navbar from "./Navbar"
import { GoogleOAuthProvider } from "@react-oauth/google"
import { ViewTransitions } from "next-view-transitions"

const Body = ({ children }: { children: React.ReactNode }) => {
  const client_id = process.env.NEXT_PUBLIC_CLIENT_ID
  return (
    <main className="flex flex-1 max-w-8xl flex-col h-full w-full min-h-screen">
      <ViewTransitions>
        <FloatButtons />
        <ProviderQuery>
          <GoogleOAuthProvider clientId={client_id || ""}>
            <AuthContextProvider>
              <div className="flex flex-col items-center justify-center w-full bg-main">
                <img
                  src="/sinfondo.webp"
                  className="h-20 "
                  alt="LaDulceTradicion logo"
                />
                <h5 className="font-bold bg-main">
                  Flor & Lucas - Pastelería y algo más
                </h5>
              </div>
              <Navbar />
              <div className="w-full h-full">{children}</div>
            </AuthContextProvider>
          </GoogleOAuthProvider>
        </ProviderQuery>
      </ViewTransitions>
    </main>
  )
}
export default Body
