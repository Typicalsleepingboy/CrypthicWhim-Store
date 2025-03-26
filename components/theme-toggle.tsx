"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Moon, Sun } from "lucide-react"

export function ThemeToggle() {
  const [isDark, setIsDark] = useState(false)

  // Initialize theme based on localStorage or system preference
  useEffect(() => {
    // Check if dark mode is stored in localStorage
    const storedTheme = localStorage.getItem("theme")
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches

    // Set initial state based on stored preference or system preference
    if (storedTheme === "dark" || (!storedTheme && prefersDark)) {
      setIsDark(true)
      document.documentElement.classList.add("dark")
    } else {
      setIsDark(false)
      document.documentElement.classList.remove("dark")
    }
  }, [])

  const toggleTheme = () => {
    if (isDark) {
      document.documentElement.classList.remove("dark")
      localStorage.setItem("theme", "light")
      setIsDark(false)
    } else {
      document.documentElement.classList.add("dark")
      localStorage.setItem("theme", "dark")
      setIsDark(true)
    }
  }

  return (
    <Button variant="ghost" size="icon" onClick={toggleTheme} aria-label="Toggle theme" className="relative w-10 h-10">
      <Sun
        className={`h-5 w-5 absolute transition-all duration-300 ${isDark ? "opacity-0 rotate-90 scale-0" : "opacity-100 rotate-0 scale-100"}`}
      />
      <Moon
        className={`h-5 w-5 absolute transition-all duration-300 ${isDark ? "opacity-100 rotate-0 scale-100" : "opacity-0 -rotate-90 scale-0"}`}
      />
      <span className="sr-only">Toggle theme</span>
    </Button>
  )
}

