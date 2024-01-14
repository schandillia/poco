/* eslint-disable @typescript-eslint/no-unused-vars */

"use client"

import { Upload, BookOpenText } from "lucide-react"
import { BsFileEarmarkPdfFill } from "react-icons/bs"
import { Separator } from "@/components/ui/separator"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

interface PaperSectionProps {
  url: string | null
}

function PaperSection({ url }: PaperSectionProps) {
  return (
    <div className="w-full rounded-md shadow flex flex-col items-center">
      <div className="w-full max-h-screen border-2 rounded-md">
        <div className="flex h-screen max-h-[calc(100vh-6.7rem)] items-center justify-center">
          <div className="flex flex-col items-center w-1/2 bg-gray-50 dark:bg-zinc-800  border-2 border-dashed border-gray-300 dark:border-gray-500 rounded-md p-10">
            <Upload className="h-6 w-6 text-gray-600 dark:text-gray-400 mb-2" />
            <p className="mb-2 text-sm text-gray-600 dark:text-gray-400">
              Drag a file here or{" "}
              <span className="font-semibold">Click to upload</span>
            </p>
            <p className="flex flex-row text-xs text-gray-600 dark:text-gray-400">
              <BsFileEarmarkPdfFill className="h-4 w-4 mr-2" />
              Only PDF (up to 4 MB)
            </p>
            <div className="flex flex-row w-1/3 items-center justify-center my-3">
              <Separator className="mb-0.5 mr-2 dark:bg-gray-400" />
              <p className="text-gray-600 dark:text-gray-400 mb-4 mt-4">OR</p>
              <Separator className="mb-0.5 ml-2 dark:bg-gray-400" />
            </div>
            <div className="relative w-full flex items-center">
              <Input
                placeholder="Paste link to a paper"
                className="pr-12 text-base py-3"
              />
              <Button
                size="sm"
                className="absolute right-[3px]"
                aria-label="load paper"
              >
                <BookOpenText className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PaperSection
