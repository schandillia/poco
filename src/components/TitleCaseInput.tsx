"use client"

import { useState, useRef } from "react"
import { Copy } from "lucide-react"
import { Button } from "./ui/button"
import { Textarea } from "./ui/textarea"
import { useToast } from "./ui/use-toast"
import toTitleCase from "../lib/toTitleCase"

import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

function TitleCaseInput() {
  const [value, setValue] = useState("")
  const [selectedStyle, setSelectedStyle] = useState("ama")

  const { toast } = useToast()

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
    const output = toTitleCase(input, selectedStyle)
    setValue(output)
  }

  const handleCopyClick = () => {
    const regex = /\s+/g
    navigator.clipboard.writeText(value.replace(regex, " ").trim())
    setValue(value.replace(regex, " ").trim())
    toast({
      description: "Converted text coppied to clipboard.",
      variant: "default",
    })
  }

  const styles = [
    "AMA",
    "AP",
    "APA",
    "Bluebook",
    "Chicago",
    "MLA",
    "NYT",
    "Wikipedia",
  ]
  const styleTips = [
    "American Medical Association Manual of Style",
    "The Associated Press Stylebook",
    "Publication Manual of the American Psychological Association",
    "The Bluebook: A Uniform System of Citation",
    "The Chicago Manual of Style",
    "The Modern Language Association Style Manual",
    "The New York Times Manual of Style and Usage",
    "Wikipedia: Manual of Style",
  ]

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
                className={`${
                  value.trim() === "" ? "text-gray-500" : "text-green-600"
                }`}
              />
            </Button>
          </div>
          <div className="mt-8">
            <TooltipProvider>
              <RadioGroup
                value={selectedStyle}
                className="grid xs:grid-cols-2 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4"
              >
                {styles.map((style, index) => (
                  <div key={style} className="col-span-1 space-x-2">
                    <Tooltip>
                      <RadioGroupItem
                        value={style.toLowerCase()}
                        id={`style${index + 1}`}
                        onClick={() => setSelectedStyle(style.toLowerCase())}
                      />
                      <TooltipTrigger asChild>
                        <Label htmlFor={`style${index + 1}`}>{style}</Label>
                      </TooltipTrigger>
                      <TooltipContent className="bg-gray-600 text-white">
                        <p>{styleTips[index]}</p>
                      </TooltipContent>
                    </Tooltip>
                  </div>
                ))}
              </RadioGroup>
            </TooltipProvider>
          </div>
        </div>
      </div>
    </div>
  )
}

export default TitleCaseInput
