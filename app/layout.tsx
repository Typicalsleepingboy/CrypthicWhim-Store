import type React from "react"
import "@/app/globals.css"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import { ThemeProvider } from "@/components/theme-provider"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "CrypthicWhim Store",
  description: "Third-party platform for digital products including PM JKT48, YouTube Membership, Discord Nitro and more",
  icons: "/cr1.ico",
  openGraph: {
    title: "CrypthicWhim Store",
    description: "Third-party platform for digital products including PM JKT48, YouTube Membership, Discord Nitro and more",
    url: "https://yourwebsite.com", 
    siteName: "CrypthicWhim Store",
    images: [
      {
        url: "/og-image.png", 
        width: 1200,
        height: 630,
        alt: "CrypthicWhim Store",
      },
    ],
    locale: "id_ID",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "CrypthicWhim Store",
    description: "Third-party platform for digital products including PM JKT48, YouTube Membership, Discord Nitro and more",
    images: ["/og-image.png"], 
  },
}


export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}



import './globals.css'