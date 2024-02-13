/* eslint-disables @typescript-eslint/no-unused-vars */

import React from "react"
import { Icons } from "@/components/commons/Icons"
import { Button, buttonVariants } from "@/components/ui/button"
import Link from "next/link"

function PaperSection({ error = false }: { error?: boolean }) {
  return (
    <div className="w-full rounded-md shadow flex flex-col items-center">
      <div className="w-full max-h-screen border-2 rounded-md">
        <div className="flex flex-col h-screen max-h-[calc(100vh-4.3rem)] items-center justify-center">
          {error ? (
            <div className="flex flex-col items-center justify-center content-center space-y-4">
              <Icons.Alert className="h-6 w-6 text-red-500" />
              <p className="text-gray-600 dark:text-gray-400">
                There was an unexpected error!
              </p>
              <Link
                href="/research"
                className={buttonVariants({
                  variant: "secondary",
                  size: "lg",
                })}
              >
                BACK
              </Link>
            </div>
          ) : (
            <Icons.Loader className="my-24 h-6 w-6 text-green-600 animate-spin" />
          )}
        </div>
      </div>
    </div>
  )
}

export default PaperSection
