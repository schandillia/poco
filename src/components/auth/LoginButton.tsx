/* eslint-disable @typescript-eslint/no-unused-vars, react/require-default-props */

"use client"

import { useRouter } from "next/navigation"
import { useState } from "react"
import LoginFormModal from "@/components/auth/LoginFormModal"
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog"
import RegisterFormModal from "@/components/auth/RegisterFormModal"
import ResetFormModal from "@/components/auth/ResetFormModal"

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
  const [type, setType] = useState("Login")

  const handleTypeChange = (newType: string) => {
    setType(newType)
  }

  // Callback function to set type to "Login" when the dialog is closed
  const handleDialogClose = () => {
    setType("Login")
  }

  if (mode === "modal")
    return (
      <Dialog onOpenChange={handleDialogClose}>
        <DialogTrigger asChild={asChild}>{children}</DialogTrigger>
        <DialogContent className="p-0 w-auto bg-transparent border-none">
          {type === "Login" && (
            <LoginFormModal onTypeChange={handleTypeChange} />
          )}
          {type === "Register" && (
            <RegisterFormModal onTypeChange={handleTypeChange} />
          )}
          {type === "Reset" && (
            <ResetFormModal onTypeChange={handleTypeChange} />
          )}
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
