import { jwtDecode } from "jwt-decode"

export function decodeJwt(token: string) {
  const decode = jwtDecode(token)
  return decode
}
