import { NextResponse } from "next/server"
import { getDb } from "@/lib/db"
import { registerSchema } from "@/lib/validators"
import bcrypt from "bcryptjs"

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const parsed = registerSchema.safeParse(body)
    if (!parsed.success) {
      return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 })
    }
    const { name, email, phone, password } = parsed.data
    const db = await getDb()
    const users = db.collection("users")

    // unique email
    const existing = await users.findOne({ email })
    if (existing) {
      return NextResponse.json({ error: "Email already registered" }, { status: 409 })
    }

    const passwordHash = await bcrypt.hash(password, 10)
    const result = await users.insertOne({
      name,
      email,
      phone,
      passwordHash,
      createdAt: new Date(),
    })

    return NextResponse.json({ ok: true, userId: result.insertedId.toString() })
  } catch (e) {
    return NextResponse.json({ error: "Server error" }, { status: 500 })
  }
}
