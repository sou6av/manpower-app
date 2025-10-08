import type React from "react"
import type { Metadata } from "next"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"
import { RouteTransition } from "@/components/providers/route-transition"
import { Suspense } from "react"

export const metadata: Metadata = {
  title: "Manpower App",
  description: "Manpower services and ordering",
  generator: "next.js",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`font-sans ${GeistSans.variable} ${GeistMono.variable}`}>
        <Suspense fallback={<div>Loading...</div>}>
          <RouteTransition>{children}</RouteTransition>
          <Analytics />
        </Suspense>
      </body>
    </html>
  )
}
