"use client"

import { useState, useRef, useEffect } from "react"
import Link from "next/link"
import { Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { usePathname } from "next/navigation"

interface MobileMenuProps {
  links: {
    href: string
    label: string
  }[]
}

export default function MobileMenu({ links }: MobileMenuProps) {
  const [isOpen, setIsOpen] = useState(false)
  const pathname = usePathname()
  const menuRef = useRef<HTMLDivElement>(null)

  const toggleMenu = () => {
    setIsOpen(!isOpen)
    // Prevent scrolling when menu is open
    if (!isOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "auto"
    }
  }

  const closeMenu = () => {
    setIsOpen(false)
    document.body.style.overflow = "auto"
  }

  // Close menu when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        closeMenu()
      }
    }

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside)
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [isOpen])

  return (
    <div className="md:hidden">
      <Button variant="ghost" size="icon" onClick={toggleMenu} aria-label="Toggle menu">
        <Menu className="h-6 w-6" />
      </Button>

      {/* Mobile menu overlay */}
      {isOpen && (
        <div ref={menuRef} className="fixed top-0 left-0 right-0 z-50 bg-background shadow-md animate-fade-in">
          <div className="flex items-center justify-between p-4">
            <span className="font-medium text-lg">Menu</span>
            <Button variant="ghost" size="icon" onClick={closeMenu} aria-label="Close menu">
              <X className="h-5 w-5" />
            </Button>
          </div>

          <div className="border-t">
            <nav className="p-4">
              <ul className="space-y-4">
                {links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className={`block py-2 text-lg ${
                        pathname === link.href ? "text-primary font-medium" : "text-foreground"
                      }`}
                      onClick={closeMenu}
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </div>
      )}
    </div>
  )
}

