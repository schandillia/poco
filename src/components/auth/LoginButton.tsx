/* eslint-disable @typescript-eslint/no-unused-vars, react/require-default-props */

"use client"

import { useRouter } from "next/navigation"
import LoginForm from "@/components/auth/LoginForm"
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog"

interface LoginButtonProps {
  children: React.ReactNode
  mode?: "modal" | "redirect"
  asChild?: boolean
}

export default function LoginButton({
  children,
  mode = "redirect",
  asChild,
}: LoginButtonProps) {
  const router = useRouter()
  const onClick = (event: any) => {
    event.preventDefault()
    router.push("/auth/login")
  }

  if (mode === "modal")
    return (
      <Dialog>
        <DialogTrigger asChild={asChild}>{children}</DialogTrigger>
        <DialogContent className="p-0 w-auto bg-transparent border-none">
          <LoginForm />
        </DialogContent>
      </Dialog>
    )
  return (
    <span
      onClick={onClick}
      tabIndex={0}
      aria-label="Login"
      role="button"
      onKeyDown={(event) => {
        if (event.key === "Enter") {
          onClick(event)
        }
      }}
    >
      {children}
    </span>
  )
}
