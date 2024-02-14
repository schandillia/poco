import * as z from "zod"

export const NewPasswordSchema = z.object({
  password: z.string().min(6, {
    message: "Password must be at least 6 characters",
  }),
})

export const ResetSchema = z.object({
  email: z.string().email({
    message: "Email is required",
  }),
})

export const LoginSchema = z.object({
  email: z.string().email({
    message: "Email is required",
  }),
  password: z.string().min(1, {
    message: "Password is required",
  }),
  code: z.optional(z.string()),
})

export const RegisterSchema = z
  .object({
    email: z.string().email({
      message: "Email is required",
    }),
    password: z.string().min(6, {
      message: "Minimum 6 characters required",
    }),
    confirmPassword: z.string().min(6, {
      message: "Minimum 6 characters required",
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords must match",
    path: ["confirmPassword"], // path of error
  })

export const PaperSchema = z.object({
  id: z.string().uuid({ message: "ID must be a valid UUID" }), // Assuming custom generation
  paperTitle: z.string().min(1, {
    message: "Paper title is required and must be at least 1 character",
  }),
  pageCount: z
    .number()
    .min(1, { message: "Page count must be a positive integer" }),
})
