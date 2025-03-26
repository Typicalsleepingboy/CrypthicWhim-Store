import Image from "next/image"
import { Button } from "@/components/ui/button"

export default function DiscordBanner() {
  return (
    <div className="bg-primary rounded-xl mx-4 md:mx-auto max-w-6xl p-6 md:p-8 my-12 relative overflow-hidden">
      <div className="flex flex-col md:flex-row items-center justify-between">
        <div className="z-10 max-w-md">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">Join our Discord server</h2>
          <p className="text-primary-foreground/90 mb-6">
          Join our Discord server to get exciting promotions on our store!
          </p>
          <a href="https://discord.gg/Ge6n8KQMVr" target="_blank" rel="noopener noreferrer">
            <Button className="bg-white text-primary hover:bg-white/90">
              Join our Discord server
            </Button>
          </a>
        </div>
        <div className="mt-6 md:mt-0">
          <Image
            src="/cr1.png?height=150&width=150"
            alt="cr"
            width={150}
            height={150}
            className="relative z-10"
          />
        </div>
      </div>

      <div className="absolute top-8 left-12 w-9 h-9 rounded-full border-2 border-primary-foreground/20 opacity-40"></div>
      <div className="absolute bottom-24 right-16 w-14 h-14 rounded-lg border border-primary-foreground/15 rotate-45 opacity-30"></div>
      <div className="absolute top-1/3 right-1/4 w-20 h-20 rounded-full border border-primary-foreground/10 opacity-25"></div>
      <div className="absolute top-1/4 left-1/6 w-8 h-8 text-primary-foreground/30 text-xl">✧</div>
      <div className="absolute bottom-12 left-20 w-6 h-6 text-primary-foreground/25 text-lg">✶</div>
      <div className="absolute top-3/4 right-32 w-10 h-10 text-primary-foreground/40 text-2xl">✹</div>
      <div className="absolute top-16 right-24 w-12 h-12 text-primary-foreground/35 text-3xl opacity-70">🚀</div>
      <div className="absolute bottom-1/3 left-1/5 w-10 h-10 text-primary-foreground/30 text-2xl">⭐</div>
      <div className="absolute top-2/5 right-1/6 w-8 h-8 text-primary-foreground/40 text-xl">✨</div>
      <div className="absolute bottom-20 left-1/4 w-12 h-12 text-primary-foreground/25 text-3xl">🌙</div>
      <div className="absolute top-28 left-1/3 w-7 h-7 text-primary-foreground/20 text-lg">❄️</div>
      <div className="absolute bottom-32 right-1/5 w-9 h-9 text-primary-foreground/35 text-xl">⚡</div>
      <div className="absolute top-1/2 left-1/2 w-16 h-16 text-primary-foreground/15 text-4xl transform -translate-x-1/2 -translate-y-1/2">☄️</div>
      <div className="absolute top-40 right-40 w-5 h-5 text-primary-foreground/30 text-sm">♫</div>
      <div className="absolute bottom-40 left-40 w-6 h-6 text-primary-foreground/25 text-base">∞</div>
      <div className="absolute top-3/5 right-3/5 w-11 h-11 text-primary-foreground/20 text-2xl">⊛</div>
      <div className="absolute bottom-1/4 right-1/4 w-13 h-13 text-primary-foreground/15 text-3xl">✺</div>
      <div className="absolute top-12 left-3/4 w-3 h-3 rounded-full bg-primary-foreground/10"></div>
      <div className="absolute bottom-28 right-12 w-2 h-2 rounded-full bg-primary-foreground/15"></div>
      <div className="absolute top-3/4 left-1/8 w-4 h-4 rounded-full bg-primary-foreground/20"></div>
    </div>
  )
}

