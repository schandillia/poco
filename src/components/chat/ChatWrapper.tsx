/* eslint-disable @typescript-eslint/naming-convention, @typescript-eslint/no-shadow */

"use client"

import { ChevronLeft, Loader, XCircle } from "lucide-react"
import Link from "next/link"
import { trpc } from "@/app/_trpc/client"
import ChatInput from "./ChatInput"
import Messages from "./Messages"
import { buttonVariants } from "../ui/button"
// import { ChatContextProvider } from "./ChatContext"

interface chatWrapperProps {
  fileId: string
}

function ChatWrapper({ fileId }: chatWrapperProps) {
  const { data, isLoading } = trpc.getFileUploadStatus.useQuery(
    {
      fileId,
    },
    {
      refetchInterval: (data) =>
        data?.status === "SUCCESS" || data?.status === "FAILED" ? false : 500,
    },
  )

  if (isLoading)
    return (
      <div className="relative min-h-full bg-gray-50 dark:bg-zinc-800 flex divide-y divide-gray-300 dark:divide-gray-500 flex-coljustify-between gap-2">
        <div className="flex-1 flex justify-center items-center flex-col mb-28">
          <div className="flex flex-col items-center gap-2">
            <Loader className="h-8 w-8 text-green-600 animate-spin" />
            <h3 className="font-semibold text-xl">Loading...</h3>
            <p className="text-zinc-500 dark:text-gray-700 text-sm">
              We&rsquo;re preparing your paper.
            </p>
          </div>
        </div>
        <ChatInput isDisabled />
      </div>
    )

  if (data?.status === "PROCESSING")
    return (
      <div className="relative min-h-full bg-gray-50 dark:bg-zinc-800 flex divide-y divide-gray-300 dark:divide-gray-500 flex-coljustify-between gap-2">
        <div className="flex-1 flex justify-center items-center flex-col mb-28">
          <div className="flex flex-col items-center gap-2">
            <Loader className="h-8 w-8 text-green-600 animate-spin" />
            <h3 className="font-semibold text-xl">Processing paper...</h3>
            <p className="text-zinc-500 text-sm">This won&rsquo;t take long.</p>
          </div>
        </div>
        <ChatInput isDisabled />
      </div>
    )

  if (data?.status === "FAILED")
    return (
      <div className="relative min-h-full bg-gray-50 dark:bg-zinc-800 flex divide-y divide-gray-300 dark:divide-gray-500 flex-coljustify-between gap-2">
        <div className="flex-1 flex justify-center items-center flex-col mb-28">
          <div className="flex flex-col items-center gap-2">
            <XCircle className="h-8 w-8 text-red-500" />
            <h3 className="font-semibold text-xl">Too many pages</h3>
            <p className="text-zinc-500 text-sm">
              Your <span className="font-medium">Free</span> tier supports up to
              5 pages per document.
            </p>
            <Link
              href="/dashboard"
              className={buttonVariants({
                variant: "secondary",
                className: "mt-4",
              })}
            >
              <ChevronLeft className="h-3 w-3 mr-1.5" />
              Back
            </Link>
          </div>
        </div>
        <ChatInput isDisabled />
      </div>
    )

  return (
    <div className="relative min-h-full bg-gray-50 dark:bg-zinc-800 flex divide-y divide-gray-300 dark:divide-gray-500 flex-col justify-between gap-2">
      <div className="flex-1 flex justify-center items-center flex-col mb-28">
        <Messages />
      </div>
      <ChatInput />
    </div>
  )
}
export default ChatWrapper
