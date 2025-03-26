import Link from "next/link"
import Logo from "@/components/logo"
import DiscordBanner from "@/components/discord-banner"

export default function Footer() {
  return (
    <footer className="w-full">
      <DiscordBanner />
      <div className="bg-gray-900 text-gray-300 py-8">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between mb-8">
            <div className="mb-6 md:mb-0">
              <div className="flex items-center mb-4">
                <Logo size="sm" withText={true} className="text-white" />
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
              <div>
                <h3 className="text-white font-medium mb-4">Products</h3>
                <ul className="space-y-2 text-sm">
                  <li>
                    <Link href="/" className="hover:text-white transition-colors">
                      PM JKT48
                    </Link>
                  </li>
                  <li>
                    <Link href="/" className="hover:text-white transition-colors">
                      YouTube Membership
                    </Link>
                  </li>
                  <li>
                    <Link href="/" className="hover:text-white transition-colors">
                      Discord Nitro
                    </Link>
                  </li>
                  <li>
                    <Link href="/schedule" className="hover:text-white transition-colors">
                      JKT48 Show
                    </Link>
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="text-white font-medium mb-4">Support</h3>
                <ul className="space-y-2 text-sm">
                  <li>
                    <Link href="https://discord.gg/Ge6n8KQMVr" className="hover:text-white transition-colors">
                      Help Center
                    </Link>
                  </li>
                  <li>
                    <Link href="https://discord.gg/Ge6n8KQMVr" className="hover:text-white transition-colors">
                      Discord Server
                    </Link>
                  </li>
                  <li>
                    <Link href="https://wa.me/6281216852227" className="hover:text-white transition-colors">
                      Contact Us
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-800 pt-6 flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm mb-4 md:mb-0">© {new Date().getFullYear()} CrypthicWhim Store - All rights reserved.</p>
            <p className="text-sm flex items-center">
              Designed and Developed with
              <span className="text-blue-500 mx-1">❤️</span>
              by{" "}
              <a href="https://discord.gg/eACp5vMzZn" className="ml-1 text-blue-400 hover:underline">
                Sleeping.stu
              </a>
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}

