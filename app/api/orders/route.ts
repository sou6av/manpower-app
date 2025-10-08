import { NextResponse } from "next/server"
import { getDb } from "@/lib/db"
import { getCurrentUser } from "@/lib/auth"
import { orderSchema } from "@/lib/validators"

export async function GET() {
  const user = await getCurrentUser()
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  const db = await getDb()
  const orders = db.collection("orders")
  const list = await orders.find({ userId: user.sub }).sort({ createdAt: -1 }).limit(50).toArray()

  const sanitized = list.map((o: any) => ({
    id: String(o._id),
    serviceType: o.serviceType,
    date: o.date,
    time: o.time,
    address: o.address,
    locality: o.locality,
    notes: o.notes ?? "",
    status: o.status,
    createdAt: o.createdAt,
  }))
  return NextResponse.json({ orders: sanitized })
}

export async function POST(req: Request) {
  const user = await getCurrentUser()
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

  try {
    const body = await req.json()
    const parsed = orderSchema.safeParse(body)
    if (!parsed.success) {
      return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 })
    }
    const db = await getDb()
    const orders = db.collection("orders")
    const doc = {
      userId: user.sub,
      ...parsed.data,
      status: "pending",
      createdAt: new Date(),
    }
    const result = await orders.insertOne(doc)
    return NextResponse.json({ ok: true, orderId: String(result.insertedId) })
  } catch {
    return NextResponse.json({ error: "Server error" }, { status: 500 })
  }
}
