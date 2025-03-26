"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { useParams, useRouter } from "next/navigation"
import { Calendar, Clock, ArrowLeft, Share2, Heart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ThemeToggle } from "@/components/theme-toggle"
import Logo from "@/components/logo"
import MobileMenu from "@/components/mobile-menu"
import Footer from "@/components/footer"

interface TheaterEvent {
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
    category: {
        name: string
    }
}

export default function EventDetailPage() {
    const params = useParams()
    const router = useRouter()
    const [event, setEvent] = useState<TheaterEvent | null>(null)
    const [isLoading, setIsLoading] = useState(true)
    const [isLoaded, setIsLoaded] = useState(false)
    const { slug } = params

    const navLinks = [
        { href: "/", label: "Home" },
        { href: "/schedule", label: "Schedule" },
        { href: "/about", label: "About" },
    ]

    useEffect(() => {
        setIsLoaded(true)

        const fetchEventDetails = async () => {
            try {
                const response = await fetch("/api/jkt48")
                if (!response.ok) {
                    throw new Error("Failed to fetch events")
                }
                const data = await response.json()
                let foundEvent = null
                if (data.livestreams && Array.isArray(data.livestreams)) {
                    foundEvent = data.livestreams.find((e: TheaterEvent) => e.slug === slug)
                }
                if (!foundEvent && data.paidRooms && Array.isArray(data.paidRooms)) {
                    foundEvent = data.paidRooms.find((e: TheaterEvent) => e.slug === slug)
                }
                if (foundEvent) {
                    setEvent(foundEvent)
                } else {
                    console.error(`Event with slug "${slug}" not found in API response`)
                    setTimeout(() => router.push("/schedule"), 1000)
                }
            } catch (error) {
                console.error("Error fetching event details:", error)
            } finally {
                setIsLoading(false)
            }
        }

        fetchEventDetails()
    }, [slug, router])

    const formatDate = (timestamp: number) => {
        const date = new Date(timestamp * 1000)
        return date.toLocaleDateString("en-US", {
            weekday: "long",
            day: "numeric",
            month: "long",
            year: "numeric",
        })
    }

    const formatTime = (timestamp: number) => {
        const date = new Date(timestamp * 1000)
        return date.toLocaleTimeString("en-US", {
            hour: "2-digit",
            minute: "2-digit",
            hour12: true,
        })
    }

    const redirectToDiscord = () => {
        window.open("https://discord.com", "_blank")
    }

    const redirectToWhatsApp = () => {
        const message = `Saya ingin beli show: ${event?.title} (${event?.idnliveplus.liveroom_price} ${event?.idnliveplus.currency_code})`
        const encodedMessage = encodeURIComponent(message)
        window.open(`https://wa.me/6281216852227?text=${encodedMessage}`, "_blank")
    }

    if (isLoading) {
        return (
            <main className="min-h-screen">
                <nav className="sticky top-0 z-50 bg-background/95 backdrop-blur-sm border-b">
                    <div className="max-w-6xl mx-auto px-4">
                        <div className="flex items-center justify-between h-16">
                            <div className="flex items-center">
                                <Logo />
                            </div>
                            <div className="flex items-center space-x-2">
                                <ThemeToggle />
                                <MobileMenu links={navLinks} />
                            </div>
                        </div>
                    </div>
                </nav>

                <div className="flex justify-center items-center py-20">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
                </div>
            </main>
        )
    }
    if (!event) {
        return (
            <main className="min-h-screen flex flex-col">
                <nav className="sticky top-0 z-50 bg-background/95 backdrop-blur-sm border-b">
                    <div className="max-w-6xl mx-auto px-4">
                        <div className="flex items-center justify-between h-16">
                            <div className="flex items-center">
                                <Logo />
                            </div>
                            <div className="flex items-center space-x-2">
                                <ThemeToggle />
                                <MobileMenu links={navLinks} />
                            </div>
                        </div>
                    </div>
                </nav>

                <div className="flex-1 flex flex-col items-center justify-center text-center px-4">
                    <div className="relative w-64 h-64 mb-8">
                        <Image
                            src="/notfound.png" 
                            alt="Theater not found"
                            fill
                            className="object-contain"
                            priority
                        />
                    </div>
                    <h1 className="text-2xl font-bold mb-4">Theater not found</h1>
                    <p className="text-gray-600 dark:text-gray-400 mb-6 max-w-md">
                        The theater you're looking for doesn't exist or has been removed.
                    </p>
                    <Button asChild>
                        <Link href="/schedule">Back to Schedule</Link>
                    </Button>
                </div>
            </main>
        )
    }

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

            <div className="max-w-6xl mx-auto px-4 py-4">
                <Button
                    variant="ghost"
                    asChild
                    className="flex items-center group transition-all duration-200 hover:bg-primary/10 hover:shadow-sm"
                >
                    <Link href="/schedule" className="text-primary dark:text-primary-foreground">
                        <ArrowLeft className="w-4 h-4 mr-2 transition-transform group-hover:-translate-x-1" />
                        <span className="font-medium">Back to Schedule</span>
                    </Link>
                </Button>
            </div>

            <div className="max-w-6xl mx-auto px-4">
                <div className="relative w-full h-[200px] md:h-[300px] rounded-xl overflow-hidden">
                    <Image
                        src={event.image_url || "/placeholder.svg"}
                        alt={event.title}
                        fill
                        className="object-cover"
                        priority
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />

                    <div className="absolute bottom-0 left-0 right-0 p-6">
                        <div className="flex items-center space-x-2 mb-3">
                            <span className="bg-primary text-white px-3 py-1 rounded-full text-sm font-medium">
                                {event.category.name}
                            </span>
                            <span className="bg-white/20 backdrop-blur-sm text-white px-3 py-1 rounded-full text-sm">
                                {event.status === "scheduled" ? "Upcoming" : event.status}
                            </span>
                        </div>
                        <h1 className="text-2xl md:text-3xl font-bold text-white mb-2">{event.title}</h1>
                        <div className="flex flex-wrap gap-4 text-white/90">
                            <div className="flex items-center text-sm">
                                <Calendar className="w-4 h-4 mr-1" />
                                {formatDate(event.scheduled_at)}
                            </div>
                            <div className="flex items-center text-sm">
                                <Clock className="w-4 h-4 mr-1" />
                                {formatTime(event.scheduled_at)}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Event Details */}
            <section className={`max-w-6xl mx-auto px-4 py-8 ${isLoaded ? "animate-fade-in" : "opacity-0"}`}>
                <div className="grid md:grid-cols-3 gap-8">
                    <div className="md:col-span-2">
                        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md">
                            <h2 className="text-2xl font-bold mb-4">About This Event</h2>
                            <div className="prose dark:prose-invert max-w-none">
                                {event.idnliveplus.description.split("\n\n").map((paragraph, index) => (
                                    <p key={index} className="mb-4">
                                        {paragraph}
                                    </p>
                                ))}
                            </div>

                            <div className="flex items-center space-x-4 mt-8">
                                <Button
                                    variant="outline"
                                    className="flex items-center"
                                    onClick={() => {
                                        navigator.clipboard.writeText(window.location.href)
                                            .then(() => {
                                                const button = document.getElementById('share-button');
                                                if (button) {
                                                    button.innerHTML = '<Check className="w-4 h-4 mr-2" /> Copied!';
                                                    setTimeout(() => {
                                                        button.innerHTML = '<Share2 className="w-4 h-4 mr-2" /> Share';
                                                    }, 2000);
                                                }
                                            })
                                            .catch(err => {
                                                console.error('Failed to copy link: ', err);
                                                prompt('Copy this link:', window.location.href);
                                            });
                                    }}
                                    id="share-button"
                                >
                                    <Share2 className="w-4 h-4 mr-2" />
                                    Share
                                </Button>
                            </div>
                        </div>
                    </div>

                    <div>
                        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md sticky top-24">
                            <h3 className="text-xl font-bold mb-4">Ticket Information</h3>
                            <div className="flex justify-between items-center mb-4">
                                <span className="text-gray-600 dark:text-gray-300">Date</span>
                                <span>{formatDate(event.scheduled_at)}</span>
                            </div>
                            <div className="flex justify-between items-center mb-4">
                                <span className="text-gray-600 dark:text-gray-300">Time</span>
                                <span>{formatTime(event.scheduled_at)}</span>
                            </div>
                            <div className="flex justify-between items-center mb-6">
                                <span className="text-gray-600 dark:text-gray-300">Status</span>
                                <span className="px-2 py-1 bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-100 rounded-full text-sm">
                                    Available
                                </span>
                            </div>

                            <div className="space-y-3">
                                <Button
                                    onClick={redirectToDiscord}
                                    className="w-full bg-primary hover:bg-primary/90"
                                >
                                    Purchase on Discord
                                </Button>
                                <Button
                                    onClick={redirectToWhatsApp}
                                    className="w-full bg-green-600 hover:bg-green-700 text-white"
                                >
                                    Purchase via WhatsApp
                                </Button>
                            </div>
                            <p className="text-xs text-center text-gray-500 dark:text-gray-400 mt-4">
                                By purchasing, you agree to our Terms of Service and Privacy Policy
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <Footer />
        </main>
    )
}
