"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight, Calendar } from "lucide-react"

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

export default function TheaterSlideshow({ events }: { events: TheaterEvent[] }) {
    const [currentIndex, setCurrentIndex] = useState(0)

    // Auto-advance slides every 5 seconds
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex((prevIndex) => (prevIndex + 1) % events.length)
        }, 5000)
        return () => clearInterval(interval)
    }, [events.length])

    const goToSlide = (index: number) => {
        setCurrentIndex(index)
    }

    const goToPrevSlide = () => {
        setCurrentIndex((prevIndex) => (prevIndex === 0 ? events.length - 1 : prevIndex - 1))
    }

    const goToNextSlide = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % events.length)
    }

    const formatDate = (timestamp: number) => {
        const date = new Date(timestamp * 1000)
        return date.toLocaleDateString("en-US", {
            day: "numeric",
            month: "short",
            year: "numeric",
        })
    }

    if (!events || events.length === 0) {
        return null
    }

    const currentEvent = events[currentIndex]

    return (
        <div className="relative w-full h-[400px] md:h-[500px] overflow-hidden rounded-xl">
            {/* Background image */}
            <div className="absolute inset-0 bg-black">
                <Image
                    src={currentEvent.image_url || "/placeholder.svg"}
                    alt={currentEvent.title}
                    fill
                    className="object-cover opacity-70"
                    priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
            </div>

            {/* Content */}
            <div className="absolute inset-0 flex flex-col justify-end p-6 md:p-10 z-10">
                <div className="flex items-center space-x-2 mb-3">
                    <span className="bg-primary text-white px-3 py-1 rounded-full text-sm font-medium animate-pulse">
                        Theater Available Now
                    </span>
                    <span className="bg-white/20 backdrop-blur-sm text-white px-3 py-1 rounded-full text-sm flex items-center">
                        <Calendar className="w-4 h-4 mr-1" />
                        {formatDate(currentEvent.scheduled_at)}
                    </span>
                </div>
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-2">{currentEvent.title}</h2>
                <p className="text-white/80 mb-4 line-clamp-2 md:line-clamp-3">
                    {currentEvent.idnliveplus.description.split("\n\n")[0]}
                </p>
                <div className="flex space-x-3">
                    <Button asChild className="bg-primary hover:bg-primary/90">
                        <Link href={`/schedule/${currentEvent.slug}`}>Book Now</Link>
                    </Button>
                    <Button asChild variant="outline" className="border-white text-white hover:bg-white/10">
                        <Link href="/schedule">View Schedule</Link>
                    </Button>
                </div>
            </div>

            {/* Navigation arrows */}
            <button
                onClick={goToPrevSlide}
                className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white p-2 rounded-full z-20"
                aria-label="Previous slide"
            >
                <ChevronLeft className="h-6 w-6" />
            </button>
            <button
                onClick={goToNextSlide}
                className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white p-2 rounded-full z-20"
                aria-label="Next slide"
            >
                <ChevronRight className="h-6 w-6" />
            </button>

            {/* Dots indicator */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2 z-20">
                {events.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => goToSlide(index)}
                        className={`w-2 h-2 rounded-full ${index === currentIndex ? "bg-white" : "bg-white/50"}`}
                        aria-label={`Go to slide ${index + 1}`}
                    />
                ))}
            </div>
        </div>
    )
}

