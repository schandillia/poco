/* eslint-disable @typescript-eslint/no-unused-vars */

import { Icons } from "@/components/commons/Icons"

function ResearchSection() {
  return (
    <div className="w-full rounded-md shadow flex flex-col items-center bg-gray-50 dark:bg-zinc-800 divide-y divide-gray-300 dark:divide-gray-500 justify-between gap-2">
      <div className="w-full max-h-screen border-2 rounded-md">
        <div className="flex flex-col h-screen max-h-[calc(100vh-4.3rem)] items-center justify-center">
          <div className="flex flex-col items-center gap-2">
            <h3 className="font-semibold text-xl">Waiting for paper...</h3>
            <p className="text-gray-600 dark:text-gray-400">
              You can begin your research here once your paper is loaded
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
export default ResearchSection
