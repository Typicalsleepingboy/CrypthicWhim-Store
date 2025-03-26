"use client"

import Image from "next/image"
import Link from "next/link"
import { useEffect, useState } from "react"
import ProductCard from "@/components/product-card"
import { Button } from "@/components/ui/button"
import Footer from "@/components/footer"
import { ThemeToggle } from "@/components/theme-toggle"
import Logo from "@/components/logo"
import MobileMenu from "@/components/mobile-menu"
import { Clock, Users, ShieldCheck, Award } from "lucide-react"
import TheaterSlideshow from "@/components/theater-slideshow"

interface TheaterEvent {
  slug: string
  title: string
  image_url: string
  scheduled_at: number
  idnliveplus: {
    description: string
    liveroom_price: number
  }
}

const Counter = ({ target, duration = 2000 }: { target: number; duration?: number }) => {
  const [count, setCount] = useState(0)

  useEffect(() => {
    let start = 0
    const end = target
    const incrementTime = duration / end

    const timer = setInterval(() => {
      start += 1
      setCount(start)
      if (start >= end) clearInterval(timer)
    }, incrementTime)

    return () => clearInterval(timer)
  }, [target, duration])

  return <span>{count}+</span>
}



export default function Home() {
  const [isLoaded, setIsLoaded] = useState(false)
  const [theaterEvents, setTheaterEvents] = useState<TheaterEvent[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    setIsLoaded(true)

    const fetchTheaterEvents = async () => {
      try {
        const response = await fetch("/api/jkt48")
        if (!response.ok) {
          throw new Error("Failed to fetch theater events")
        }
        const data = await response.json()
        setTheaterEvents(data.livestreams || [])
      } catch (error) {
        console.error("Error fetching theater events:", error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchTheaterEvents()
  }, [])

const navLinks = [
    { href: "/", label: "Home" },
    { href: "/schedule", label: "Schedule" },
    { href: "/about", label: "About" },
  ]

  const trendingProducts = [
    {
      id: 1,
      name: "Private Message JKT48",
      info: "Order Now",
      image: "/jkt48pm.png",
      description: "Get a personal message from your favorite JKT48 member",
    },
    {
      id: 2,
      name: "YouTube Membership",
      info: "Order Now",
      image: "/placeholder.svg?height=200&width=200",
      description: "Access exclusive content with YouTube channel membership",
    },
    {
      id: 3,
      name: "Discord Nitro",
      info: "Order Now",
      image: "/placeholder.svg?height=200&width=200",
      description: "Enhance your Discord experience with Nitro subscription",
    },
    {
      id: 4,
      name: "JKT48 Theater Show Ticket",
      info: "Order Now",
      image: "/placeholder.svg?height=200&width=200",
      description: "Ticket for upcoming JKT48 theater performance",
    },
  ]

  const stats = [
    {
      icon: <Clock className="h-6 w-6" />,
      title: "24/7",
      description: "Customer Service",
      isCounter: false,
    },
    {
      icon: <Users className="h-6 w-6" />,
      title: "600",
      description: "Happy Buyers",
      isCounter: true,
    },
    {
      icon: <ShieldCheck className="h-6 w-6" />,
      title: "100",
      description: "Secure Transactions",
      isCounter: false,
    },
    {
      icon: <Award className="h-6 w-6" />,
      title: "Premium",
      description: "Quality Products",
      isCounter: false,
    },
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
                  <Link href="/" className="font-medium text-primary">
                    Home
                  </Link>
                  <Link
                    href="/schedule"
                    className="font-medium text-gray-600 hover:text-primary dark:text-gray-300 dark:hover:text-primary transition-colors"
                  >
                    Schedule
                  </Link>
                  <Link
                    href="/about"
                    className="font-medium text-gray-600 hover:text-primary dark:text-gray-300 dark:hover:text-primary transition-colors"
                  >
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

      <section
        className={`bg-primary text-white p-8 md:p-12 rounded-xl mx-4 md:mx-auto max-w-6xl my-6 relative overflow-hidden ${isLoaded ? "animate-fade-in" : "opacity-0"}`}
      >
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.2)_0%,transparent_40%)]"></div>
          <div className="absolute bottom-0 right-0 w-full h-full bg-[radial-gradient(circle_at_70%_80%,rgba(255,255,255,0.2)_0%,transparent_40%)]"></div>
        </div>

        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div className="space-y-6 z-10">
            <div className="inline-block px-3 py-1 bg-white/20 rounded-full text-sm font-medium backdrop-blur-sm">
              Trusted by hundreds of customers
            </div>
            <h1 className={`text-4xl md:text-5xl font-bold ${isLoaded ? "animate-slide-in-left" : "opacity-0"}`}>
              CrypthicWhim Store
            </h1>
            <p
              className={`text-primary-foreground/90 text-lg ${isLoaded ? "animate-slide-in-left animate-delay-100" : "opacity-0"}`}
            >
              Third-party platform for digital products including PM JKT48, YouTube Membership, Discord Nitro and more
            </p>
            <div
              className={`flex space-x-4 pt-4 ${isLoaded ? "animate-slide-in-left animate-delay-200" : "opacity-0"}`}
            >
              <a href="https://discord.gg/Ge6n8KQMVr" target="_blank" rel="noopener noreferrer">
                <Button className="bg-white text-lg text-primary hover:bg-white/90">
                  Shop Now
                </Button>
              </a>
            </div>
          </div>
          <div
            className={`flex justify-center z-10 ${isLoaded ? "animate-slide-in-right animate-delay-200" : "opacity-0"}`}
          >
            <div className="relative">
              <Image
                src="/cr1.png"
                alt="Digital products showcase"
                width={400}
                height={300}
                className="rounded-lg"
              />
            </div>
          </div>
        </div>

        <div
          className={`grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 mt-10 z-10 relative ${isLoaded ? "animate-slide-up animate-delay-300" : "opacity-0"}`}
        >
          {stats.map((stat, index) => (
            <div
              key={index}
              className="bg-white/10 backdrop-blur-sm rounded-lg p-4 flex flex-col items-center text-center transform transition-transform hover:scale-105"
            >
              <div className="bg-white/20 p-2 rounded-full mb-2">{stat.icon}</div>
              <h3 className="text-xl md:text-2xl font-bold">
                {stat.isCounter ? (
                  <Counter target={parseInt(stat.title)} duration={2000} />
                ) : (
                  stat.title + (stat.title === "100" ? "%" : "")
                )}
              </h3>
              <p className="text-sm text-white/80">{stat.description}</p>
            </div>
          ))}
        </div>

        <div className="absolute top-4 right-1/4 w-12 h-12 rounded-full border-2 border-white/20 opacity-50"></div>
        <div className="absolute bottom-8 left-1/3 w-8 h-8 text-white/30">+</div>
        <div className="absolute top-1/2 left-1/4 w-16 h-16 rounded-full border border-white/10 opacity-30"></div>
        <div className="absolute bottom-12 right-1/3 w-4 h-4 text-white/40">*</div>
      </section>

      {!isLoading && theaterEvents.length > 0 && (
        <div className="mx-4 md:mx-auto max-w-6xl my-6">
          <TheaterSlideshow events={theaterEvents} />
        </div>
      )}

      
      <section
        className={`px-4 py-8 max-w-6xl mx-auto ${isLoaded ? "animate-slide-up animate-delay-300" : "opacity-0"}`}
      >
        <h2 className="text-2xl font-bold mb-6">CrypthicWhim Product</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {trendingProducts.map((product, index) => (
            <div
              key={product.id}
              className={isLoaded ? `animate-slide-up animate-delay-${(index + 3) * 100}` : "opacity-0"}
            >
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      </section>

      <div className={isLoaded ? "animate-fade-in animate-delay-500" : "opacity-0"}>
        <Footer />
      </div>
    </main>
  )
}

