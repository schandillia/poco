"use client"
import {
    Dialog,
    DialogContent,
    DialogTrigger
} from "@radix-ui/react-dialog"
import { Button } from "./ui/button"
import { useState } from "react"

const UploadButton = () => {
    const [isOpen, setIsOpen] = useState<boolean>(false)
    return (
        <Dialog
            open={isOpen}
            onOpenChange={(v) => {
                if (!v) {
                    setIsOpen(v)
                }
            }}>
            <DialogTrigger onClick={() => setIsOpen(true)} asChild>
                <Button>Upload PDF</Button>
            </DialogTrigger>
            <DialogContent>example</DialogContent>
        </Dialog>
    )
}
export default UploadButton