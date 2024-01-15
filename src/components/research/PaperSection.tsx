/* eslint-disable @typescript-eslint/no-unused-vars */

"use client"

import React, { useState } from "react"
import { Upload, BookOpenText } from "lucide-react"
import Dropzone from "react-dropzone"
import { BsFileEarmarkPdfFill } from "react-icons/bs"
import axios from "axios"
import { Separator } from "@/components/ui/separator"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useToast } from "@/components/ui/use-toast"

interface PaperSectionProps {
  onFileDrop: (arg0: any) => void
}

function isPdfUrl(url: string) {
  const regex = /^https?:\/\/.*\.pdf$/i
  return regex.test(url)
}

function PaperSection({
  onFileDrop,
  setFile,
}: {
  onFileDrop: (file: File) => void
  setFile: (file: File | null) => void
}) {
  const { toast } = useToast()

  async function handleSubmit(event: any) {
    event.preventDefault() // Prevent default form submission
    const paperLink = event.target.elements.paperLink.value
    // if isPdfUrl is true, then download the file and assign it to a file object
    if (isPdfUrl(paperLink)) {
      try {
        const response = await axios.get(paperLink, { responseType: "blob" })

        // Handle potential missing content-disposition header
        const filename =
          response.headers["Content-Disposition"]?.split("filename=")[1] ??
          "paper.pdf"

        const downloadedFile = new File([response.data], filename)
        setFile(downloadedFile)

        // Do something with the downloaded file (e.g., display, save, process)
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
          description: "Please try again later..",
          variant: "destructive",
        })
      }
    }
    return undefined
  }

  return (
    <div className="w-full rounded-md shadow flex flex-col items-center">
      <div className="w-full max-h-screen border-2 rounded-md">
        <div className="flex flex-col h-screen max-h-[calc(100vh-6.7rem)] items-center justify-center">
          {/* Load by drag and drop */}
          <Dropzone onDrop={(acceptedFiles) => onFileDrop(acceptedFiles[0])}>
            {({ getRootProps }) => (
              <div
                {...getRootProps()}
                className="cursor-pointer border border-dashed border-gray-300 dark:border-gray-500 bg-gray-50 dark:bg-zinc-800 hover:bg-gray-100 dark:hover:bg-zinc-900 rounded-md p-20"
              >
                <div className="flex items-center justify-center h-full w-full">
                  <label
                    htmlFor="dropzone-file"
                    className="flex flex-col items-center justify-center w-full h-full rounded-lg cursor-pointer"
                  >
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                      <Upload className="h-6 w-6 text-gray-600 dark:text-gray-400 mb-2" />
                      <p className="mb-2 text-md text-gray-600 dark:text-gray-400">
                        Drag a file here or{" "}
                        <span className="font-semibold">click to upload</span>
                      </p>
                      <p className="flex flex-row text-sm text-gray-600 dark:text-gray-400">
                        <BsFileEarmarkPdfFill className="h-4 w-4 mr-2" />
                        Only PDF (up to 4 MB)
                      </p>
                    </div>
                  </label>
                </div>
              </div>
            )}
          </Dropzone>
          {/* Load by URL */}
          <div className="flex flex-row w-1/4 items-center justify-center my-3">
            <Separator className="mb-0.5 mr-2 dark:bg-gray-400" />
            <p className="text-gray-600 dark:text-gray-400 mb-4 mt-4">OR</p>
            <Separator className="mb-0.5 ml-2 dark:bg-gray-400" />
          </div>
          <form
            className="relative w-1/2 flex items-center"
            onSubmit={handleSubmit}
          >
            <Input
              placeholder="Paste link to a paper"
              className="h-15 pr-12 text-base py-3"
              name="paperLink"
            />
            <Button
              size="sm"
              className="absolute right-[5px]"
              aria-label="load paper"
            >
              <BookOpenText className="h-4 w-4" />
            </Button>
          </form>
          <p className="text-gray-600 dark:text-gray-400 text-sm mt-2">
            *Link must end in <span className="font-semibold">.pdf</span>
          </p>
        </div>
      </div>
    </div>
  )
}

export default PaperSection
