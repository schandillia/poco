"use client"

import { signIn } from "next-auth/react"
import { useSearchParams } from "next/navigation"
import { Icons } from "@/components/Icons"

import { Button } from "@/components/ui/button"
import { DEFAULT_LOGIN_REDIRECT } from "@/routes"

export default function Social() {
  const searchParams = useSearchParams()
  const callbackUrl = searchParams.get("callback") || DEFAULT_LOGIN_REDIRECT

  const onClick = (provider: "google" | "apple") => {
    signIn(provider, { callbackUrl: callbackUrl || DEFAULT_LOGIN_REDIRECT })
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
        <Icons.Google className="h-5 w-5" />
      </Button>
      <Button size="lg" variant="outline" className="w-full" onClick={() => {}}>
        <Icons.Apple className="h-5 w-5" />
      </Button>
    </div>
  )
}