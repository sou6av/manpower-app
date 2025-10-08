import { Navbar } from "@/components/navbar"
import { RegisterForm } from "@/components/auth/register-form"

export default function RegisterPage() {
  return (
    <main>
      <Navbar />
      <section className="mx-auto max-w-md px-4 py-10">
        <h1 className="mb-6 text-2xl font-bold">Create your account</h1>
        <RegisterForm />
      </section>
    </main>
  )
}
