"use client"

import { signIn } from "next-auth/react"
import { useSearchParams } from "next/navigation"
import { Icons } from "@/components/Icons"

import { Button } from "@/components/ui/button"

export default function Social() {
  const searchParams = useSearchParams()
  const callbackUrl = searchParams.get("callback")

  const onClick = (provider: "google" | "apple") => {
    const currentUrl = `/${window.location.href.split("/").slice(3).join("/")}` // Get the current URL slug
    const originUrl = callbackUrl !== null ? callbackUrl : currentUrl
    signIn(provider, { callbackUrl: originUrl })
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
