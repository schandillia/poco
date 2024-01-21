// import TitleCaseInput from "@/components/TitleCaseInput"

"use client"

import React, { useState } from "react"
import PaperSection from "@/components/research/PaperSection"
import ResearchSection from "@/components/research/ResearchSection"
import PaperViewer from "@/components/research/PaperViewer"
import ResearchChatbox from "@/components/research/ResearchChatbox"

export default function Page() {
  const [file, setFile] = useState<File | null>(null)

  return (
    <div className="flex-1 justify-between flex flex-col h-[calc(100vh-3.5rem)]">
      <div className="mx-auto w-full max-w-8xl grow lg:flex xl:px-2">
        <div className="flex-1 xl:flex">
          <div className="px-4 sm:px-6 lg:pl-8 xl:flex-1 xl:pl-6">
            {/* Staging area */}
            {!file && <PaperSection onFileDrop={setFile} setFile={setFile} />}
            {file && <PaperViewer file={file} />}
          </div>
        </div>

        <div className="mt-3 ml-4 mb-2.5 md:mt-0 md:ml-0 shrink-0 flex-[0.75] mr-4 lg:mr-8 xl:mr-6 rounded-md border-2 shadow lg:w-96">
          {/* <Research area /> */}
          {!file && <ResearchSection />}
          {file && <ResearchChatbox file={file} />}
        </div>
      </div>
    </div>
  )
}
