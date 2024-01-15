/* eslint-disable @typescript-eslint/no-unused-vars */

import { Document, Page, pdfjs } from "react-pdf"
import { useState, useEffect } from "react"

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`

interface PaperViewerProps {
  file: any
}

function PaperViewer({ file }: PaperViewerProps) {
  const [numPages, setNumPages] = useState(null)
  const [pageNumber, setPageNumber] = useState(1)
  const [arrayBuffer, setArrayBuffer] = useState<ArrayBuffer | null>(null)

  useEffect(() => {
    // Ensure file is a valid PDF
    if (!file || file.type !== "application/pdf") {
      return // Handle invalid file
    }

    const fileReader = new FileReader()
    fileReader.onload = (event) => {
      const receivedArrayBuffer = event.target?.result
      setArrayBuffer(receivedArrayBuffer as ArrayBuffer)
    }
    fileReader.readAsArrayBuffer(file)
  }, [file])

  return (
    <div>
      {arrayBuffer && (
        <div className="w-full rounded-md shadow flex flex-col items-center">
          <div className="flex-1 w-full max-h-screen">
            <Document file={{ data: arrayBuffer }}>
              <Page
                pageNumber={1}
                renderTextLayer={false}
                renderAnnotationLayer={false}
              />
            </Document>
          </div>
        </div>
      )}
    </div>
  )
}

export default PaperViewer
