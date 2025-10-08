import { NextResponse } from "next/server"
import { getDb } from "@/lib/db"
import { loginSchema } from "@/lib/validators"
import bcrypt from "bcryptjs"
import { AUTH_COOKIE, signJwt } from "@/lib/auth"

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const parsed = loginSchema.safeParse(body)
    if (!parsed.success) {
      return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 })
    }
    const { email, password } = parsed.data
    const db = await getDb()
    const users = db.collection("users")
    const user = await users.findOne<{ _id: any; name: string; email: string; passwordHash: string }>({ email })
    if (!user) {
      return NextResponse.json({ error: "Invalid credentials" }, { status: 401 })
    }
    const ok = await bcrypt.compare(password, user.passwordHash)
    if (!ok) {
      return NextResponse.json({ error: "Invalid credentials" }, { status: 401 })
    }
    const token = await signJwt({ sub: String(user._id), email: user.email, name: user.name })

    const res = NextResponse.json({ ok: true })
    res.cookies.set({
      name: AUTH_COOKIE,
      value: token,
      httpOnly: true,
      sameSite: "lax",
      secure: true,
      path: "/",
      maxAge: 60 * 60 * 24 * 7, // 7 days
    })
    return res
  } catch {
    return NextResponse.json({ error: "Server error" }, { status: 500 })
  }
}
