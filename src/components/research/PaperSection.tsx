/* eslint-disables @typescript-eslint/no-unused-vars */

import React from "react"
import { Icons } from "@/components/commons/Icons"

function PaperSection() {
  return (
    <div className="w-full rounded-md shadow flex flex-col items-center">
      <div className="w-full max-h-screen border-2 rounded-md">
        <div className="flex flex-col h-screen max-h-[calc(100vh-4.3rem)] items-center justify-center">
          <Icons.Loader className="my-24 h-6 w-6 text-green-600 animate-spin" />
        </div>
      </div>
    </div>
  )
}

export default PaperSection
