/* eslint-disable @typescript-eslint/no-shadow, react/jsx-props-no-spreading, @typescript-eslint/no-unused-vars */

import { Document, Page, pdfjs } from "react-pdf"
import "react-pdf/dist/Page/AnnotationLayer.css"
import "react-pdf/dist/Page/TextLayer.css"
import { useResizeDetector } from "react-resize-detector"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import SimpleBar from "simplebar-react"
import { useSession } from "next-auth/react"
import { cn } from "@/lib/utils"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useToast } from "@/components/ui/use-toast"
import PaperFullscreen from "@/components/research/PaperFullscreen"
// import PaperFocus from "@/components/research/PaperFocus"
import { Icons } from "@/components/Icons"

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`

interface PaperViewerProps {
  file: any
}

function PaperViewer({ file }: PaperViewerProps) {
  const session = useSession()

  const { toast } = useToast()

  const [numPages, setNumPages] = useState<number>()
  const [currPage, setCurrPage] = useState<number>(1)
  const [scale, setScale] = useState<number>(1)
  const [rotation, setRotation] = useState<number>(0)
  const [renderedScale, setRenderedScale] = useState<number | null>(null)

  const isLoading = renderedScale !== scale

  const CustomPageValidator = z.object({
    page: z
      .string()
      .refine((num) => Number(num) > 0 && Number(num) <= numPages!),
  })

  type TCustomPageValidator = z.infer<typeof CustomPageValidator>

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<TCustomPageValidator>({
    defaultValues: {
      page: "1",
    },
    resolver: zodResolver(CustomPageValidator),
  })

  const { width, ref } = useResizeDetector()

  const handlePageSubmit = ({ page }: TCustomPageValidator) => {
    setCurrPage(Number(page))
    setValue("page", String(page))
  }

  const normalizeRotation = (rotation: any) => {
    // Use the modulo operator to keep the value within 0-360 degrees
    const normalizedRotation = ((rotation % 360) + 360) % 360

    // Map the normalized value to the expected range (0, 90, 180, 270)
    return Math.round(normalizedRotation / 90) * 90
  }

  return (
    <div className="w-full rounded-md shadow border-2 flex flex-col items-center">
      <div className="h-14 w-full border-b border-gray-300 dark:border-gray-500 flex items-center justify-between px-2">
        <div className="flex items-center gap-1.5">
          <Button
            size="sm"
            disabled={currPage <= 1}
            onClick={() => {
              setCurrPage((prev) => (prev - 1 > 1 ? prev - 1 : 1))
              setValue("page", String(currPage - 1))
            }}
            variant="ghost"
            aria-label="previous page"
          >
            <Icons.Left className="h-4 w-4" />
          </Button>

          <div className="flex items-center gap-1.5">
            <Input
              {...register("page")}
              className={cn(
                "w-12 h-8",
                errors.page && "focus-visible:ring-red-500",
              )}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleSubmit(handlePageSubmit)()
                }
              }}
            />
            <p className="text-gray-600 dark:text-gray-400 text-sm space-x-1">
              <span>/</span>
              <span>{numPages ?? "x"}</span>
            </p>
          </div>

          <Button
            size="sm"
            disabled={numPages === undefined || currPage === numPages}
            onClick={() => {
              setCurrPage((prev) =>
                prev + 1 > numPages! ? numPages! : prev + 1,
              )
              setValue("page", String(currPage + 1))
            }}
            variant="ghost"
            aria-label="next page"
          >
            <Icons.Right className="h-4 w-4" />
          </Button>
        </div>

        <div className="flex items-center gap-2">
          {/* Zoom out */}
          <Button
            size="sm"
            disabled={scale === 1}
            variant="ghost"
            onClick={() => {
              setScale(scale - 0.25)
            }}
          >
            <Icons.ZoomOut className="h-4 w-4" />
          </Button>
          <span className="text-sm text-gray-600 dark:text-gray-400">
            {scale * 100}%
          </span>
          {/* Zoom in */}
          <Button
            size="sm"
            variant="ghost"
            onClick={() => {
              setScale(scale + 0.25)
            }}
          >
            <Icons.ZoomIn className="h-4 w-4" />
          </Button>
          <Button
            size="sm"
            className="uppercase"
            variant="secondary"
            onClick={() => {
              setScale(1)
            }}
          >
            reset
          </Button>
        </div>

        <div className="flex gap-0">
          {/* Upload paper  */}
          {session.data && (
            <Button
              size="sm"
              className="ml-1"
              onClick={() => {}}
              variant="ghost"
              aria-label="Upload paper to cloud"
            >
              <Icons.UploadToCloud className="h-4 w-4" />
            </Button>
          )}

          {/* Rotate paper counterclockwise */}
          <Button
            size="sm"
            onClick={() => setRotation((prev) => normalizeRotation(prev - 90))}
            variant="ghost"
            aria-label="rotate 90 degrees counterclockwise"
          >
            <Icons.RotateLeft className="h-4 w-4" />
          </Button>
          {/* Rotate paper clockwise */}
          <Button
            size="sm"
            onClick={() => setRotation((prev) => normalizeRotation(prev + 90))}
            variant="ghost"
            aria-label="rotate 90 degrees clockwise"
          >
            <Icons.RotateRight className="h-4 w-4" />
          </Button>

          <PaperFullscreen file={file} />
        </div>
      </div>

      <div className="flex-1 w-full max-h-screen">
        <SimpleBar autoHide className="max-h-[calc(100vh-7.5rem)]">
          <div ref={ref}>
            <Document
              loading={
                <div className="flex justify-center">
                  <Icons.Loader className="my-24 h-6 w-6 text-green-600 animate-spin" />
                </div>
              }
              onLoadError={() => {
                toast({
                  title: "Error loading document",
                  description: "Please try again later",
                  variant: "destructive",
                })
              }}
              onLoadSuccess={({ numPages }) => setNumPages(numPages)}
              file={file}
              className="max-h-full"
            >
              {isLoading && renderedScale ? (
                <Page
                  width={width || 1}
                  pageNumber={currPage}
                  scale={scale}
                  rotate={rotation}
                  key={`@${renderedScale}`}
                />
              ) : null}

              <Page
                className={cn(isLoading ? "hidden" : "")}
                width={width || 1}
                pageNumber={currPage}
                scale={scale}
                rotate={rotation}
                key={`@${scale}`}
                loading={
                  <div className="flex justify-center">
                    <Icons.Loader className="my-24 h-6 w-6 text-green-600 animate-spin" />
                  </div>
                }
                onRenderSuccess={() => setRenderedScale(scale)}
              />
            </Document>
          </div>
        </SimpleBar>
      </div>
    </div>
  )
}

export default PaperViewer