"use client"

import Link from "next/link"
import { Menu, PhoneCall, UserRound } from "lucide-react"
import useSWR from "swr"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"

const fetcher = (url: string) => fetch(url).then((r) => r.json())

export function Navbar() {
  const { data, mutate } = useSWR<{ user: { name?: string } | null }>("/api/auth/me", fetcher)
  const user = data?.user

  async function handleLogout() {
    await fetch("/api/auth/logout", { method: "POST" })
    mutate()
  }

  return (
    <header className="sticky top-0 z-40 w-full border-b border-border/60 bg-background/80 backdrop-blur">
      <nav className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 py-4">
        <Link href="/" className="group flex items-center gap-3 font-semibold">
          <span className="flex size-10 items-center justify-center rounded-xl bg-primary/10 text-lg text-primary transition duration-200 group-hover:bg-primary/20">
            LL
          </span>
          <span className="flex flex-col leading-tight">
            <span className="text-base tracking-tight">Labour.ly</span>
            <span className="text-xs font-normal text-muted-foreground">Trusted local services</span>
          </span>
        </Link>
        <div className="hidden items-center gap-2 md:flex">
          <Link href="/#services" className="text-sm text-muted-foreground transition hover:text-foreground">
            Services
          </Link>
          <Link href="/orders" className="text-sm text-muted-foreground transition hover:text-foreground">
            My Orders
          </Link>
          <Link href="/#about" className="text-sm text-muted-foreground transition hover:text-foreground">
            About
          </Link>
          <Link href="/#contact" className="text-sm text-muted-foreground transition hover:text-foreground">
            Contact
          </Link>
          <Badge variant="secondary" className="hidden lg:inline-flex">
            <PhoneCall className="size-3" /> 24/7 helpline
          </Badge>
        </div>
        <div className="hidden items-center gap-2 md:flex">
          {user ? (
            <>
              <Badge variant="outline" className="flex items-center gap-2">
                <UserRound className="size-3" />
                <span className="text-xs">{user.name ? `Hi, ${user.name.split(" ")[0]}` : "Account"}</span>
              </Badge>
              <Button variant="outline" size="sm" asChild>
                <Link href="/orders">Dashboard</Link>
              </Button>
              <Button size="sm" asChild>
                <Link href="/order">Book service</Link>
              </Button>
              <Button variant="ghost" size="sm" onClick={handleLogout}>
                Logout
              </Button>
            </>
          ) : (
            <>
              <Button variant="ghost" size="sm" asChild>
                <Link href="/login">Sign in</Link>
              </Button>
              <Button size="sm" asChild>
                <Link href="/register">Create account</Link>
              </Button>
            </>
          )}
        </div>
        <div className="flex items-center gap-2 md:hidden">
          <Button size="sm" asChild className="shadow-sm">
            <Link href={user ? "/order" : "/register"}>
              {user ? "Book" : "Join"}
            </Link>
          </Button>
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon">
                <Menu className="size-4" />
                <span className="sr-only">Toggle navigation</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="top" className="flex flex-col gap-6 pb-12 pt-10 px-6">
              <SheetHeader className="px-0 text-left">
                <SheetTitle className="text-lg">Navigate</SheetTitle>
              </SheetHeader>
              <nav className="flex flex-col gap-4 text-base font-medium text-left">
                <Link href="/" className="text-foreground hover:text-primary transition-colors" prefetch={false}>
                  Home
                </Link>
                <Link href="/#services" className="text-foreground hover:text-primary transition-colors" prefetch={false}>
                  Services
                </Link>
                <Link href="/orders" className="text-foreground hover:text-primary transition-colors" prefetch={false}>
                  My Orders
                </Link>
                <Link href="/#about" className="text-foreground hover:text-primary transition-colors" prefetch={false}>
                  About
                </Link>
                <Link href="/#contact" className="text-foreground hover:text-primary transition-colors" prefetch={false}>
                  Contact
                </Link>
              </nav>
              {user ? (
                <div className="mt-auto flex flex-col gap-3">
                  <div className="rounded-lg border border-border/80 bg-card p-4">
                    <p className="font-medium text-foreground">{user.name || "Logged in"}</p>
                    <p className="text-sm text-muted-foreground">Manage your bookings and profile.</p>
                  </div>
                  <Button asChild size="lg" className="w-full">
                    <Link href="/orders">Open dashboard</Link>
                  </Button>
                  <Button variant="outline" size="lg" className="w-full" onClick={handleLogout}>
                    Logout
                  </Button>
                </div>
              ) : (
                <div className="mt-auto flex flex-col gap-3">
                  <Button asChild size="lg" className="w-full">
                    <Link href="/register">Create account</Link>
                  </Button>
                  <Button variant="outline" asChild size="lg" className="w-full">
                    <Link href="/login">Sign in</Link>
                  </Button>
                </div>
              )}
            </SheetContent>
          </Sheet>
        </div>
      </nav>
    </header>
  )
}
