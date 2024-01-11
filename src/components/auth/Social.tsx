"use client"

import { FcGoogle } from "react-icons/fc"
import { FaApple } from "react-icons/fa"
import { signIn } from "next-auth/react"

import { Button } from "@/components/ui/button"
import { DEFAULT_LOGIN_REDIRECT } from "@/routes"

export default function Social() {
  const onClick = (provider: "google" | "apple") => {
    signIn(provider, { callbackUrl: DEFAULT_LOGIN_REDIRECT })
    return false
  }

  return (
    <div className="flex items-center w-full gap-x-2">
      <Button
        size="lg"
        variant="outline"
        className="w-full"
        onClick={() => onClick("google")}
      >
        <FcGoogle className="h-5 w-5" />
      </Button>
      <Button size="lg" variant="outline" className="w-full" onClick={() => {}}>
        <FaApple className="h-5 w-5" />
      </Button>
    </div>
  )
}
