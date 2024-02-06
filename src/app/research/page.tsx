"use client"

import React, { useRef, useEffect } from "react"
import Dropzone from "react-dropzone"

export default function Page() {
  const bodyRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (bodyRef.current) {
      const bodyRect = bodyRef.current.getBoundingClientRect()
      const top = bodyRect.top
      bodyRef.current.style.maxHeight = `calc(100vh - ${top}px - 4.3rem)`
    }
  }, [])

  return (
    <main className="mx-auto max-w-7xl px-5 md:p-10">
      <div className="mt-8 flex flex-col items-start justify-between gap-4 border-b border-gray-300 dark:border-gray-500 pb-5 sm:flex-row sm:items-center sm:gap-0">
        <h1 className="mb-3 font-bold text-5xl">Research</h1>
      </div>
      <div
        ref={bodyRef}
        className="flex flex-col h-screen items-center justify-center"
      >
        Body
      </div>
    </main>
  )
}
