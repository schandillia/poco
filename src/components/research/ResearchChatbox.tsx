/* eslint-disable @typescript-eslint/no-unused-vars */

"use client"

import { Loader } from "lucide-react"
import { useState, useEffect } from "react"
import ResearchInput from "@/components/research/ResearchInput"

interface ResearchChatboxProps {
  file: File
}
function ResearchChatbox({ file }: ResearchChatboxProps) {
  const [blob, setBlob] = useState<Blob | null>(null)

  useEffect(() => {
    file.arrayBuffer().then((buffer) => {
      setBlob(new Blob([buffer]))
    })
  }, [])

  if (blob) console.log(blob)

  return (
    <div className="relative min-h-full bg-gray-50 dark:bg-zinc-800 flex divide-y divide-gray-300 dark:divide-gray-500 flex-col justify-between gap-2">
      <div className="flex-1 flex justify-center items-center flex-col mb-28">
        <div className="flex flex-col items-center gap-2">
          <Loader className="h-8 w-8 text-green-600 animate-spin" />
          <h3 className="font-semibold text-xl">Start asking your questions</h3>
          <p className="text-gray-600 dark:text-gray-400 text-sm">
            {file?.name}
          </p>
        </div>
      </div>
      <ResearchInput />
    </div>
  )
}
export default ResearchChatbox
