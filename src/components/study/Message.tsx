"use client"

import { useSession } from "next-auth/react"
import Image from "next/image"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import initials from "@/lib/initials"
import { Icons } from "../commons/Icons"

interface MessageProps {
  message: string
}

function Message({ message }: MessageProps) {
  const { data: session } = useSession()
  let image
  let name
  if (session) {
    if (session.user) {
      image = session.user.image
      name = session.user.name
    }
  }

  const displayName = name ? initials(name) : null

  return (
    <div className="flex items-center">
      <p className="text-md">{message}</p>
      <Avatar className="w-6 h-6 bg-slate-400 items-center justify-center m-5">
        {image ? (
          <div className="relative aspect-square h-full w-full">
            <Image
              fill
              src={image}
              sizes="60px"
              alt="profile picture"
              referrerPolicy="no-referrer"
            />
          </div>
        ) : (
          <AvatarFallback>
            <span className="sr-only">{name}</span>
            {displayName && (
              <span className="text-green-600">{displayName}</span>
            )}
            {!displayName && <Icons.User className="h-4 w-4 text-green-600" />}
          </AvatarFallback>
        )}
      </Avatar>
    </div>
  )
}
export default Message
