"use client"

import { Icons } from "@/components/commons/Icons"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { useToast } from "@/components/ui/use-toast"
import generateFileId from "@/lib/generate-file-id"
import axios from "axios"
import React, { useRef, useEffect } from "react"
import Dropzone from "react-dropzone"

function isUrlPdf(url: string) {
  const regex = /^https?:\/\/.*\.pdf$/i
  return regex.test(url)
}

export default function Page() {
  const bodyRef = useRef<HTMLDivElement>(null)
  const { toast } = useToast()

  useEffect(() => {
    if (bodyRef.current) {
      const bodyRect = bodyRef.current.getBoundingClientRect()
      const top = bodyRect.top
      bodyRef.current.style.maxHeight = `calc(100vh - ${top}px - 4.3rem)`
    }
  }, [])

  const handleFileDrop = async (file: File) => {
    // Convert file to blob
    const arrayBuffer = await file.arrayBuffer()
    const blob = new Blob([arrayBuffer])
    const paperId = await generateFileId(arrayBuffer)
    const paperTitle = file.name
    console.log({ paperTitle, paperId, blob })

    // Route to research/[fileId]

    // try {
    //   const res = await fetch("/api/vectorize", {
    //     method: "POST",
    //     body: { fileId, blob },
    //   })
    //   if (!res.ok) throw new Error(await res.text())
    //   console.log(await res.json())
    // } catch (error: any) {
    //   // handle error
    // }
  }

  async function handleSubmit(event: any) {
    event.preventDefault() // Prevent default form submission
    const paperLink = event.target.elements.paperLink.value
    // if isPdfUrl is true, then download the file and assign it to a file object
    if (isUrlPdf(paperLink)) {
      try {
        const response = await axios.get(paperLink, { responseType: "blob" })
        // Handle potential missing content-disposition header
        const filename =
          response.headers["Content-Disposition"]?.split("filename=")[1] ??
          paperLink.substring(paperLink.lastIndexOf("/") + 1)

        const downloadedFile = new File([response.data], filename)
        handleFileDrop(downloadedFile)
      } catch (error: any) {
        // Provide informative error messages based on the cause
        if (error.response && error.response.status === 404) {
          return toast({
            title: "File not found",
            description: "The link you entered did not return a document.",
            variant: "destructive",
          })
        }
        if (error.response && error.response.status === 403) {
          return toast({
            title: "Access denied",
            description: "You do not have access to the requested document.",
            variant: "destructive",
          })
        }
        return toast({
          title: "Something went wrong",
          description: "Please try again later.",
          variant: "destructive",
        })
      }
    }
    return undefined
  }

  return (
    <main className="mx-auto max-w-7xl px-5 md:p-10">
      <div className="mt-8 flex flex-col items-start justify-between gap-4 border-b border-gray-300 dark:border-gray-500 pb-5 sm:flex-row sm:items-center sm:gap-0">
        <h1 className="mb-3 font-bold text-5xl">Research</h1>
      </div>
      <div
        ref={bodyRef}
        className="grid grid-cols-1 gap-4 items-center justify-center w-full sm:w-2/3 lg:w-1/2 xl:w-1/3 mx-auto mt-5"
      >
        {/* Upload by drag and drop */}
        <Dropzone onDrop={(acceptedFiles) => handleFileDrop(acceptedFiles[0])}>
          {({ getRootProps }) => (
            <div
              {...getRootProps()}
              className="col-span-1 cursor-pointer border border-dashed border-gray-300 dark:border-gray-500 bg-gray-50 dark:bg-zinc-800 hover:bg-gray-100 dark:hover:bg-zinc-900 rounded-md p-20"
            >
              <div className="flex items-center justify-center h-full w-full">
                <label
                  htmlFor="dropzone-file"
                  className="flex flex-col items-center justify-center w-full h-full rounded-lg cursor-pointer"
                >
                  <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    <Icons.Inbox className="h-6 w-6 text-green-600 mb-6" />
                    <p className="mb-2 text-md text-gray-600 dark:text-gray-400">
                      Drag a file here or{" "}
                      <span className="font-semibold">click to upload</span>
                    </p>
                    <p className="flex flex-row text-sm text-gray-600 dark:text-gray-400">
                      <Icons.Pdf className="h-4 w-4 mr-2 text-red-400" />
                      Only PDF (up to 4 MB)
                    </p>
                  </div>
                </label>
              </div>
            </div>
          )}
        </Dropzone>

        {/* Load by URL */}
        <form
          className="col-span-1 relative flex items-center"
          onSubmit={handleSubmit}
        >
          <Input
            placeholder="Or paste a link here..."
            className="h-15 pr-12 text-base py-3"
            name="paperLink"
          />
          <Button
            size="sm"
            className="absolute right-[5px]"
            aria-label="load paper"
          >
            <Icons.Read className="h-4 w-4" />
          </Button>
        </form>
        <div className="text-left m-0 p-0">
          <p className="text-gray-600 dark:text-gray-400 text-sm ml-1">
            Link must end in <span className="font-semibold">.pdf</span>
          </p>
        </div>
      </div>
    </main>
  )
}
