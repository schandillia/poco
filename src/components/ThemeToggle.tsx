/* eslint-disable react/function-component-definition */

"use client"

import { useEffect, useState } from "react"
import { Icons } from "@/components/Icons"
import { Button } from "@/components/ui/button"

const ThemeToggle = () => {
  const [darkMode, setDarkMode] = useState(false)

  useEffect(() => {
    const theme = localStorage.getItem("theme")
    if (theme === "dark") setDarkMode(true)
  }, [])

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark")
      localStorage.setItem("theme", "dark")
    } else {
      document.documentElement.classList.remove("dark")
      localStorage.setItem("theme", "light")
    }
  }, [darkMode])

  return (
    <Button
      variant="ghost"
      onClick={() => {
        setDarkMode(!darkMode)
      }}
    >
      {darkMode ? (
        <Icons.Moon className="h-4 w-4" />
      ) : (
        <Icons.Sun className="h-4 w-4" />
      )}
    </Button>
  )
}
export default ThemeToggle
