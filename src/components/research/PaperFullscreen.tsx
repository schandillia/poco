/* eslint-disable @typescript-eslint/no-unused-vars, @typescript-eslint/no-shadow, react/no-array-index-key */

import React, { useEffect, useState } from "react"
import SimpleBar from "simplebar-react"
import { Document, Page } from "react-pdf"
import { useResizeDetector } from "react-resize-detector"

import { FullScreen, useFullScreenHandle } from "react-full-screen"
import { useToast } from "@/components/ui/use-toast"
import { Button } from "@/components/ui/button"
import { Icons } from "@/components/commons/Icons"

interface PaperFullscreenProps {
  file: any
}

function PaperFullscreen({ file }: PaperFullscreenProps) {
  const [numPages, setNumPages] = useState<number>()
  const [blob, setBlob] = useState<Blob | null>(null)

  const { toast } = useToast()

  const { width, ref } = useResizeDetector()

  const handle = useFullScreenHandle()

  useEffect(() => {
    if (!file) return

    const uint8Array = new Uint8Array(file)
    const blob = new Blob([uint8Array], { type: "application/pdf" })
    setBlob(blob)

    setNumPages(1) // Reset numPages before loading new file

    const onLoadError = () => {
      toast({
        title: "Error loading PDF",
        description: "Please try again later",
        variant: "destructive",
      })
    }

    const onLoadSuccess = ({ numPages }: { numPages: number }) => {
      setNumPages(numPages)
    }

    // Remove event listeners when unmounting
    return () => {
      setNumPages(1)
    }
  }, [file, toast])

  return (
    <>
      <Button
        size="sm"
        onClick={handle.enter}
        variant="ghost"
        className="gap-1.5 hidden md:block"
        aria-label="fullscreen"
      >
        <Icons.Fullscreen className="h-4 w-4" />
      </Button>
      <FullScreen handle={handle}>
        {handle.active ? (
          <SimpleBar autoHide className="max-h-full">
            <div ref={ref}>
              <Document
                loading={
                  <div className="flex justify-center">
                    <Icons.Loader className="my-24 h-6 w-6 text-green-600 animate-spin" />
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
                file={blob}
                className="max-h-full"
              >
                {new Array(numPages).fill(0).map((_, i) => (
                  <Page
                    key={i}
                    width={width || 1}
                    pageNumber={i + 1}
                    loading={
                      <div className="flex justify-center">
                        <Icons.Loader className="my-24 h-6 w-6 text-green-600 animate-spin" />
                      </div>
                    }
                  />
                ))}
              </Document>
            </div>
          </SimpleBar>
        ) : null}
      </FullScreen>
    </>
  )
}

export default PaperFullscreen
