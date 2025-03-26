"use client"

import Link from "next/link"
import { useEffect, useState } from "react"
import Footer from "@/components/footer"
import { ThemeToggle } from "@/components/theme-toggle"
import Logo from "@/components/logo"
import MobileMenu from "@/components/mobile-menu"

export default function About() {
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    setIsLoaded(true)
  }, [])

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/schedule", label: "Schedule" },
    { href: "/about", label: "About" },
  ]

  return (
    <main className="min-h-screen">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-background/95 backdrop-blur-sm border-b">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <Logo />
              <div className="hidden md:block ml-10">
                <div className="flex items-center space-x-8">
                  <Link
                    href="/"
                    className="font-medium text-gray-600 hover:text-primary dark:text-gray-300 dark:hover:text-primary transition-colors"
                  >
                    Home
                  </Link>
                  <Link href="/about" className="font-medium text-primary">
                    About
                  </Link>
                </div>
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <ThemeToggle />
              <MobileMenu links={navLinks} />
            </div>
          </div>
        </div>
      </nav>

      {/* About Content */}
      <section className={`max-w-4xl mx-auto px-4 py-12 ${isLoaded ? "animate-fade-in" : "opacity-0"}`}>
        <div
          className={`bg-white dark:bg-gray-800 rounded-xl shadow-md p-8 ${isLoaded ? "animate-slide-up" : "opacity-0"}`}
        >
          <h1 className={`text-4xl font-bold mb-6 text-primary ${isLoaded ? "animate-slide-in-left" : "opacity-0"}`}>
            About CrypthicWhim Store
          </h1>
          <div className="prose dark:prose-invert max-w-none">
            <p className={`text-lg mb-4 ${isLoaded ? "animate-slide-in-left animate-delay-100" : "opacity-0"}`}>
              Welcome to CrypthicWhim Store, your trusted third-party platform for premium digital products.
            </p>
            <p className={`mb-4 ${isLoaded ? "animate-slide-in-left animate-delay-200" : "opacity-0"}`}>
              We specialize in providing access to exclusive digital content including Private Messages from JKT48
              members, YouTube Channel Memberships, Discord Nitro subscriptions, and tickets to JKT48 Theater Shows.
            </p>
            <p className={`mb-4 ${isLoaded ? "animate-slide-in-left animate-delay-300" : "opacity-0"}`}>
              Our mission is to connect fans with their favorite content creators and idols through convenient digital
              services, all in one place.
            </p>
            <p className={`mb-8 ${isLoaded ? "animate-slide-in-left animate-delay-400" : "opacity-0"}`}>
              As a third-party platform, we strive to offer competitive prices and seamless transactions for all your
              digital content needs.
            </p>
            <h2
              className={`text-2xl font-bold mb-4 text-primary ${isLoaded ? "animate-slide-in-left animate-delay-400" : "opacity-0"}`}
            >
              Contact Us
            </h2>
            <p className={isLoaded ? "animate-slide-in-left animate-delay-500" : "opacity-0"}>
              Have questions or need assistance? Join our Discord community where our team is ready to help you with
              product information or any other inquiries.
            </p>
          </div>
        </div>
      </section>

      {/* Footer with Discord Banner */}
      <div className={isLoaded ? "animate-fade-in animate-delay-500" : "opacity-0"}>
        <Footer />
      </div>
    </main>
  )
}

