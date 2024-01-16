"use client"

import { Icons } from "@/components/Icons"
import ResearchInput from "@/components/research/ResearchInput"
import vectorize from "@/app/api/vectorize"

interface ResearchChatboxProps {
  file: File
}
function ResearchChatbox({ file }: ResearchChatboxProps) {
  if (file) vectorize(file)

  return (
    <div className="relative min-h-full bg-gray-50 dark:bg-zinc-800 flex divide-y divide-gray-300 dark:divide-gray-500 flex-col justify-between gap-2">
      <div className="flex-1 flex justify-center items-center flex-col mb-28">
        <div className="flex flex-col items-center gap-2">
          <Icons.Loader className="h-8 w-8 text-green-600 animate-spin" />
          <h3 className="font-semibold text-xl">Preparing your paper</h3>
          <p className="text-gray-600 dark:text-gray-400 text-sm">
            This shouldn’t take long.
          </p>
        </div>
      </div>
      <ResearchInput />
    </div>
  )
}
export default ResearchChatbox
