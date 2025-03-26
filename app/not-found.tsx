"use client"

import Link from "next/link"
import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import Logo from "@/components/logo"
import MobileMenu from "@/components/mobile-menu"
import { ThemeToggle } from "@/components/theme-toggle"
import Image from "next/image"

export default function NotFound() {
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    setIsLoaded(true)
  }, [])

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/about", label: "About" },
  ]

  return (
    <div className="min-h-screen flex flex-col">
      {/* Navigation */}
      <nav className="bg-background/95 backdrop-blur-sm border-b">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <Logo />
            <div className="flex items-center">
              <ThemeToggle />
              <MobileMenu links={navLinks} />
            </div>
          </div>
        </div>
      </nav>

      <div className="flex-1 flex flex-col items-center justify-center px-4 text-center">
        {/* Not Found Illustration */}
        <div className={`relative w-64 h-64 mb-8 ${isLoaded ? "animate-bounce animate-delay-100" : "opacity-0"}`}>
          <Image
            src="/notfound.png" // Replace with your not-found illustration
            alt="Page not found"
            fill
            className="object-contain"
            priority
          />
        </div>

        <div className={`text-9xl font-bold text-primary mb-4 ${isLoaded ? "animate-pulse" : "opacity-0"}`}>
          404
        </div>
        <h1 className={`text-4xl font-bold mb-4 ${isLoaded ? "animate-fade-in animate-delay-200" : "opacity-0"}`}>
          Oops! Page Not Found
        </h1>
        <p
          className={`text-lg text-gray-600 dark:text-gray-400 mb-8 max-w-md ${isLoaded ? "animate-fade-in animate-delay-300" : "opacity-0"}`}
        >
          The page you are looking for doesn't exist or has been moved.
        </p>
        <div
          className={`flex flex-col sm:flex-row gap-4 ${isLoaded ? "animate-fade-in animate-delay-400" : "opacity-0"}`}
        >
          <Button asChild size="lg">
            <Link href="/">Go Home</Link>
          </Button>
          <Button variant="outline" size="lg" asChild>
            <Link href="/about">About Us</Link>
          </Button>
        </div>
      </div>

      <footer className={`py-6 border-t ${isLoaded ? "animate-fade-in animate-delay-500" : "opacity-0"}`}>
        <div className="max-w-6xl mx-auto px-4 text-center">
          <p className="text-sm text-gray-600 dark:text-gray-400">2025 © CrypthicWhim.xyz - All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}