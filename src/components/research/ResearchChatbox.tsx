/* eslint-disable @typescript-eslint/no-unused-vars, no-console */

"use client"

import { useEffect, useState } from "react"
import { Icons } from "@/components/Icons"
import ResearchInput from "@/components/research/ResearchInput"

interface ResearchChatboxProps {
  file: File
}
function ResearchChatbox({ file }: ResearchChatboxProps) {
  const [isVectorized, setIsVectorized] = useState(false)
  const [isPaperError, setIsPaperError] = useState(false)

  const handleVectorize = async (givenFile: File) => {
    try {
      const res = await fetch("/api/vectorize", {
        method: "POST",
        body: givenFile,
      })
      if (!res.ok) throw new Error(await res.text())
      console.log(await res.json())
      setIsVectorized(true)
    } catch (error: any) {
      setIsPaperError(true)
    }
  }
  useEffect(() => {
    if (file) handleVectorize(file)
  }, [])

  return (
    <div className="relative min-h-full bg-gray-50 dark:bg-zinc-800 flex divide-y divide-gray-300 dark:divide-gray-500 flex-col justify-between gap-2">
      <div className="flex-1 flex justify-center items-center flex-col mb-28">
        {isPaperError && (
          <div className="flex flex-col items-center gap-2">
            <Icons.Alert className="h-8 w-8 text-destructive" />
            <h3 className="font-semibold text-xl">Something went wrong!</h3>
            <p className="text-gray-600 dark:text-gray-400 text-sm">
              There was an error preparing your paper. Please try again later.
            </p>
          </div>
        )}
        {!isVectorized && !isPaperError && (
          <div className="flex flex-col items-center gap-2">
            <Icons.Loader className="h-8 w-8 text-green-600 animate-spin" />
            <h3 className="font-semibold text-xl">Preparing your paper...</h3>
            <p className="text-gray-600 dark:text-gray-400 text-sm">
              This shouldn’t take long.
            </p>
          </div>
        )}
      </div>
      {isVectorized && !isPaperError && <ResearchInput />}
    </div>
  )
}
export default ResearchChatbox
