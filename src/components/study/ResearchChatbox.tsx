/* eslint-disable @typescript-eslint/no-unused-vars, no-console */

"use client"

import { useEffect, useState } from "react"
import { Icons } from "@/components/commons/Icons"
import ResearchInput from "@/components/research/ResearchInput"
import ResearchChat from "@/components/research/ResearchChat"

interface ResearchChatboxProps {
  file: File
}
function ResearchChatbox({ file }: ResearchChatboxProps) {
  const [isVectorized, setIsVectorized] = useState(false)
  const [isPaperError, setIsPaperError] = useState(false)
  const [paperTitle, setPaperTitle] = useState("")
  const [userQuery, setUserQuery] = useState("")
  const [chatStream] = useState<string[]>([])

  const handleVectorize = async (givenFile: File) => {
    setPaperTitle(givenFile.name)
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

  const handleEnteredText = (enteredText: string) => {
    if (enteredText) {
      setUserQuery(enteredText)
      // Push the new element to chatStream:
      chatStream.push(enteredText)
      // Do something with the entered text
    }
  }

  return (
    <div className="w-full rounded-md shadow border-2 flex flex-col items-center">
      {/* Chat header */}
      <div className="h-14 w-full border-b flex items-center justify-between px-2">
        {paperTitle && (
          <div className="max-w-sm">
            <p className="font-semibold truncate">{paperTitle}</p>
          </div>
        )}
      </div>

      {/* Chat body */}
      <div className="relative flex-1 w-full max-h-screen bg-gray-50 dark:bg-zinc-800 divide-y divide-gray-300 dark:divide-gray-500 justify-between gap-2">
        <div className="h-[calc(100vh-7.5rem)]">
          {/* Paper could not be processed */}
          {isPaperError && (
            <div className="flex justify-center h-full items-center">
              <div className="flex flex-col items-center gap-2">
                <Icons.Alert className="h-8 w-8 text-destructive" />
                <h3 className="font-semibold text-xl">Something went wrong!</h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  There was an error preparing your paper. Please try again
                  later.
                </p>
              </div>
            </div>
          )}
          {/* Paper being vectorized */}
          {!isVectorized && !isPaperError && (
            <div className="flex justify-center h-full items-center">
              <div className="flex flex-col items-center gap-2">
                <Icons.Loader className="h-8 w-8 text-green-600 animate-spin" />
                <h3 className="font-semibold text-xl">
                  Preparing your paper...
                </h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  This shouldn’t take long.
                </p>
              </div>
            </div>
          )}
          {/* Chat when paper ready for research */}
          {isVectorized && !isPaperError && (
            <ResearchChat messages={chatStream} />
          )}
        </div>

        {/* Paper ready for research */}
        {isVectorized && !isPaperError && (
          <ResearchInput onEnteredText={handleEnteredText} />
        )}
      </div>
    </div>
  )
}
export default ResearchChatbox
