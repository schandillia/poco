// import TitleCaseInput from "@/components/title-case/TitleCaseInput"

"use client"

import React, { useState } from "react"
import PaperSection from "@/components/study/PaperSection"
import ResearchSection from "@/components/study/ResearchSection"
import PaperViewer from "@/components/study/PaperViewer"
import ResearchChatbox from "@/components/study/ResearchChatbox"

export default function Page() {
  const [file, setFile] = useState<File | null>(null)

  return (
    <div className="flex-1 justify-between flex flex-col h-[calc(100vh-3.5rem)]">
      <div className="mx-auto w-full max-w-8xl grow lg:flex xl:px-2">
        <div className="flex-1 xl:flex">
          <div className="px-4 flex-1">
            {/* Staging area */}
            {!file && <PaperSection onFileDrop={setFile} setFile={setFile} />}
            {file && <PaperViewer file={file} />}
          </div>
        </div>
        <div className="flex-1 xl:flex">
          <div className="px-4 flex-1  mt-8 md:mt-0">
            {/* Research area */}
            {!file && <ResearchSection />}
            {file && <ResearchChatbox file={file} />}
          </div>
        </div>
      </div>
    </div>
  )
}
