/* eslint-disable @typescript-eslint/no-unused-vars, @typescript-eslint/no-shadow, react/no-array-index-key */

import React, { useState, useCallback } from "react"
import { Expand, Loader } from "lucide-react"
import SimpleBar from "simplebar-react"
import { Document, Page } from "react-pdf"
import { useResizeDetector } from "react-resize-detector"

import { FullScreen, useFullScreenHandle } from "react-full-screen"
import { useToast } from "./ui/use-toast"
import { Button } from "./ui/button"
import { Dialog, DialogContent, DialogTrigger } from "./ui/dialog"

interface PdfFullscreenProps {
  fileUrl: string
}

function PdfFullscreen({ fileUrl }: PdfFullscreenProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [numPages, setNumPages] = useState<number>()

  const { toast } = useToast()

  const { width, ref } = useResizeDetector()

  const handle = useFullScreenHandle()

  return (
    <>
      <Button
        onClick={handle.enter}
        variant="ghost"
        className="gap-1.5"
        aria-label="fullscreen"
      >
        <Expand className="h-4 w-4" />
      </Button>
      <FullScreen handle={handle}>
        {handle.active ? (
          <SimpleBar autoHide={false} className="max-h-full">
            <div ref={ref}>
              <Document
                loading={
                  <div className="flex justify-center">
                    <Loader className="my-24 h-6 w-6 text-green-600 animate-spin" />
                  </div>
                }
                onLoadError={() => {
                  toast({
                    title: "Error loading PDF",
                    description: "Please try again later",
                    variant: "destructive",
                  })
                }}
                onLoadSuccess={({ numPages }) => setNumPages(numPages)}
                file={fileUrl}
                className="max-h-full"
              >
                {new Array(numPages).fill(0).map((_, i) => (
                  <Page key={i} width={width || 1} pageNumber={i + 1} />
                ))}
              </Document>
            </div>
          </SimpleBar>
        ) : null}
      </FullScreen>
    </>
  )
}

export default PdfFullscreen
