/* eslint-disable @typescript-eslint/no-unused-vars, react/require-default-props */

import React, { useRef } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Icons } from "@/components/commons/Icons"

interface ResearchInputProps {
  onEnteredText: (enteredText: string) => void
}

function ResearchInput({ onEnteredText }: ResearchInputProps) {
  const textAreaRef = useRef<HTMLTextAreaElement>(null)

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault() // Prevent default form submission
    if (textAreaRef.current) {
      // Capture user input
      const enteredText = textAreaRef.current.value
      onEnteredText(enteredText.trim()) // Call the callback function
      textAreaRef.current.value = "" // Clear the input field after submission
    }
  }

  return (
    <div className="absolute bottom-0 left-0 w-full">
      <div className="mx-2 flex flex-row gap-3 md:mx-4 md:last:mb-2 lg:mx-auto lg:max-w-2xl xl:max-w-3xl">
        <div className="relative flex h-full flex-1 items-stretch md:flex-col">
          <div className="relative flex flex-col w-full flex-grow p-4">
            <form className="relative" onSubmit={handleSubmit}>
              <Textarea
                rows={1}
                maxRows={4}
                autoFocus
                ref={textAreaRef}
                placeholder="Enter your question..."
                className="resize-none pr-12 text-base py-3 scrollbar-thumb-blue scrollbar-thumb-rounded scrollbar-track-blue-lighter scrollbar-w-2 scrolling-touch"
              />
              <Button
                className="absolute bottom-[4.5px] right-[4.5px]"
                aria-label="send message"
              >
                <Icons.Send className="h-4 w-4" />
              </Button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
export default ResearchInput
