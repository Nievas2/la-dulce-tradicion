"use client"
import { User } from "@/interfaces/User"
import { decodeJwt } from "@/utils/decodeJwt"
import { createContext, useContext, useEffect, useState } from "react"
import Cookies from "js-cookie"
interface UserStorage {
  email: string
  id: string
  isAdmin: boolean
}
export interface AuthUser {
  user: UserStorage
  token: string
}

interface AuthContextType {
  authUser: AuthUser | null
  setAuthUser: (user: AuthUser | null) => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const useAuthContext = (): AuthContextType => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error("useAuthContext must be used within an AuthContextProvider")
  }
  return context
}

export const AuthContextProvider = ({
  children,
}: {
  children: React.ReactNode
}) => {
  const [authUser, setAuthUser] = useState<AuthUser | null>(null)

  useEffect(() => {
    const token = Cookies.get("token")
    let user = null
    if (token) {
      const data = decodeJwt(token)
      user = {
        user: data,
        token: token,
      }
    }
    setAuthUser(user)
  }, [])

  return (
    <AuthContext.Provider value={{ authUser, setAuthUser }}>
      {children}
    </AuthContext.Provider>
  )
}
