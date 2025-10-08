"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

interface TimePickerProps {
  value?: string // HH:mm format (24-hour)
  onChange?: (time: string) => void
  onConfirm?: () => void
  className?: string
}

export function TimePicker({ value, onChange, onConfirm, className }: TimePickerProps) {
  // Parse initial value or default to current time
  const parseTime = (timeStr?: string) => {
    if (!timeStr) {
      const now = new Date()
      return {
        hour: now.getHours() % 12 || 12,
        minute: now.getMinutes(),
        period: now.getHours() >= 12 ? 'PM' : 'AM'
      }
    }
    const [hours, minutes] = timeStr.split(':').map(Number)
    return {
      hour: hours % 12 || 12,
      minute: minutes,
      period: hours >= 12 ? 'PM' : 'AM'
    }
  }

  const { hour: initialHour, minute: initialMinute, period: initialPeriod } = parseTime(value)
  
  const [selectedHour, setSelectedHour] = React.useState(initialHour)
  const [selectedMinute, setSelectedMinute] = React.useState(initialMinute)
  const [selectedPeriod, setSelectedPeriod] = React.useState<'AM' | 'PM'>(initialPeriod as 'AM' | 'PM')

  const hourRef = React.useRef<HTMLDivElement>(null)
  const minuteRef = React.useRef<HTMLDivElement>(null)

  // Generate arrays
  const hours = Array.from({ length: 12 }, (_, i) => i + 1)
  const minutes = Array.from({ length: 60 }, (_, i) => i)

  // Update parent when time changes
  React.useEffect(() => {
    const hour24 = selectedPeriod === 'PM' 
      ? (selectedHour === 12 ? 12 : selectedHour + 12)
      : (selectedHour === 12 ? 0 : selectedHour)
    const timeString = `${hour24.toString().padStart(2, '0')}:${selectedMinute.toString().padStart(2, '0')}`
    onChange?.(timeString)
  }, [selectedHour, selectedMinute, selectedPeriod, onChange])

  // Scroll wheel item height
  const itemHeight = 40

  const scrollToIndex = (ref: React.RefObject<HTMLDivElement | null>, index: number) => {
    if (ref.current) {
      ref.current.scrollTop = index * itemHeight - itemHeight * 2
    }
  }

  React.useEffect(() => {
    scrollToIndex(hourRef, selectedHour - 1)
    scrollToIndex(minuteRef, selectedMinute)
  }, [])

  const handleHourScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const scrollTop = e.currentTarget.scrollTop
    const index = Math.round(scrollTop / itemHeight)
    const newHour = hours[Math.max(0, Math.min(index, hours.length - 1))]
    if (newHour !== selectedHour) {
      setSelectedHour(newHour)
    }
  }

  const handleMinuteScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const scrollTop = e.currentTarget.scrollTop
    const index = Math.round(scrollTop / itemHeight)
    const newMinute = minutes[Math.max(0, Math.min(index, minutes.length - 1))]
    if (newMinute !== selectedMinute) {
      setSelectedMinute(newMinute)
    }
  }

  return (
    <div className={cn("flex flex-col gap-4", className)}>
      {/* Time Display */}
      <div className="text-center">
        <div className="text-4xl font-bold tabular-nums">
          {selectedHour.toString().padStart(2, '0')}:{selectedMinute.toString().padStart(2, '0')}
          <span className="ml-2 text-2xl">{selectedPeriod}</span>
        </div>
      </div>

      {/* Wheel Pickers */}
      <div className="flex items-center justify-center gap-2">
        {/* Hour Wheel */}
        <div className="relative">
          <div
            ref={hourRef}
            onScroll={handleHourScroll}
            className="h-[200px] w-16 overflow-y-scroll scrollbar-hide snap-y snap-mandatory"
            style={{
              scrollBehavior: 'smooth',
              maskImage: 'linear-gradient(to bottom, transparent, black 25%, black 75%, transparent)',
              WebkitMaskImage: 'linear-gradient(to bottom, transparent, black 25%, black 75%, transparent)',
            }}
          >
            <div className="py-20">
              {hours.map((hour) => (
                <div
                  key={hour}
                  className={cn(
                    "flex h-10 items-center justify-center text-lg font-medium transition-all snap-center cursor-pointer",
                    hour === selectedHour
                      ? "text-primary scale-110 font-bold"
                      : "text-muted-foreground hover:text-foreground"
                  )}
                  onClick={() => {
                    setSelectedHour(hour)
                    scrollToIndex(hourRef, hour - 1)
                  }}
                >
                  {hour.toString().padStart(2, '0')}
                </div>
              ))}
            </div>
          </div>
          <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
            <div className="h-10 w-full border-y-2 border-primary/20" />
          </div>
        </div>

        <div className="text-2xl font-bold">:</div>

        {/* Minute Wheel */}
        <div className="relative">
          <div
            ref={minuteRef}
            onScroll={handleMinuteScroll}
            className="h-[200px] w-16 overflow-y-scroll scrollbar-hide snap-y snap-mandatory"
            style={{
              scrollBehavior: 'smooth',
              maskImage: 'linear-gradient(to bottom, transparent, black 25%, black 75%, transparent)',
              WebkitMaskImage: 'linear-gradient(to bottom, transparent, black 25%, black 75%, transparent)',
            }}
          >
            <div className="py-20">
              {minutes.map((minute) => (
                <div
                  key={minute}
                  className={cn(
                    "flex h-10 items-center justify-center text-lg font-medium transition-all snap-center cursor-pointer",
                    minute === selectedMinute
                      ? "text-primary scale-110 font-bold"
                      : "text-muted-foreground hover:text-foreground"
                  )}
                  onClick={() => {
                    setSelectedMinute(minute)
                    scrollToIndex(minuteRef, minute)
                  }}
                >
                  {minute.toString().padStart(2, '0')}
                </div>
              ))}
            </div>
          </div>
          <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
            <div className="h-10 w-full border-y-2 border-primary/20" />
          </div>
        </div>

        {/* AM/PM Toggle */}
        <div className="flex flex-col gap-1 ml-2">
          <Button
            type="button"
            variant={selectedPeriod === 'AM' ? 'default' : 'outline'}
            size="sm"
            className="h-9 w-14"
            onClick={() => setSelectedPeriod('AM')}
          >
            AM
          </Button>
          <Button
            type="button"
            variant={selectedPeriod === 'PM' ? 'default' : 'outline'}
            size="sm"
            className="h-9 w-14"
            onClick={() => setSelectedPeriod('PM')}
          >
            PM
          </Button>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex justify-end gap-2">
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={() => {
            const now = new Date()
            setSelectedHour(now.getHours() % 12 || 12)
            setSelectedMinute(now.getMinutes())
            setSelectedPeriod(now.getHours() >= 12 ? 'PM' : 'AM')
            scrollToIndex(hourRef, (now.getHours() % 12 || 12) - 1)
            scrollToIndex(minuteRef, now.getMinutes())
          }}
        >
          Now
        </Button>
        <Button
          type="button"
          variant="default"
          size="sm"
          onClick={onConfirm}
        >
          Confirm
        </Button>
      </div>
    </div>
  )
}
