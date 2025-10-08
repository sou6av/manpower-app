import { NextResponse } from "next/server"

export type Service = {
  id: string
  name: string
  daytimeOnly?: boolean // true if service cannot be booked at night (6 PM - 6 AM)
}

const SERVICES: Service[] = [
  { id: "coconut-plucking", name: "Coconut Plucking", daytimeOnly: true },
  { id: "well-cleaning", name: "Well Cleaning", daytimeOnly: true },
  { id: "water-tank-cleaning", name: "Water Tank Cleaning" },
  { id: "house-cleaning", name: "House Cleaning" },
  { id: "garden-maintenance", name: "Garden & Lawn Maintenance", daytimeOnly: true },
  { id: "chauffeur", name: "Chauffeur / Call Driver" },
  { id: "auto-rickshaw", name: "Auto Rickshaw On-Demand" },
  { id: "plumbing", name: "Plumbing Services" },
  { id: "electrical", name: "Electrical Work" },
  { id: "carpentry", name: "Carpentry & Small Repairs" },
  { id: "painting", name: "Painting Services", daytimeOnly: true },
]

export async function GET() {
  return NextResponse.json({ services: SERVICES })
}
