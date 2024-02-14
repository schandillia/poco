"use client"

import { useState, useEffect } from "react"
import useCurentUser from "@/app/hooks/use-current-user"
import PaperViewer from "@/components/research/PaperViewer"
import PaperSection from "@/components/research/PaperSection"
import ResearchSection from "@/components/research/ResearchSection"
import ResearchChatbox from "@/components/research/ResearchChatbox"

export default function Page({ params }: { params: { paperId: string } }) {
  const [fileData, setFileData] = useState<ArrayBuffer | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [paperTitle, setPaperTitle] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  const user = useCurentUser()

  useEffect(() => {
    const fetchAndDisplayFile = async () => {
      setIsLoading(true)
      setError(null)

      try {
        const response = await fetch(`/api/document/${params.paperId}`)
        if (!response.ok) {
          throw new Error(
            `Error fetching presigned URL: ${response.statusText}`,
          )
        }
        const data = await response.json()
        // Fetch the file using the presigned URL
        const { content, title } = data

        // Retrieve paper title, remove extension
        setPaperTitle(title.substring(0, title.lastIndexOf(".")))
        const bufferResponse = await fetch(content)
        if (!bufferResponse.ok) {
          throw new Error(`Error fetching PDF: ${bufferResponse.statusText}`)
        }
        const arrayBuffer = await bufferResponse.arrayBuffer()
        // Assign the converted ArrayBuffer to fileData
        setFileData(arrayBuffer)
      } catch (error) {
        setError((error as Error).message || "An error occurred")
      } finally {
        setIsLoading(false)
      }
    }
    fetchAndDisplayFile()
  }, [params.paperId])

  return (
    <div className="flex-1 justify-between flex flex-col h-[calc(100vh-3.5rem)]">
      <div className="mx-auto w-full max-w-8xl grow lg:flex xl:px-2">
        <div className="flex-1 xl:flex">
          <div className="px-4 flex-1">
            {/* Staging area */}
            {error ? (
              <PaperSection error={true} />
            ) : fileData ? (
              // Render the fetched file data or component based on its format
              // Replace with your file rendering logic
              <PaperViewer file={fileData} />
            ) : (
              <PaperSection />
            )}
          </div>
        </div>
        <div className="flex-1 xl:flex">
          <div className="px-4 flex-1  mt-8 md:mt-0">
            {/* Research area */}
            {fileData ? (
              <ResearchChatbox
                buffer={fileData}
                paperTitle={paperTitle as string}
              />
            ) : (
              <ResearchSection />
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
