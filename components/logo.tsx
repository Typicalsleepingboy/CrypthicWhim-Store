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
        className={`w-${size === "sm" ? "6" : size === "md" ? "8" : "10"} h-${size === "sm" ? "6" : size === "md" ? "8" : "10"} bg-primary rounded-full flex items-center justify-center overflow-hidden`}
      >
        <Image
          src="https://cdn.discordapp.com/attachments/1311639745738309643/1345986819602386954/Blue_Minimalist_Creative_Name_Logo.png?ex=67e43529&is=67e2e3a9&hm=654882ac641653d9087801ec489c69768928e6748ab1e5be0b3b2bf6144803ce&"
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

