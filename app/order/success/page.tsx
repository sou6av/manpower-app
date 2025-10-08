import { Navbar } from "@/components/navbar"

type Props = {
  searchParams: Promise<{ orderId?: string }>
}

export default async function OrderSuccessPage({ searchParams }: Props) {
  const { orderId } = await searchParams
  return (
    <main>
      <Navbar />
      <section className="mx-auto max-w-xl px-4 py-10">
        <div className="rounded-lg border border-border bg-card p-6">
          <h1 className="text-2xl font-bold">Order received!</h1>
          <p className="mt-2 text-muted-foreground">
            Thank you. Your request has been submitted. Our community partner will contact you shortly.
          </p>
          {orderId ? (
            <p className="mt-4 text-sm">
              Reference ID: <span className="font-mono">{orderId}</span>
            </p>
          ) : null}
          <div className="mt-6 flex items-center gap-3">
            <a href="/orders" className="rounded-md bg-primary px-4 py-2 text-primary-foreground hover:opacity-90">
              View My Orders
            </a>
            <a
              href="/order"
              className="rounded-md border border-border px-4 py-2 hover:bg-accent hover:text-accent-foreground"
            >
              Book Another
            </a>
          </div>
        </div>
      </section>
    </main>
  )
}
