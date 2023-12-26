"use client"

import { useState } from "react"
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "./ui/dialog"
import { Button } from "./ui/button"

// import Dropzone from "react-dropzone"
// import { Cloud, File, Loader2 } from "lucide-react"
// import { Progress } from "./ui/progress"
// import { useUploadThing } from "@/lib/uploadthing"
// import { useToast } from "./ui/use-toast"
import { trpc } from "@/app/_trpc/client"
import { useRouter } from "next/navigation"


const UploadButton = ({
  isSubscribed,
}: {
  isSubscribed: boolean
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false)

  return (
    <Dialog
      open={isOpen}
      onOpenChange={(v) => {
        if (!v) {
          setIsOpen(v)
        }
      }}>
      <DialogTrigger
        onClick={() => setIsOpen(true)}
        asChild>
        <Button>Upload PDF</Button>
      </DialogTrigger>

      <DialogContent>
        <div>Test!!</div>
      </DialogContent>
    </Dialog>
  )
}

export default UploadButton