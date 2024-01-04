"use client"

import { useState, useRef } from "react"
import { Copy } from "lucide-react"
import { Button } from "./ui/button"
import { Textarea } from "./ui/textarea"
import toTitleCase from "../lib/toTitleCase"

function TitleCaseInput() {
  const [value, setValue] = useState("")

  const textareaRef = useRef<HTMLTextAreaElement>(null) // Create a ref for the Textarea

  const handleTextareaHover = () => {
    if (textareaRef.current && !textareaRef.current.disabled) {
      textareaRef.current.focus() // Focus the Textarea on hover
    }
  }

  const handleTextareaChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>,
  ) => {
    const input = event.target.value
    const output = toTitleCase(input)
    setValue(output)
  }

  const handleCopyClick = () => {
    navigator.clipboard.writeText(value)
  }

  return (
    <div className="mx-2 flex flex-row gap-3 md:mx-4 md:last:mb-6 lg:mx-auto lg:max-w-full xl:max-w-8xl">
      <div className="relative flex h-full flex-1 items-stretch md:flex-col">
        <div className="relative flex flex-col w-full flex-grow p-4">
          <div className="relative">
            <Textarea
              ref={textareaRef}
              value={value}
              onChange={handleTextareaChange}
              onMouseEnter={handleTextareaHover}
              rows={1}
              maxRows={10}
              autoFocus
              placeholder="Your unformatted title..."
              className="resize-none pr-12 text-base py-3 scrollbar-thumb-blue scrollbar-thumb-rounded scrollbar-track-blue-lighter scrollbar-w-2 scrolling-touch"
            />
            <Button
              className="absolute bottom-1.5 right-[8px]"
              variant="ghost"
              aria-label="convert"
              onClick={handleCopyClick}
            >
              <Copy
                className={`text-green-600 ${value ? "" : "text-gray-400"}`}
              />
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default TitleCaseInput
