"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"

export function RegisterForm() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setError(null)
    setLoading(true)
    const form = e.currentTarget
    const formData = new FormData(form)
    const payload = {
      name: String(formData.get("name") || ""),
      email: String(formData.get("email") || ""),
      phone: String(formData.get("phone") || ""),
      password: String(formData.get("password") || ""),
    }
    const res = await fetch("/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    })
    setLoading(false)
    const data = await res.json()
    if (!res.ok) {
      setError(data?.error || "Failed to register")
      return
    }
    router.push("/login?registered=1")
  }

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <div className="grid gap-1">
        <label htmlFor="name" className="text-sm">
          Full Name
        </label>
        <input id="name" name="name" required className="rounded-md border border-border bg-background px-3 py-2" />
      </div>
      <div className="grid gap-1">
        <label htmlFor="email" className="text-sm">
          Email
        </label>
        <input
          id="email"
          type="email"
          name="email"
          required
          className="rounded-md border border-border bg-background px-3 py-2"
        />
      </div>
      <div className="grid gap-1">
        <label htmlFor="phone" className="text-sm">
          Phone
        </label>
        <input id="phone" name="phone" required className="rounded-md border border-border bg-background px-3 py-2" />
      </div>
      <div className="grid gap-1">
        <label htmlFor="password" className="text-sm">
          Password
        </label>
        <input
          id="password"
          type="password"
          name="password"
          required
          className="rounded-md border border-border bg-background px-3 py-2"
        />
      </div>
      {error && (
        <p className="text-sm text-destructive">
          {"Registration failed: "}
          {String(error)}
        </p>
      )}
      <button
        type="submit"
        disabled={loading}
        className="w-full rounded-md bg-primary px-4 py-2 text-primary-foreground hover:opacity-90 disabled:opacity-50"
      >
        {loading ? "Creating account..." : "Create Account"}
      </button>
    </form>
  )
}
