import { jwtDecode } from "jwt-decode"

export function decodeJwt(token: string) {
  const decode = jwtDecode(token)
  console.log(decode)
  return decode
}
