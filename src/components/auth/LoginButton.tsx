/* eslint-disable @typescript-eslint/no-unused-vars, react/require-default-props */

"use client"

import { useRouter } from "next/navigation"
import { ArrowRight } from "lucide-react"
import { Button, buttonVariants } from "../ui/button"

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
  const onClick = () => {
    router.push("/auth/login")
  }

  if (mode === "modal") return <span>TODO: Implement Modal</span>
  return (
    <Button
      onClick={onClick}
      className={buttonVariants({
        size: "sm",
      })}
    >
      {children} <ArrowRight className="ml-1.5 h-5 w-5" />
    </Button>
  )
}
