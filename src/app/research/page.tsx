// import TitleCaseInput from "@/components/TitleCaseInput"

"use client"

import React, { useState } from "react"
import PaperSection from "@/components/research/PaperSection"
import ResearchSection from "@/components/research/ResearchSection"
import PaperViewer from "@/components/research/PaperViewer"

export default function Page() {
  const [file, setFile] = useState<File | null>(null)

  return (
    <div className="flex-1 justify-between flex flex-col h-[calc(100vh-3.5rem)]">
      <div className="mx-auto w-full max-w-8xl grow lg:flex xl:px-2">
        <div className="flex-1 xl:flex">
          <div className="px-4 py-6 sm:px-6 lg:pl-8 xl:flex-1 xl:pl-6">
            {/* Staging area */}
            {!file && <PaperSection onFileDrop={setFile} />}
            {file && <PaperViewer file={file} />}
          </div>
        </div>

        <div className="shrink-0 flex-[0.75] border-t border-gray-200 dark:border-gray-700 lg:w-96 lg:border-l lg:border-t-0">
          {/* <Research area /> */}
          <ResearchSection fileId={null} />
        </div>
      </div>
    </div>
  )
}
