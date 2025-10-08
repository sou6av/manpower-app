import { z } from "zod"

export const registerSchema = z.object({
  name: z.string().min(2, "Name is too short"),
  email: z.string().email(),
  phone: z.string().min(10, "Phone must be at least 10 digits").max(15, "Phone too long"),
  password: z.string().min(6, "Password must be at least 6 characters"),
})

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
})

export const orderSchema = z.object({
  serviceType: z.string().min(2),
  date: z.string().min(4),
  time: z.string().min(2),
  address: z.string().min(5),
  notes: z.string().optional(),
  locality: z.string().min(2),
})

export type RegisterInput = z.infer<typeof registerSchema>
export type LoginInput = z.infer<typeof loginSchema>
export type OrderInput = z.infer<typeof orderSchema>
