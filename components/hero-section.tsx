"use client"

import { Button } from "@/components/ui/button"
import { Sparkles, BookOpenCheck, ListOrdered } from "lucide-react"
import { Spotlight } from "@/components/ui/spotlight-new"
import { useTheme } from "next-themes"

interface HeroSectionProps {
  onStartQuiz: () => void
  onShowTable: () => void
}

export default function HeroSection({ onStartQuiz, onShowTable }: HeroSectionProps) {
  const { resolvedTheme } = useTheme()
  // Gradasi abu-abu untuk light mode agar spotlight tetap terlihat dan netral
  const lightGradient = "radial-gradient(68.54% 68.72% at 55.02% 31.46%, rgba(0,0,0,0.10) 0, rgba(0,0,0,0.04) 50%, rgba(0,0,0,0) 80%)";
  const lightGradient2 = "radial-gradient(50% 50% at 50% 50%, rgba(0,0,0,0.06) 0, rgba(0,0,0,0.02) 80%, transparent 100%)";
  const lightGradient3 = "radial-gradient(50% 50% at 50% 50%, rgba(0,0,0,0.03) 0, rgba(0,0,0,0.01) 80%, transparent 100%)";
  // Section background: putih untuk light mode, tetap gradasi untuk dark
  const sectionBg = resolvedTheme === "light"
    ? "bg-white"
    : "bg-gradient-to-br from-primary/5 via-background to-muted/40 dark:from-background dark:to-muted/30";
  return (
    <section className={`relative flex items-center justify-center min-h-screen w-full text-center ${sectionBg} overflow-hidden`}>
      <Spotlight
        gradientFirst={resolvedTheme === "light" ? lightGradient : undefined}
        gradientSecond={resolvedTheme === "light" ? lightGradient2 : undefined}
        gradientThird={resolvedTheme === "light" ? lightGradient3 : undefined}
      />
      <div className="z-10 mx-auto flex flex-col items-center text-center gap-3 sm:gap-4 md:gap-6 lg:gap-8 -translate-y-2 sm:-translate-y-4 md:-translate-y-8 lg:-translate-y-14 pb-6 sm:pb-8 md:pb-12 lg:pb-16 px-3 sm:px-4 md:px-6 lg:px-8 max-w-7xl w-full">
        <span className="inline-flex items-center rounded-full bg-primary/10 px-3 sm:px-4 md:px-5 py-1 sm:py-1.5 text-sm sm:text-base font-semibold text-primary my-2 sm:my-3 md:my-4 shadow-sm">
          <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 mr-2" />
          Edukasi Bahasa Indonesia
        </span>
        <h1 className="text-3xl sm:text-4xl md:text-6xl lg:text-8xl font-extrabold tracking-tight text-foreground leading-tight">
          <span className="md:text-8xl bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent drop-shadow-lg">
            TebakBaku
          </span>
        </h1>
        <p className="text-sm sm:text-base md:text-lg lg:text-2xl text-muted-foreground pb-2 sm:pb-3 md:pb-4 font-medium max-w-xs sm:max-w-sm md:max-w-2xl lg:max-w-3xl xl:max-w-4xl mx-auto px-2 sm:px-3 md:px-4">
          Uji kemampuanmu membedakan kata baku dan tidak baku dalam Bahasa Indonesia. Asah pengetahuanmu, raih skor tertinggi, dan jadilah juara bahasa!
        </p>
        <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 md:gap-4 justify-center w-full max-w-sm sm:max-w-md md:max-w-lg lg:max-w-xl">
          <Button size="lg" className="text-sm sm:text-base md:text-lg px-4 sm:px-6 md:px-8 py-3 sm:py-4 md:py-5 font-semibold shadow-xl group transition-transform duration-200 hover:rotate-1 hover:scale-105" onClick={onStartQuiz}>
            <BookOpenCheck className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 mr-2 group-hover:animate-pulse" />
            Mulai Kuis
          </Button>
          <Button size="lg" variant="outline" className="text-sm sm:text-base md:text-lg px-4 sm:px-6 md:px-8 py-3 sm:py-4 md:py-5 font-semibold shadow group transition-transform duration-200 hover:scale-105" onClick={onShowTable}>
            <ListOrdered className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 mr-2 group-hover:animate-pulse" />
            Lihat Daftar Kata Baku
          </Button>
        </div>
      </div>
    </section>
  )
} 