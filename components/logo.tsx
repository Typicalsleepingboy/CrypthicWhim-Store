import Image from "next/image"
import Link from "next/link"

interface LogoProps {
  size?: "sm" | "md" | "lg"
  withText?: boolean
  className?: string
}

export default function Logo({ size = "md", withText = true, className = "" }: LogoProps) {
  const sizes = {
    sm: 24,
    md: 32,
    lg: 40,
  }

  const sizeValue = sizes[size]

  return (
    <Link href="/" className={`flex items-center ${className}`}>
      <div
        className={`w-${size === "sm" ? "6" : size === "md" ? "8" : "10"} h-${size === "sm" ? "6" : size === "md" ? "8" : "10"}  rounded-full flex items-center justify-center overflow-hidden`}
      >
        <Image
          src="/cr1.png"
          alt="CrypthicWhim Logo"
          width={sizeValue}
          height={sizeValue}
          className="object-cover"
        />
      </div>
      {withText && <span className="ml-2 font-bold text-lg">CrypthicWhim</span>}
    </Link>
  )
}

