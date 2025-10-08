import { redirect } from "next/navigation"
import { Navbar } from "@/components/navbar"
import { ServiceOrderForm } from "@/components/services/service-selector"
import { getCurrentUser } from "@/lib/auth"

export default async function OrderPage() {
  const user = await getCurrentUser()
  if (!user) {
    redirect("/login")
  }
  return (
    <main>
      <Navbar />
      <section className="mx-auto max-w-2xl px-4 py-10">
        <h1 className="mb-4 text-2xl font-bold">Book a Service</h1>
        <p className="mb-6 text-sm text-muted-foreground">
          Kerala-specific daily tasks and add-ons. Fill in details and place your request.
        </p>
        <ServiceOrderForm />
      </section>
    </main>
  )
}
