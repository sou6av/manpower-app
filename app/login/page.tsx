import { Navbar } from "@/components/navbar"
import { LoginForm } from "@/components/auth/login-form"

export default async function LoginPage({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined } | Promise<{ [key: string]: string | string[] | undefined }>
}) {
  // searchParams can be a promise in some Next.js runtimes — await it to be safe
  const resolved = await (searchParams as any)
  const param = resolved?.registered
  const justRegistered = (Array.isArray(param) ? param[0] : param) === "1"

  return (
    <main>
      <Navbar />
      <section className="mx-auto max-w-md px-4 py-10">
        <h1 className="mb-6 text-2xl font-bold">Sign in</h1>
        <LoginForm justRegistered={justRegistered} />
      </section>
    </main>
  )
}
