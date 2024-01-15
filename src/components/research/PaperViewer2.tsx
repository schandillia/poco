/* eslint-disable @typescript-eslint/no-unused-vars */

"use client"

import {
  ChevronLeft,
  ChevronRight,
  RotateCw,
  RotateCcw,
  ZoomIn,
  ZoomOut,
} from "lucide-react"
import { Document, Page, pdfjs } from "react-pdf"

import "react-pdf/dist/Page/AnnotationLayer.css"
import "react-pdf/dist/Page/TextLayer.css"

// import { useResizeDetector } from "react-resize-detector"
import { useState, useEffect } from "react"

// import { useForm } from "react-hook-form"
// import { z } from "zod"

// import { zodResolver } from "@hookform/resolvers/zod"
import SimpleBar from "simplebar-react"
import { cn } from "@/lib/utils"

import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
// import { useToast } from "@/components/ui/use-toast"
// import PdfFullscreen from "@/components/PdfFullscreen"
// import PdfFocus from "@/components/PdfFocus"

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`

interface PaperViewerProps {
  file: any
}

function PaperViewer({ file }: PaperViewerProps) {
  const [numPages, setNumPages] = useState(null)
  const [pageNumber, setPageNumber] = useState(1)

  useEffect(() => {
    // Ensure file is a valid PDF
    if (!file || file.type !== "application/pdf") {
      return // Handle invalid file
    }

    // Create a FileReader to access file data
    const fileReader = new FileReader()
    fileReader.onload = (event) => {
      const arrayBuffer = event.target?.result

      // Load the PDF using react-pdf
      pdfjs.getDocument({ data: arrayBuffer }).promise.then((pdf) => {
        setNumPages(pdf.numPages)
      })
    }
    fileReader.readAsArrayBuffer(file)
  }, [file])

  const onDocumentLoadSuccess = ({ numPages }) => {
    setNumPages(numPages)
  }

  return (
    <div className="w-full rounded-md shadow flex flex-col items-center">
      <div className="h-14 w-full border-b border-gray-300 dark:border-gray-500 flex items-center justify-between px-2">
        <div className="flex items-center gap-1.5">
          <Button variant="ghost" aria-label="previous page">
            <ChevronLeft className="h-4 w-4" />
          </Button>

          <div className="flex items-center gap-1.5">
            <Input className={cn("w-12 h-8")} />
            <p className="text-gray-600 dark:text-gray-400 text-sm space-x-1">
              <span>/</span>
              <span>x</span>
            </p>
          </div>

          <Button variant="ghost" aria-label="next page">
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>

        <div className="flex items-center gap-2">
          {/* Zoom out */}
          <Button variant="ghost">
            <ZoomOut className="h-4 w-4" />
          </Button>
          <span className="text-sm text-gray-600 dark:text-gray-400">100%</span>
          {/* Zoom in */}
          <Button variant="ghost">
            <ZoomIn className="h-4 w-4" />
          </Button>
          <Button className="ml-2 uppercase" variant="secondary">
            reset
          </Button>
        </div>

        <div className="flex gap-0">
          <Button variant="ghost" aria-label="rotate 90 degrees">
            <RotateCcw className="h-4 w-4" />
          </Button>
          <Button variant="ghost" aria-label="rotate 90 degrees">
            <RotateCw className="h-4 w-4" />
          </Button>

          {/* <PdfFocus fileUrl={url} />
          <PdfFullscreen fileUrl={url} /> */}
        </div>
      </div>

      <div className="flex-1 w-full max-h-screen">
        <div>
          <Document
            file={file.arrayBuffer}
            onLoadSuccess={onDocumentLoadSuccess}
          >
            <Page pageNumber={pageNumber} />
          </Document>
          {/* Add navigation controls (optional) */}
        </div>
      </div>
    </div>
  )
}

export default PaperViewer
