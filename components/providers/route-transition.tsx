"use client"

import { usePathname } from "next/navigation"
import { AnimatePresence, motion } from "framer-motion"
import type { ReactNode } from "react"

export function RouteTransition({ children }: { children: ReactNode }) {
  const pathname = usePathname()
  
  const prefersReducedMotion = typeof window !== 'undefined' 
    ? window.matchMedia('(prefers-reduced-motion: reduce)').matches 
    : false

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={pathname}
        initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 12 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: prefersReducedMotion ? 0 : -12 }}
        transition={{ 
          duration: prefersReducedMotion ? 0.15 : 0.4,
          ease: [0.22, 0.61, 0.36, 1], // Custom cubic-bezier for smooth easing
        }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  )
}
