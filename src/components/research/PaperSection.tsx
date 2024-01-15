"use client"

import React from "react"
import { Upload, BookOpenText } from "lucide-react"
import Dropzone from "react-dropzone"
import { BsFileEarmarkPdfFill } from "react-icons/bs"
import { Separator } from "@/components/ui/separator"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

interface PaperSectionProps {
  onFileDrop: (arg0: any) => void
}

function PaperSection({ onFileDrop }: PaperSectionProps) {
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
          <div className="relative w-1/2 flex items-center">
            <Input
              placeholder="Paste link to a paper"
              className="h-15 pr-12 text-base py-3"
            />
            <Button
              size="sm"
              className="absolute right-[5px]"
              aria-label="load paper"
            >
              <BookOpenText className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PaperSection
