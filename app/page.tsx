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
import { Clock, Users, ShieldCheck, Award, CrownIcon } from "lucide-react"
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

interface TopIdol {
  user_id: string
  idol_id: string
  nickname: string
  profile_image: string
  subscription_count: number
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
  const [topIdols, setTopIdols] = useState<TopIdol[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    setIsLoaded(true)


    const fetchData = async () => {
      try {
        // Fetch theater events
        const eventsResponse = await fetch("/api/jkt48")
        if (!eventsResponse.ok) throw new Error("Failed to fetch theater events")
        const eventsData = await eventsResponse.json()
        setTheaterEvents(eventsData.livestreams || [])

        // Fetch top idols
        const idolsResponse = await fetch("https://production.jkt48pm.my.id/api/top-idol")
        if (!idolsResponse.ok) throw new Error("Failed to fetch top idols")
        const idolsData = await idolsResponse.json()
        setTopIdols(idolsData.data || [])
      } catch (error) {
        console.error("Error fetching data:", error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchData()
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
      description: "Dapatkan pesan pribadi langsung dari member JKT48 favoritmu!",
    },
    {
      id: 2,
      name: "YouTube Membership JKT48",
      info: "Order Now",
      image: "/jkt48membership.png",
      description: "Akses konten eksklusif dan spesial hanya untuk member channel YouTube JKT48.",
    },
    {
      id: 3,
      name: "Discord Nitro",
      info: "Order Now",
      image: "/crnitro.png",
      description: "Upgrade Tampilan Discord kamu dengan fitur premium dari Nitro.",
    },
    {
      id: 4,
      name: "JKT48 Theater Show",
      info: "Order Now",
      image: "/jkt48theater.png",
      description: "Tiket Show streaming untuk menyaksikan pertunjukan Melalui live streaming",
    },
    {
      id: 5,
      name: "APK Premium",
      info: "Order Now",
      image: "/PREM.png",
      description: "Akses aplikasi premium dengan fitur lengkap tanpa batasan.",
    },
  ];
  

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
        className={`bg-background text-foreground p-8 md:p-12 rounded-xl mx-4 md:mx-auto max-w-6xl my-6 relative overflow-hidden border ${isLoaded ? "animate-fade-in" : "opacity-0"}`}
      >
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div className="space-y-6 z-10">
            <div className="inline-block px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium backdrop-blur-sm">
              Trusted by hundreds of customers
            </div>
            <h1 className={`text-4xl md:text-5xl font-bold ${isLoaded ? "animate-slide-in-left" : "opacity-0"}`}>
              CrypthicWhim Store
            </h1>
            <p
              className={`text-muted-foreground text-lg ${isLoaded ? "animate-slide-in-left animate-delay-100" : "opacity-0"}`}
            >
              Find Private Message JKT48, YouTube memberships, Discord Nitro and other digital products here
            </p>
            <div
              className={`flex space-x-4 pt-4 ${isLoaded ? "animate-slide-in-left animate-delay-200" : "opacity-0"}`}
            >
              <a href="https://discord.gg/Ge6n8KQMVr" target="_blank" rel="noopener noreferrer">
                <Button className="bg-primary text-lg text-primary-foreground hover:bg-primary/90">
                  Shop Now
                </Button>
              </a>
            </div>
          </div>
        </div>

        <div
          className={`grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 mt-10 z-10 relative ${isLoaded ? "animate-slide-up animate-delay-300" : "opacity-0"}`}
        >
          {stats.map((stat, index) => (
            <div
              key={index}
              className="bg-muted/50 backdrop-blur-sm rounded-lg p-4 flex flex-col items-center text-center transform transition-transform hover:scale-105"
            >
              <div className="bg-primary/10 p-2 rounded-full mb-2">{stat.icon}</div>
              <h3 className="text-xl md:text-2xl font-bold">
                {stat.isCounter ? (
                  <Counter target={parseInt(stat.title)} duration={2000} />
                ) : (
                  stat.title + (stat.title === "100" ? "%" : "")
                )}
              </h3>
              <p className="text-sm text-muted-foreground">{stat.description}</p>
            </div>
          ))}
        </div>
      </section>

            <div
        className={`max-w-6xl mx-auto px-4 mb-8 text-center ${
          isLoaded ? "animate-fade-in animate-delay-400" : "opacity-0"
        }`}
      >
        <h2 className="text-2xl md:text-3xl font-bold mb-3">Jadwal Show Theater Terbaru</h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Jadwal show theater terbaru dan terjangkau pesan sekarang di CrypthicWhim Store!
        </p>
      </div>

      {!isLoading && theaterEvents.length > 0 ? (
        <div
          className={`mx-4 md:mx-auto max-w-6xl my-6 ${
            isLoaded ? "animate-fade-in animate-delay-500" : "opacity-0"
          }`}
        >
          <TheaterSlideshow events={theaterEvents} />
        </div>
      ) : (
        !isLoading && (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <div className="relative w-64 h-64 mb-8">
              <Image
                src="/noevent.png"
                alt="No upcoming theaters"
                fill
                className="object-contain"
              />
            </div>
            <h2 className="text-2xl font-bold mb-2">No Upcoming Theaters</h2>
            <p className="text-gray-500 dark:text-gray-400 max-w-md">
              There are currently no scheduled shows. Please check back later for updates.
            </p>
          </div>
        )
      )}


      {topIdols.length > 0 && (
        <section className={`max-w-6xl mx-auto px-4 py-8 ${isLoaded ? "animate-fade-in" : "opacity-0"}`}>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold flex items-center">
              Top Private Messages of the Week
            </h2>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
            {topIdols.map((idol, index) => {
              const imageUrl = idol.profile_image
                ? `https://production.jkt48pm.my.id${idol.profile_image}`
                : '/placeholder-profile.jpg';

              return (
                <div key={idol.idol_id} className="group">
                  <div className="relative aspect-square overflow-hidden rounded-lg mb-2">
                    <Image
                      src={imageUrl}
                      alt={idol.nickname}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform"
                      sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, 20vw"
                    />
                    {index < 3 && (
                      <div className={`absolute top-2 left-2 text-white text-xs font-bold px-2 py-1 rounded-full ${index === 0 ? 'bg-yellow-500' :
                          index === 1 ? 'bg-gray-400' :
                            'bg-amber-700'
                        }`}>
                        #{index + 1}
                      </div>
                    )}
                  </div>
                  <h3 className="w-full mt-2 bg-white dark:bg-gray-800 rounded-lg font-medium text-center">{idol.nickname}</h3>
                </div>
              )
            })}
          </div>
        </section>
      )}

      <section
        className={`px-4 py-8 max-w-6xl mx-auto ${isLoaded ? "animate-fade-in animate-delay-600" : "opacity-0"}`}
      >
        <h2 className="text-2xl font-bold mb-6">
          CrypthicWhim Product</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 sm:gap-6">
          {trendingProducts.map((product, index) => (
            <div
              key={product.id}
              className={isLoaded ? `animate-slide-up animate-delay-${(index + 7) * 100}` : "opacity-0"}
            >
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      </section>

      <div className={isLoaded ? "animate-fade-in animate-delay-800" : "opacity-0"}>
        <Footer />
      </div>
    </main>
  )
}