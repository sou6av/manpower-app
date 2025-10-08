"use client"

import { useMemo, useState } from "react"
import Link from "next/link"
import { Ban, CalendarClock, CheckCircle2, ClipboardList } from "lucide-react"
import useSWR from "swr"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"

const fetcher = (url: string) => fetch(url).then((r) => r.json())

type Order = {
  id: string
  serviceType: string
  date: string
  time: string
  address: string
  locality: string
  notes?: string
  status: string
  createdAt: string
}

const SERVICE_LABELS: Record<string, string> = {
  "coconut-plucking": "Coconut Plucking (Thenga Valikkal)",
  "tank-well-cleaning": "Water Tank & Well Cleaning",
  "house-cleaning": "House Cleaning",
  chauffeur: "Chauffeur / Call Driver",
  "auto-rickshaw": "Auto Rickshaw On-Demand",
  plumbing: "Plumbing (Add-on)",
  electrical: "Electrical Fixes (Add-on)",
  "small-repairs": "Small Repairs (Add-on)",
}

const ACTIVE_STATUSES = ["pending", "scheduled", "processing", "in-progress", "assigned"]
const COMPLETED_STATUSES = ["completed", "done", "finished"]
const CANCELLED_STATUSES = ["cancelled", "rejected", "declined"]

const FILTERS = [
  { value: "all", label: "All" },
  { value: "active", label: "Active" },
  { value: "completed", label: "Completed" },
  { value: "cancelled", label: "Cancelled" },
]

function normalizeStatus(status: string) {
  const normalized = status?.toLowerCase?.().replaceAll("_", " ") || ""
  return normalized.replace(/\b\w/g, (char) => char.toUpperCase())
}

