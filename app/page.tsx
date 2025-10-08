import Image from "next/image"
import Link from "next/link"
import { ArrowUpRight, CheckCircle2, Phone, Shield, Sparkles, Star } from "lucide-react"

import { Navbar } from "@/components/navbar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"

const SERVICES = [
  {
    title: "Coconut Plucking",
    description: "Traditional climbers for safe, fast Thenga Valikkal with seasonal packages.",
    icon: "🌴",
  },
  {
    title: "Tank & Well Cleaning",
    description: "Deep cleaning with eco-friendly treatments and post-clean water testing.",
    icon: "💧",
  },
  {
    title: "Housekeeping",
    description: "Day-long house cleaning crews, pantry setup, and festival-ready refresh.",
    icon: "🧹",
  },
  {
    title: "Chauffeur On-Call",
    description: "Verified drivers for short errands, outstation trips, and emergency travel.",
    icon: "🚗",
  },
]

const HIGHLIGHTS = [
  {
    title: "Trusted locals",
    description: "Every helper is from your neighbourhood network and identity verified.",
    icon: <Shield className="size-5" />,
  },
  {
    title: "Transparent pricing",
    description: "Fixed community rates with instant invoice—no hidden commissions.",
    icon: <Sparkles className="size-5" />,
  },
  {
    title: "Rapid support",
    description: "Same-day response for most panchayats across Kochi, Thrissur, and Trivandrum.",
    icon: <Phone className="size-5" />,
  },
]

const TESTIMONIALS = [
  {
    name: "Latha N.",
    role: "Thiruvalla",
    quote:
      "Their climber finished coconut harvesting and even cleared the dry leaves. Professional and warm—just like family.",
  },
  {
    name: "Jaison P.",
    role: "Kochi",
    quote:
      "Booked a well cleaning crew in under 5 minutes. The team arrived on time, handled everything neatly, and checked water quality.",
  },
  {
    name: "Anju R.",
    role: "Calicut",
    quote:
      "Call driver reached within 20 minutes during an emergency. The app updates kept us informed the whole time.",
  },
]

const STEPS = [
  {
    title: "Tell us what you need",
    description: "Select the service, date, and locality. Add special notes for our field team.",
  },
  {
    title: "Match with a local pro",
    description: "We assign a verified helper from your area and confirm in-app and over SMS.",
  },
  {
    title: "Relax while we work",
    description: "Track the status, pay digitally or in person, and rate the experience afterwards.",
  },
]

