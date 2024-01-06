"use client"

import { useState, useRef } from "react"
import { Copy } from "lucide-react"
import { Button } from "./ui/button"
import { Textarea } from "./ui/textarea"
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
    navigator.clipboard.writeText(value)
  }

  console.log(selectedStyle)

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
          <h2 className="mb-3 mt-6 font-bold text-2xl">Style Guide</h2>
          <div>
            <TooltipProvider>
              <RadioGroup
                value={selectedStyle}
                onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                  setSelectedStyle(event.target.value)
                }
                className="grid xs:grid-cols-2 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4"
              >
                <div className="col-span-1 space-x-2">
                  <Tooltip>
                    <RadioGroupItem value="ama" id="style1" />
                    <TooltipTrigger asChild>
                      <Label htmlFor="style1">AMA</Label>
                    </TooltipTrigger>
                    <TooltipContent className="bg-gray-600 text-white">
                      <p>American Medical Association Manual of Style</p>
                    </TooltipContent>
                  </Tooltip>
                </div>
                <div className="col-span-1 space-x-2">
                  <Tooltip>
                    <RadioGroupItem value="ap" id="style2" />
                    <TooltipTrigger asChild>
                      <Label htmlFor="style2">AP</Label>
                    </TooltipTrigger>
                    <TooltipContent className="bg-gray-600 text-white">
                      <p>The Associated Press Stylebook</p>
                    </TooltipContent>
                  </Tooltip>
                </div>
                <div className="col-span-1 space-x-2">
                  <Tooltip>
                    <RadioGroupItem value="apa" id="style3" />
                    <TooltipTrigger asChild>
                      <Label htmlFor="style3">APA</Label>
                    </TooltipTrigger>
                    <TooltipContent className="bg-gray-600 text-white">
                      <p>
                        Publication Manual of the American Psychological
                        Association
                      </p>
                    </TooltipContent>
                  </Tooltip>
                </div>
                <div className="col-span-1 space-x-2">
                  <Tooltip>
                    <RadioGroupItem value="bluebook" id="style4" />
                    <TooltipTrigger asChild>
                      <Label htmlFor="style4">Bluebook</Label>
                    </TooltipTrigger>
                    <TooltipContent className="bg-gray-600 text-white">
                      <p>The Bluebook: A Uniform System of Citation</p>
                    </TooltipContent>
                  </Tooltip>
                </div>
                <div className="col-span-1 space-x-2">
                  <Tooltip>
                    <RadioGroupItem value="chicago" id="style5" />
                    <TooltipTrigger asChild>
                      <Label htmlFor="style5">Chicago</Label>
                    </TooltipTrigger>
                    <TooltipContent className="bg-gray-600 text-white">
                      <p>The Chicago Manual of Style</p>
                    </TooltipContent>
                  </Tooltip>
                </div>
                <div className="col-span-1 space-x-2">
                  <Tooltip>
                    <RadioGroupItem value="mla" id="style6" />
                    <TooltipTrigger asChild>
                      <Label htmlFor="style6">MLA</Label>
                    </TooltipTrigger>
                    <TooltipContent className="bg-gray-600 text-white">
                      <p>The Modern Language Association Style Manual</p>
                    </TooltipContent>
                  </Tooltip>
                </div>
                <div className="col-span-1 space-x-2">
                  <Tooltip>
                    <RadioGroupItem value="nyt" id="style7" />
                    <TooltipTrigger asChild>
                      <Label htmlFor="style7">NYT</Label>
                    </TooltipTrigger>
                    <TooltipContent className="bg-gray-600 text-white">
                      <p>The New York Times Manual of Style and Usage</p>
                    </TooltipContent>
                  </Tooltip>
                </div>
                <div className="col-span-1 space-x-2">
                  <Tooltip>
                    <RadioGroupItem value="wikipedia" id="style8" />
                    <TooltipTrigger asChild>
                      <Label htmlFor="style8">Wikipedia</Label>
                    </TooltipTrigger>
                    <TooltipContent className="bg-gray-600 text-white">
                      <p>Wikipedia: Manual of Style</p>
                    </TooltipContent>
                  </Tooltip>
                </div>
              </RadioGroup>
            </TooltipProvider>
          </div>
        </div>
      </div>
    </div>
  )
}

export default TitleCaseInput