function formatDate(value: string) {
  if (!value) return "TBD"
  const date = new Date(value)
  if (Number.isNaN(date.getTime())) {
    return value
  }
  return new Intl.DateTimeFormat("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(date)
}

function formatTime(value: string) {
  if (!value) return ""
  const date = new Date(`1970-01-01T${value}`)
  if (Number.isNaN(date.getTime())) {
    return value
  }
  return new Intl.DateTimeFormat("en-IN", {
    hour: "numeric",
    minute: "2-digit",
  }).format(date)
}

export function OrdersList() {
  const { data, isLoading } = useSWR<{ orders: Order[] }>("/api/orders", fetcher, {
    revalidateOnFocus: false,
    keepPreviousData: true,
  })
  const [filter, setFilter] = useState<(typeof FILTERS)[number]["value"]>("all")

  const orders = data?.orders || []

  const stats = useMemo(() => {
    const active = orders.filter((o) => ACTIVE_STATUSES.includes(o.status.toLowerCase())).length
    const completed = orders.filter((o) => COMPLETED_STATUSES.includes(o.status.toLowerCase())).length
    const cancelled = orders.filter((o) => CANCELLED_STATUSES.includes(o.status.toLowerCase())).length
    return {
      total: orders.length,
      active,
      completed,
      cancelled,
      lastUpdated: orders[0]?.createdAt ?? null,
    }
  }, [orders])

  const filteredOrders = useMemo(() => {
    if (filter === "all") return orders
    if (filter === "active") {
      return orders.filter((o) => ACTIVE_STATUSES.includes(o.status.toLowerCase()))
    }
    if (filter === "completed") {
      return orders.filter((o) => COMPLETED_STATUSES.includes(o.status.toLowerCase()))
    }
    if (filter === "cancelled") {
      return orders.filter((o) => CANCELLED_STATUSES.includes(o.status.toLowerCase()))
    }
    return orders
  }, [orders, filter])

  if (isLoading && !data) {
    return (
      <div className="space-y-6">
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {Array.from({ length: 4 }).map((_, idx) => (
            <div key={idx} className="animate-pulse rounded-xl border border-border/70 bg-card/60 p-6 shadow-sm" />
          ))}
        </div>
        <div className="space-y-4">
          {Array.from({ length: 3 }).map((_, idx) => (
            <div key={idx} className="animate-pulse rounded-2xl border border-border/70 bg-card/60 p-5 shadow-sm" />
          ))}
        </div>
      </div>
    )
  }

  if (orders.length === 0) {
    return (
      <Card className="text-center py-12 px-6 md:py-16 md:px-8">
        <CardHeader className="space-y-4">
          <CardTitle className="text-2xl">No bookings yet</CardTitle>
          <CardDescription className="text-base max-w-md mx-auto">
            Place your first request to see updates here.
          </CardDescription>
        </CardHeader>
        <CardContent className="pt-6">
          <Button size="lg" asChild>
            <Link href="/order">Book a service</Link>
          </Button>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-8">
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <Card className="hover:shadow-md transition-shadow">
          <CardHeader>
            <div className="flex items-center justify-between gap-2">
              <div>
                <CardTitle className="text-sm text-muted-foreground">Total orders</CardTitle>
                <p className="text-3xl font-semibold text-foreground">{stats.total}</p>
              </div>
              <div className="rounded-lg bg-primary/10 p-2 text-primary">
                <ClipboardList className="size-5" />
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-xs text-muted-foreground">All bookings created so far</p>
          </CardContent>
        </Card>
        <Card className="hover:shadow-md transition-shadow">
          <CardHeader>
            <div className="flex items-center justify-between gap-2">
              <div>
                <CardTitle className="text-sm text-muted-foreground">Active</CardTitle>
                <p className="text-3xl font-semibold text-foreground">{stats.active}</p>
              </div>
              <div className="rounded-lg bg-secondary/10 p-2 text-secondary">
                <CalendarClock className="size-5" />
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-xs text-muted-foreground">Pending or upcoming visits</p>
          </CardContent>
        </Card>
        <Card className="hover:shadow-md transition-shadow">
          <CardHeader>
            <div className="flex items-center justify-between gap-2">
              <div>
                <CardTitle className="text-sm text-muted-foreground">Completed</CardTitle>
                <p className="text-3xl font-semibold text-foreground">{stats.completed}</p>
              </div>
              <div className="rounded-lg bg-emerald-100 p-2 text-emerald-600">
                <CheckCircle2 className="size-5" />
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-xs text-muted-foreground">Successfully closed requests</p>
          </CardContent>
        </Card>
        <Card className="hover:shadow-md transition-shadow">
          <CardHeader>
            <div className="flex items-center justify-between gap-2">
              <div>
                <CardTitle className="text-sm text-muted-foreground">Cancelled</CardTitle>
                <p className="text-3xl font-semibold text-foreground">{stats.cancelled}</p>
              </div>
              <div className="rounded-lg bg-rose-100 p-2 text-rose-600">
                <Ban className="size-5" />
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-xs text-muted-foreground">Declined or withdrawn requests</p>
          </CardContent>
        </Card>
      </div>

      <div className="space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            {FILTERS.map((item) => (
              <Button
                key={item.value}
                variant={filter === item.value ? "default" : "outline"}
                size="sm"
                onClick={() => setFilter(item.value)}
              >
                {item.label}
              </Button>
            ))}
          </div>
          {stats.lastUpdated ? (
            <span className="text-xs text-muted-foreground">
              Updated {formatDate(stats.lastUpdated)}
            </span>
          ) : null
          }
        </div>

        {filteredOrders.length === 0 ? (
          <Card className="text-center py-12 px-6 md:py-16 md:px-8">
            <CardHeader className="space-y-4">
              <CardTitle className="text-2xl">No orders in this view</CardTitle>
              <CardDescription className="text-base max-w-md mx-auto">
                Switch to a different filter to see more bookings.
              </CardDescription>
            </CardHeader>
          </Card>
        ) : (
          <div className="grid gap-4">
            {filteredOrders.map((order) => (
              <Card key={order.id} className="border-border/80 hover:border-primary/40 hover:shadow-lg transition-all">
                <CardHeader className="gap-3 pb-0">
                  <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
                    <CardTitle className="text-lg font-semibold">
                      {SERVICE_LABELS[order.serviceType] || order.serviceType}
                    </CardTitle>
                    <Badge
                      variant={
                        COMPLETED_STATUSES.includes(order.status.toLowerCase())
                          ? "secondary"
                          : CANCELLED_STATUSES.includes(order.status.toLowerCase())
                            ? "destructive"
                            : "outline"
                      }
                    >
                      {normalizeStatus(order.status)}
                    </Badge>
                  </div>
                  <CardDescription className="flex flex-col gap-2 text-sm sm:flex-row sm:items-center sm:justify-between">
                    <span>
                      {formatDate(order.date)} {order.time ? `• ${formatTime(order.time)}` : ""}
                    </span>
                    <span className="text-muted-foreground">{order.locality}</span>
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4 pt-0">
                  <Separator className="my-2" />
                  <div className="grid gap-2 text-sm text-muted-foreground">
                    <p>
                      <span className="font-medium text-foreground">Service address:</span> {order.address}
                    </p>
                    {order.notes ? (
                      <p>
                        <span className="font-medium text-foreground">Notes:</span> {order.notes}
                      </p>
                    ) : null}
                    <p className="text-xs uppercase tracking-wide text-muted-foreground/80">
                      ID: <span className="font-mono text-foreground/80">{order.id}</span>
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