export default function HomePage() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-gradient-to-b from-background via-background to-background/60">
      <Navbar />
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-20 px-4 pb-20 pt-10 sm:pt-12">
        <section className="relative grid gap-10 overflow-hidden rounded-3xl border border-border/70 bg-card p-6 shadow-xl sm:grid-cols-2 sm:p-10">
          <div className="flex flex-col gap-6">
            <Badge variant="secondary" className="w-fit text-xs uppercase tracking-wide">
              Kerala community powered
            </Badge>
            <h1 className="text-pretty text-4xl font-bold tracking-tight sm:text-5xl">
              Get trusted labour for every Kerala household chore—on demand.
            </h1>
            <p className="text-pretty text-base text-muted-foreground sm:text-lg">
              Tap into a verified network of climbers, cleaners, drivers, and skilled fixers. No middlemen—just reliable
              people from your neighbourhood, ready when you are.
            </p>
            <div className="flex flex-col gap-3 sm:flex-row">
              <Button size="lg" asChild>
                <Link href="/register">
                  Get started
                  <ArrowUpRight className="size-4" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="/order">Book a service</Link>
              </Button>
            </div>
            <div className="flex flex-wrap items-center gap-4 text-xs text-muted-foreground">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="size-4 text-primary" />
                1,500+ requests fulfilled
              </div>
              <div className="flex items-center gap-2">
                <Star className="size-4 text-amber-500" />
                4.8 community rating
              </div>
            </div>
          </div>
          <div className="relative flex items-end justify-center">
            <div className="relative aspect-[4/5] w-full max-w-md overflow-hidden rounded-3xl border border-primary/20 bg-gradient-to-tr from-primary/10 via-transparent to-transparent shadow-2xl">
              <Image
                src="/kerala-coconut-climber-manpower-services.png"
                alt="Local coconut climber offering labour services in Kerala"
                fill
                priority
                className="object-cover"
              />
            </div>
          </div>
          <div className="pointer-events-none absolute -left-40 top-20 size-72 rounded-full bg-primary/10 blur-3xl" />
          <div className="pointer-events-none absolute -right-20 bottom-10 size-60 rounded-full bg-secondary/10 blur-3xl" />
        </section>

        <section id="services" className="space-y-6">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h2 className="text-2xl font-semibold sm:text-3xl">Popular services</h2>
              <p className="text-sm text-muted-foreground">
                Book instantly or schedule in advance. We cover the most requested chores across Kerala.
              </p>
            </div>
            <Button variant="outline" asChild>
              <Link href="/order">Browse full catalog</Link>
            </Button>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {SERVICES.map((service) => (
              <Card key={service.title} className="hover:-translate-y-1 hover:shadow-xl transition-transform">
                <CardHeader className="gap-3">
                  <span className="text-2xl" aria-hidden>
                    {service.icon}
                  </span>
                  <CardTitle className="text-lg">{service.title}</CardTitle>
                  <CardDescription>{service.description}</CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
        </section>

        <section id="about" className="grid gap-12 rounded-3xl border border-border/60 bg-card/70 p-8 shadow-inner sm:grid-cols-[1.2fr_1fr]">
          <div className="space-y-6">
            <Badge variant="secondary" className="text-xs uppercase tracking-wide">
              Why families trust us
            </Badge>
            <h2 className="text-3xl font-semibold sm:text-4xl">Kerala-focused, community verified workers</h2>
            <p className="text-base text-muted-foreground">
              We combine hyperlocal relationships with modern scheduling and payments. Every helper is vetted in
              person, equipped with safety gear, and trained to deliver polite service. You receive live updates from
              booking to completion.
            </p>
            <div className="grid gap-4 sm:grid-cols-3">
              {HIGHLIGHTS.map((item) => (
                <div key={item.title} className="flex flex-col gap-3 rounded-2xl border border-border/70 bg-background/60 p-4">
                  <div className="flex size-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
                    {item.icon}
                  </div>
                  <h3 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">{item.title}</h3>
                  <p className="text-sm text-muted-foreground">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="flex flex-col gap-6 rounded-2xl border border-border/60 bg-background/70 p-6">
            <h3 className="text-lg font-semibold">How it works</h3>
            <div className="space-y-5 text-sm">
              {STEPS.map((step, index) => (
                <div key={step.title} className="flex gap-4">
                  <span className="flex size-9 items-center justify-center rounded-full bg-primary/10 font-semibold text-primary">
                    {index + 1}
                  </span>
                  <div className="space-y-1">
                    <p className="font-medium text-foreground">{step.title}</p>
                    <p className="text-muted-foreground">{step.description}</p>
                  </div>
                </div>
              ))}
            </div>
            <Separator />
            <div className="flex items-center gap-3 rounded-2xl border border-dashed border-primary/40 bg-primary/5 p-4 text-sm text-primary">
              <Phone className="size-4" />
              Need immediate help? Call our hotline: <span className="font-semibold">+91 484 123 4567</span>
            </div>
          </div>
        </section>

        <section className="space-y-6">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h2 className="text-2xl font-semibold sm:text-3xl">Voices from the community</h2>
              <p className="text-sm text-muted-foreground">Real feedback from households across the state.</p>
            </div>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {TESTIMONIALS.map((testimonial) => (
              <Card key={testimonial.name} className="h-full bg-background/80">
                <CardHeader className="gap-2">
                  <CardTitle className="text-lg font-semibold">“{testimonial.quote}”</CardTitle>
                </CardHeader>
                <CardContent className="pt-0">
                  <p className="text-sm font-medium text-primary">{testimonial.name}</p>
                  <p className="text-xs uppercase tracking-wide text-muted-foreground">{testimonial.role}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        <section id="contact" className="grid gap-6 rounded-3xl border border-primary/30 bg-primary/5 p-8 shadow-lg sm:grid-cols-[1.4fr_1fr]">
          <div className="space-y-4">
            <Badge variant="secondary" className="bg-primary text-primary-foreground">
              Ready to begin?
            </Badge>
            <h2 className="text-3xl font-semibold sm:text-4xl">Book your labour support in minutes</h2>
            <p className="text-base text-muted-foreground">
              Register once to manage all your household tasks. Track status, share feedback, and get priority support
              for repeat bookings.
            </p>
            <div className="flex flex-col gap-3 sm:flex-row">
              <Button size="lg" asChild>
                <Link href="/register">Create free account</Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="/login">Sign in</Link>
              </Button>
            </div>
          </div>
          <Card className="border border-primary/20 bg-card/90">
            <CardHeader>
              <CardTitle className="text-lg">Prefer speaking to a person?</CardTitle>
              <CardDescription>Our customer care is available from 7am to 9pm every day.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3 text-sm">
              <p>
                Call: <span className="font-semibold text-primary">+91 484 123 4567</span>
              </p>
              <p>
                WhatsApp: <span className="font-semibold text-primary">+91 6282 123 456</span>
              </p>
              <Separator />
              <p className="text-muted-foreground">
                Email us at <a className="text-primary underline" href="mailto:care@labour.ly">care@labour.ly</a>
              </p>
            </CardContent>
          </Card>
        </section>
      </div>
    </main>
  )
}
