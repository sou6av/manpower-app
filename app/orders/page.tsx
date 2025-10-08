import { Navbar } from "@/components/navbar"
import { OrdersList } from "@/components/orders/orders-list"
import { getCurrentUser } from "@/lib/auth"
import { redirect } from "next/navigation"

export default async function OrdersPage() {
  const user = await getCurrentUser()
  if (!user) redirect("/login")
  return (
    <main className="min-h-screen bg-gradient-to-b from-background via-background to-background/80">
      <Navbar />
      <section className="mx-auto flex w-full max-w-6xl flex-col gap-8 px-4 pb-16 pt-10">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div className="space-y-2">
            <p className="text-sm font-medium uppercase tracking-wide text-primary">Your dashboard</p>
            <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">Service orders</h1>
            <p className="max-w-2xl text-sm text-muted-foreground">
              Track all service requests, know what is pending, and review completed visits in one place.
            </p>
          </div>
        </div>
        <OrdersList />
      </section>
    </main>
  )
}
