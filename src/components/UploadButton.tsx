/* eslint-disable consistent-return, react/jsx-props-no-spreading, no-empty-pattern */

"use client"

import { useState } from "react"
import Dropzone from "react-dropzone"
import { FileUp, File, Loader } from "lucide-react"
import { useRouter } from "next/navigation"
import { Dialog, DialogContent, DialogTrigger } from "./ui/dialog"
import { Button } from "./ui/button"

import { Progress } from "./ui/progress"
import { useUploadThing } from "@/lib/uploadthing"
import { useToast } from "./ui/use-toast"
import { trpc } from "@/app/_trpc/client"

function UploadDropzone() {
  const router = useRouter()

  const [isUploading, setIsUploading] = useState<boolean>(false)
  const [uploadProgress, setUploadProgress] = useState<number>(0)
  const { toast } = useToast()

  const { startUpload } = useUploadThing("pdfUploader")

  const { mutate: startPolling } = trpc.getFile.useMutation({
    onSuccess: (file) => {
      router.push(`/dashboard/${file.id}`)
    },
    retry: true,
    retryDelay: 500,
  })

  const startSimulatedProgress = () => {
    setUploadProgress(0)

    const interval = setInterval(() => {
      setUploadProgress((prevProgress) => {
        if (prevProgress >= 95) {
          clearInterval(interval)
          return prevProgress
        }
        return prevProgress + 5
      })
    }, 500)

    return interval
  }

  return (
    <Dropzone
      multiple={false}
      onDrop={async (acceptedFile) => {
        setIsUploading(true)

        const progressInterval = startSimulatedProgress()

        // handle file upload
        const res = await startUpload(acceptedFile)
        if (!res) {
          return toast({
            title: "Something went wrong.",
            description: "Please try again later.",
            variant: "destructive",
          })
        }

        const [fileResponse] = res

        const key = fileResponse?.key
        if (!key) {
          return toast({
            title: "Something went wrong.",
            description: "Please try again later.",
            variant: "destructive",
          })
        }

        clearInterval(progressInterval)
        setUploadProgress(100)

        startPolling({ key })
      }}
    >
      {({ getRootProps, getInputProps, acceptedFiles }) => (
        <div
          {...getRootProps()}
          className="border h-64 m-4 border-dashed border-gray-300 dark:border-gray-500 rounded-lg"
        >
          <div className="flex items-center justify-center h-full w-full">
            <label
              htmlFor="dropzone-file"
              className="flex flex-col items-center justify-center w-full h-full rounded-lg cursor-pointer bg-gray-50 dark:bg-zinc-800 hover:bg-gray-100 dark:hover:bg-zinc-900"
            >
              <div className="flex flex-col items-center justify-center pt-5 pb-6">
                <FileUp className="h-6 w-6 text-gray-600 dark:text-gray-400 mb-2" />
                <p className="mb-2 text-sm text-gray-600 dark:text-gray-400">
                  <span className="font-semibold">Click to upload</span> or drag
                  and drop
                </p>
                <p className="text-xs text-gray-600 dark:text-gray-400">
                  PDF (up to 4 MB)
                </p>
              </div>
              {acceptedFiles && acceptedFiles[0] ? (
                <div className="max-w-xs bg-white flex items-center rounded-md overflow-hidden outline outline-[1px] outline-zinc-200 divide-x divide-zinc-200">
                  <div className="px-3 py-2 h-full grid place-items-center">
                    <File className="h-4 w-4 text-green-500" />
                  </div>
                  <div className="px-3 py-2 h-full text-sm truncate text-gray-600">
                    {acceptedFiles[0].name}
                  </div>
                </div>
              ) : null}

              {isUploading ? (
                <div className="w-full mt-4 max-w-xs mx-auto">
                  <Progress
                    indicatorColor={
                      uploadProgress === 100 ? "bg-green-500" : ""
                    }
                    value={uploadProgress}
                    className="h-1 w-full bg-zinc-200"
                  />
                  {uploadProgress === 100 ? (
                    <div className="flex gap-1 items-center justify-center text-sm text-gray-600 dark:text-gray-400 text-center pt-2">
                      <Loader className="h-3 w-3 text-green-600 animate-spin" />
                      Redirecting...
                    </div>
                  ) : null}
                </div>
              ) : null}

              <input
                {...getInputProps()}
                type="file"
                id="dropzone-file"
                className="hidden"
              />
            </label>
          </div>
        </div>
      )}
    </Dropzone>
  )
}

function UploadButton(
  {
    // isSubscribed,
  }: {
    // isSubscribed: boolean
  },
) {
  const [isOpen, setIsOpen] = useState<boolean>(false)
  return (
    <Dialog
      open={isOpen}
      onOpenChange={(v) => {
        if (!v) {
          setIsOpen(v)
        }
      }}
    >
      <DialogTrigger onClick={() => setIsOpen(true)} asChild>
        <Button>Upload Paper</Button>
      </DialogTrigger>

      <DialogContent>
        <UploadDropzone />
      </DialogContent>
    </Dialog>
  )
}

export default UploadButton
