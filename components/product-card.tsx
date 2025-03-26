"use client"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

interface Product {
  id: number
  name: string
  info: string
  image: string
  description?: string
  whatsappLink?: string
}

export default function ProductCard({ product }: { product: Product }) {
  const redirectToDiscord = () => {
    window.open("https://discord.gg/Ge6n8KQMVr", "_blank")
  }

  const redirectToWhatsApp = () => {
    window.open(product.whatsappLink || "https://wa.me/6281216852227", "_blank")
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <div className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden cursor-pointer group shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 mx-4 md:mx-auto max-w-6xl">
          <div className="relative">
            <Image
              src={product.image || "/placeholder.svg"}
              alt={product.name}
              width={320}
              height={320}
              className="w-full h-52 object-cover"
              priority
            />
            <div className="absolute top-3 right-3 bg-primary text-white text-sm font-medium px-3 py-1 rounded-full">
              {typeof product.info === "number" ? `$${product.info}` : product.info}
            </div>
          </div>
          <div className="p-4">
            <h3 className="font-medium text-lg mb-2 line-clamp-1">{product.name}</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-3 line-clamp-2">
              {product.description || "Digital product for your entertainment"}
            </p>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-500 dark:text-gray-400">Click to view</span>
              <div className="bg-primary text-white rounded-full p-2 opacity-90 group-hover:opacity-100 transition-opacity">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M5 12h14" />
                  <path d="m12 5 7 7-7 7" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </DialogTrigger>
      <DialogContent className="max-w-md sm:max-w-xl rounded-xl">
        <DialogHeader>
          <DialogTitle className="text-xl text-primary">{product.name}</DialogTitle>
          <DialogDescription>
            {product.description || "Digital product for your entertainment"}
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4">
          <div className="relative w-full h-64 rounded-md overflow-hidden">
            <Image
              src={product.image || "/placeholder.svg"}
              alt={product.name}
              fill
              className="object-cover"
              priority
            />
          </div>
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <span className="text-2xl font-bold">
              {typeof product.info === "number" ? `$${product.info}` : product.info}
            </span>
            <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
              <Button 
                onClick={redirectToDiscord} 
                className="bg-primary hover:bg-primary/90 w-full sm:w-auto"
              >
                Purchase on Discord
              </Button>
              <Button 
                onClick={redirectToWhatsApp} 
                className="bg-green-600 hover:bg-green-700 w-full sm:w-auto"
              >
                Purchase via WhatsApp
              </Button>
            </div>
          </div>
          <p className="text-sm text-muted-foreground">
            This is a digital product sold by CrypthicWhim Store. Choose your preferred platform to complete your purchase.
          </p>
        </div>
      </DialogContent>
    </Dialog>
  )
}