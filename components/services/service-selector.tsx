"use client"

import type React from "react"

import useSWR from "swr"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Calendar } from '@/components/ui/calendar'
import { Button } from '@/components/ui/button'
import { TimePicker } from '@/components/ui/time-picker'
import { Clock } from 'lucide-react'

const fetcher = (url: string) => fetch(url).then((r) => r.json())

type Service = { 
  id: string
  name: string
  daytimeOnly?: boolean
}

// Helper function to check if a time is during night hours (6 PM - 6 AM)
function isNightTime(timeString: string): boolean {
  if (!timeString) return false
  const [hours] = timeString.split(':').map(Number)
  return hours >= 18 || hours < 6
}

// Helper function to check if selected date/time is in the past
function isPastDateTime(date: Date | undefined, time: string): boolean {
  if (!date) return false
  const now = new Date()
  const selectedDateTime = new Date(date)
  
  if (time) {
    const [hours, minutes] = time.split(':').map(Number)
    selectedDateTime.setHours(hours, minutes, 0, 0)
  }
  
  return selectedDateTime < now
}

export function ServiceOrderForm() {
  const { data, isLoading } = useSWR<{ services: Service[] }>("/api/services", fetcher)
  const services = data?.services || []
  const router = useRouter()
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [selectedService, setSelectedService] = useState<string>("")
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined)
  const [selectedTime, setSelectedTime] = useState<string>("")
  const [timePopoverOpen, setTimePopoverOpen] = useState(false)

  const selectedServiceData = services.find(s => s.id === selectedService)
  const isDaytimeOnlyService = selectedServiceData?.daytimeOnly || false

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setError(null)

    // Validate date and time
    if (!selectedDate) {
      setError("Please select a date")
      return
    }

    if (!selectedTime) {
      setError("Please select a time")
      return
    }

    // Check if date/time is in the past
    if (isPastDateTime(selectedDate, selectedTime)) {
      setError("Cannot book a service in the past. Please select a future date and time.")
      return
    }

    // Check if daytime-only service is being booked at night
    if (isDaytimeOnlyService && isNightTime(selectedTime)) {
      setError(`${selectedServiceData?.name} can only be booked during daytime hours (6 AM - 6 PM)`)
      return
    }

    setSubmitting(true)
    const fd = new FormData(e.currentTarget)
    const payload = {
      serviceType: String(fd.get("serviceType") || ""),
      date: String(fd.get("date") || ""),
      time: String(fd.get("time") || ""),
      address: String(fd.get("address") || ""),
      locality: String(fd.get("locality") || ""),
      notes: String(fd.get("notes") || ""),
    }
    const res = await fetch("/api/orders", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    })
    const json = await res.json()
    setSubmitting(false)
    if (!res.ok) {
      setError(json?.error || "Failed to place order")
      return
    }
    router.push(`/order/success?orderId=${encodeURIComponent(json.orderId)}`)
  }

  return (
    <div className="rounded-lg border border-border bg-card p-4">
      <h2 className="mb-3 text-lg font-semibold">Book a Local Service</h2>
      <form onSubmit={onSubmit} className="grid gap-4">
        <div className="grid gap-1">
          <label htmlFor="serviceType" className="text-sm">
            Service
          </label>
          <div className="flex items-center gap-2">
            <Select
              onValueChange={(v: string) => setSelectedService(v)}
            >
              <SelectTrigger className="w-full" aria-label="Select service">
                <SelectValue>{selectedService ? services.find(s => s.id === selectedService)?.name : (isLoading ? 'Loading services...' : 'Select a service')}</SelectValue>
              </SelectTrigger>
              <SelectContent>
                {services.map((s) => (
                  <SelectItem key={s.id} value={s.id}>
                    {s.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {/* hidden input so form submit includes serviceType */}
            <input type="hidden" name="serviceType" value={selectedService} />
          </div>
          {isDaytimeOnlyService && (
            <p className="text-xs text-muted-foreground">
              ⏰ This service is only available during daytime hours (6 AM - 6 PM)
            </p>
          )}
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <div className="grid gap-1">
            <label htmlFor="date" className="text-sm">
              Preferred Date
            </label>
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" className="w-full text-left">
                  {selectedDate ? selectedDate.toLocaleDateString() : 'Select date'}
                </Button>
              </PopoverTrigger>
              <PopoverContent>
                <Calendar
                  mode="single"
                  selected={selectedDate}
                  onSelect={(d) => setSelectedDate(d || undefined)}
                  disabled={(date) => {
                    // Disable dates before today
                    const today = new Date()
                    today.setHours(0, 0, 0, 0)
                    return date < today
                  }}
                />
                <div className="mt-2 flex justify-end">
                  <Button variant="ghost" size="sm" onClick={() => setSelectedDate(undefined)}>Clear</Button>
                </div>
              </PopoverContent>
            </Popover>
            <input type="hidden" name="date" value={selectedDate ? selectedDate.toISOString().slice(0,10) : ''} />
          </div>

          <div className="grid gap-1">
            <label htmlFor="time" className="text-sm">
              Preferred Time
            </label>
            <Popover open={timePopoverOpen} onOpenChange={setTimePopoverOpen}>
              <PopoverTrigger asChild>
                <Button variant="outline" className="w-full justify-start text-left font-normal">
                  <Clock className="mr-2 h-4 w-4" />
                  {selectedTime ? (() => {
                    const [hours, minutes] = selectedTime.split(':').map(Number)
                    const period = hours >= 12 ? 'PM' : 'AM'
                    const displayHour = hours % 12 || 12
                    return `${displayHour.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')} ${period}`
                  })() : 'Select time'}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto">
                <TimePicker
                  value={selectedTime}
                  onChange={(time) => setSelectedTime(time)}
                  onConfirm={() => setTimePopoverOpen(false)}
                />
              </PopoverContent>
            </Popover>
            <input type="hidden" name="time" value={selectedTime} />
          </div>
        </div>

        <div className="grid gap-1">
          <label htmlFor="locality" className="text-sm">
            Locality / Panchayat
          </label>
          <input
            id="locality"
            name="locality"
            placeholder="e.g., Fort Kochi, Palarivattom"
            required
            className="rounded-md border border-border bg-background px-3 py-2"
          />
        </div>

        <div className="grid gap-1">
          <label htmlFor="address" className="text-sm">
            Address
          </label>
          <textarea
            id="address"
            name="address"
            required
            className="min-h-24 rounded-md border border-border bg-background px-3 py-2"
          />
        </div>

        <div className="grid gap-1">
          <label htmlFor="notes" className="text-sm">
            Notes (optional)
          </label>
          <textarea
            id="notes"
            name="notes"
            className="min-h-20 rounded-md border border-border bg-background px-3 py-2"
            placeholder="Any special instructions"
          />
        </div>

        {error && (
          <p className="text-sm text-destructive">
            {"Error: "}
            {String(error)}
          </p>
        )}
        <button
          type="submit"
          disabled={submitting}
          className="rounded-md bg-primary px-4 py-2 text-primary-foreground hover:opacity-90 disabled:opacity-50"
        >
          {submitting ? "Placing order..." : "Place Order"}
        </button>
      </form>
    </div>
  )
}
