/* eslint-disable @typescript-eslint/no-unused-vars */

"use client"

interface ResearchSectionProps {
  fileId: string | null
}
function ResearchSection({ fileId }: ResearchSectionProps) {
  return (
    <div className="relative min-h-full flex flex-coljustify-between gap-2">
      <div className="flex-1 flex justify-center items-center flex-col mb-28">
        <div className="flex flex-col items-center gap-2">
          <h3 className="font-semibold text-xl">Waiting for paper...</h3>
          <p className="text-zinc-500 dark:text-gray-700 text-sm">
            You can begin your research here once your paper is loaded
          </p>
        </div>
      </div>
    </div>
  )
}
export default ResearchSection
