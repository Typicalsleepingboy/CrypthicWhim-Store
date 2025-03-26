"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { Calendar, Clock, Users, Info } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ThemeToggle } from "@/components/theme-toggle"
import Logo from "@/components/logo"
import MobileMenu from "@/components/mobile-menu"
import Footer from "@/components/footer"

interface Theatertheater {
    slug: string
    title: string
    image_url: string
    scheduled_at: number
    idnliveplus: {
        description: string
        liveroom_price: number
        currency_code: string
    }
    status: string
}

export default function SchedulePage() {
    const [theaters, settheaters] = useState<Theatertheater[]>([])
    const [isLoading, setIsLoading] = useState(true)
    const [isLoaded, setIsLoaded] = useState(false)

    const navLinks = [
        { href: "/", label: "Home" },
        { href: "/schedule", label: "Schedule" },
        { href: "/about", label: "About" },
    ]

    useEffect(() => {
        setIsLoaded(true)

        const fetchtheaters = async () => {
            try {
                const response = await fetch("/api/jkt48")
                if (!response.ok) {
                    throw new Error("Failed to fetch theaters")
                }
                const data = await response.json()

                if (data.livestreams && Array.isArray(data.livestreams)) {
                    settheaters(data.livestreams)
                } else if (data.paidRooms && Array.isArray(data.paidRooms)) {
                    settheaters(data.paidRooms)
                } else {
                    console.error("No valid theaters data found in API response")
                    settheaters([])
                }
            } catch (error) {
                console.error("Error fetching theaters:", error)
                settheaters([])
            } finally {
                setIsLoading(false)
            }
        }

        fetchtheaters()
    }, [])

    const formatDate = (timestamp: number) => {
        const date = new Date(timestamp * 1000)
        return date.toLocaleDateString("id-ID", {
            weekday: "short",
            day: "numeric",
            month: "short",
        })
    }

    const formatTime = (timestamp: number) => {
        const date = new Date(timestamp * 1000)
        return date.toLocaleTimeString("id-ID", {
            hour: "2-digit",
            minute: "2-digit",
            hour12: false,
            timeZone: 'Asia/Jakarta'
        })
    }

    const getShowTimeFromDescription = (description: string) => {
        const timeMatch = description.match(/Show start: (\d{1,2}\.\d{2}) WIB/);
        if (timeMatch && timeMatch[1]) {
            return timeMatch[1].replace('.', ':');
        }
        return null;
    };

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
                                    <Link href="/schedule" className="font-medium text-primary">
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

            <section className="text-white py-12 px-4">
                <div className="max-w-6xl mx-auto">
                    <h1 className="text-3xl md:text-4xl font-bold mb-4">Show Streaming JKT48</h1>
                    <p className="text-lg opacity-90 max-w-2xl">
                        Daftar jadwal show yang akan tayang!
                    </p>
                </div>
            </section>

            <section className={`max-w-6xl mx-auto px-4 py-12 ${isLoaded ? "animate-fade-in" : "opacity-0"}`}>
                {isLoading ? (
                    <div className="flex justify-center items-center py-20">
                        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
                    </div>
                ) : theaters.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-20 text-center">
                        <div className="relative w-64 h-64 mb-8">
                            <Image
                                src="/noevent.png"
                                alt="No upcoming theaters"
                                fill
                                className="object-contain"
                            />
                        </div>
                        <h2 className="text-2xl font-bold mb-2">No Upcoming theaters</h2>
                        <p className="text-gray-500 dark:text-gray-400 max-w-md">
                            There are currently no scheduled shows. Please check back later for updates.
                        </p>
                        <Button asChild className="mt-6">
                            <Link href="/">Back to Home</Link>
                        </Button>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {theaters.map((theater, index) => (
                            <div
                                key={theater.slug || index}
                                className={`bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-all h-full flex flex-col ${isLoaded ? `animate-slide-up animate-delay-${index * 100}` : "opacity-0"
                                    }`}
                            >
                                <div className="relative h-48 w-full">
                                    <Image
                                        src={theater.image_url || "/placeholder.svg"}
                                        alt={theater.title}
                                        fill
                                        className="object-cover"
                                    />
                                    <div className="absolute top-3 left-3 bg-primary text-white px-3 py-1 rounded-full text-sm font-medium">
                                        {theater.status === "scheduled" ? "Upcoming" : theater.status}
                                    </div>
                                </div>
                                <div className="p-5 flex-1 flex flex-col">
                                    <h2 className="text-xl font-bold mb-2 line-clamp-2">{theater.title}</h2>
                                    <div className="flex flex-wrap gap-4 text-white/90">
                                        <div className="flex items-center text-sm">
                                            <Calendar className="w-4 h-4 mr-1" />
                                            {formatDate(theater.scheduled_at)}
                                        </div>
                                        <div className="flex items-center text-sm">
                                            <Clock className="w-4 h-4 mr-1" />
                                            {getShowTimeFromDescription(theater.idnliveplus.description) ||
                                                formatTime(theater.scheduled_at)} WIB
                                        </div>
                                    </div>
                                    <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-3 text-sm flex-1">
                                        {theater.idnliveplus.description
                                            .split('\n\n')
                                            .filter(paragraph => !paragraph.startsWith('Show start:'))
                                            .join('\n\n')
                                            .substring(0, 150)} {/* Limit to 150 chars to prevent overflow */}
                                    </p>
                                    <div className="flex space-x-3 mt-auto">
                                        <Button asChild className="bg-primary hover:bg-primary/90 flex-1">
                                            <Link href={`/schedule/${theater.slug}`}>Book Now</Link>
                                        </Button>
                                        <Button asChild variant="outline" size="icon">
                                            <Link href={`/schedule/${theater.slug}`}>
                                                <Info className="w-4 h-4" />
                                            </Link>
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </section>

            {/* Footer */}
            <Footer />
        </main>
    )
}