/* eslint-disable @typescript-eslint/no-unused-vars, react/jsx-pascal-case */

import Image from "next/image"
import Link from "next/link"
import SignoutButton from "@/components/auth/SignoutButton"
import initials from "@/lib/initials"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu"
import { Button } from "./ui/button"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Icons } from "./Icons"

interface UserAccountNavProps {
  email: string | undefined
  name: string
  imageUrl: string
}
const UserAccountNav = async ({
  email,
  imageUrl,
  name,
}: UserAccountNavProps) => {
  const displayName = name ? initials(name) : null
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild className="overflow-visible">
        <Button className="rounded-full h-8 w-8 aspect-square bg-slate-400">
          <Avatar className="relative w-8 h-8">
            {imageUrl ? (
              <div className="relative aspect-square h-full w-full">
                <Image
                  fill
                  src={imageUrl}
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
                {!displayName && (
                  <Icons.user className="h-4 w-4 text-green-600" />
                )}
              </AvatarFallback>
            )}
          </Avatar>
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end">
        <div className="flex items-center justify-start gap-2 p-2">
          <div className="flex flex-col space-y-0.5 leading-none">
            {name && <p className="font-medium text-sm">{name}</p>}
            {email && (
              <p className="w-[200px] truncate text-xs text-gray-600 dark:text-gray-400">
                {email}
              </p>
            )}
          </div>
        </div>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <Link href="/dashboard">Dashboard</Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="cursor-pointer">
          <SignoutButton />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
export default UserAccountNav
