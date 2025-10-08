import { cookies } from "next/headers"
import { jwtVerify, SignJWT } from "jose"

export const AUTH_COOKIE = "auth_token"
const JWT_SECRET = process.env.JWT_SECRET
if (!JWT_SECRET) {
  throw new Error("Missing JWT_SECRET environment variable")
}
const secretKey = new TextEncoder().encode(JWT_SECRET)

export type JwtPayload = { sub: string; email: string; name?: string }

export async function signJwt(payload: JwtPayload, expiresIn = "7d") {
  const token = await new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime(expiresIn)
    .sign(secretKey)
  return token
}

export async function verifyJwt(token: string) {
  const { payload } = await jwtVerify(token, secretKey)
  return payload as JwtPayload
}

export async function getCurrentUser() {
  const cookieStore = await cookies()
  const token = cookieStore.get(AUTH_COOKIE)?.value
  if (!token) return null
  try {
    const payload = await verifyJwt(token)
    return payload
  } catch {
    return null
  }
}
