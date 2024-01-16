/* eslint-disable @typescript-eslint/no-unused-vars */

"use client"

import { Loader } from "lucide-react"
import ResearchQuery from "@/components/research/ResearchQuery"

interface ResearchSectionProps {
  fileId: string | null
}
function ResearchSection({ fileId }: ResearchSectionProps) {
  return (
    <div className="relative min-h-full bg-gray-50 dark:bg-zinc-800 flex divide-y divide-gray-300 dark:divide-gray-500 flex-col justify-between gap-2">
      <div className="flex-1 flex justify-center items-center flex-col mb-28">
        <div className="flex flex-col items-center gap-2">
          <Loader className="h-8 w-8 text-green-600 animate-spin" />
          <h3 className="font-semibold text-xl">Waiting for paper...</h3>
          <p className="text-gray-600 dark:text-gray-400 text-sm">
            You can begin your research here once your paper is loaded
          </p>
        </div>
      </div>
      <ResearchQuery isDisabled />
    </div>
  )
}
export default ResearchSection
