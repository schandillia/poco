"use client"

import { useState, useEffect } from "react"
import axios from "axios"
import useCurentUser from "@/app/hooks/use-current-user"
import PaperViewer from "@/components/research/PaperViewer"

export default function Page({ params }: { params: { paperId: string } }) {
  const [fileData, setFileData] = useState<ArrayBuffer | null>(null)
  const [error, setError] = useState<string | null>(null)

  const user = useCurentUser()

  useEffect(() => {
    const fetchFile = async () => {
      try {
        const response = await axios.post(
          "/api/download",
          {
            key: `${params.paperId}.pdf`, // Assuming the key is the paperId
          },
          {
            // headers: { "Content-Type": "application/json" }, // Set Content-Type
          },
        )
        if (response.data.status === 200) {
          console.log("returned: ", response.data)
          // Optionally handle response processing based on your needs
          // (e.g., convert to string, buffer, or pipe to response stream)
          setFileData(response.data.bodyContents)
        } else {
          throw new Error("Unexpected response from API")
        }
      } catch (error) {
        console.error("Error fetching file:", error)
        setError((error as Error).message || "An error occurred")
      }
    }

    fetchFile()
  }, [params.paperId])

  return (
    <div className="flex-1 justify-between flex flex-col h-[calc(100vh-3.5rem)]">
      <div className="mx-auto w-full max-w-8xl grow lg:flex xl:px-2">
        <div className="flex-1 xl:flex">
          <div className="px-4 flex-1">
            {/* Staging area */}
            {error ? (
              <p>Error: {error}</p>
            ) : fileData ? (
              // Render the fetched file data or component based on its format
              // Replace with your file rendering logic
              <PaperViewer file={fileData} />
            ) : (
              <p>Loading...</p>
            )}
          </div>
        </div>
        <div className="flex-1 xl:flex">
          <div className="px-4 flex-1  mt-8 md:mt-0">{/* Research area */}</div>
        </div>
      </div>
    </div>
  )
}
