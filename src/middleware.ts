import { NextResponse, type NextRequest } from "next/server"
import { cookies } from "next/headers"
import { decodeJwt } from "./utils/decodeJwt"

export async function middleware(request: NextRequest) {
  const token = cookies().get("token")?.value
  const protectedRoutes = ["/admins/:path*"]
  const publicRoutes = [
    "/",
    "/login",
    "/register",
    "/contacto",
    "/productos/:path*"
  ]
  const path = request.nextUrl.pathname
  // si es publica no necesita token
  if (publicRoutes.includes(path)) {
    return NextResponse.next()
  }
  // si es protegida necesita token para administradores
  if (request.nextUrl.pathname.startsWith("/admins") && token) {
    const user = decodeJwt(token)
    if (user) {
      if (user.isAdmin) {
        return NextResponse.next()
      }
      return NextResponse.redirect(new URL("/", request.url))
    }
  } else {
    return NextResponse.redirect(new URL("/login", request.url))
  }
  return NextResponse.redirect(new URL("/", request.url))
}

export const config = {
  matcher: ["/admins/:path*"]
}
