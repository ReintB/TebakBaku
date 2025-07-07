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
      <div className="z-10 mx-auto flex flex-col items-center text-center gap-6 -translate-y-8 md:-translate-y-14 pb-16">
        <span className="inline-flex items-center rounded-full bg-primary/10 px-5 py-1.5 text-base font-semibold text-primary my-4 shadow-sm text-lg">
          <Sparkles className="w-6 h-6 mr-2" />
          Edukasi Bahasa Indonesia
        </span>
        <h1 className="text-6xl md:text-8xl font-extrabold tracking-tight text-foreground leading-tight">
          <span className="md:text-8xl bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent drop-shadow-lg">
            TebakBaku
          </span>
        </h1>
        <p className="text-lg md:text-2xl text-muted-foreground pb-4 font-medium max-w-4xl mx-auto">
          Uji kemampuanmu membedakan kata baku dan tidak baku dalam Bahasa Indonesia. Asah pengetahuanmu, raih skor tertinggi, dan jadilah juara bahasa!
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button size="lg" className="text-lg px-8 py-5 font-semibold shadow-xl group transition-transform duration-200 hover:rotate-1 hover:scale-105" onClick={onStartQuiz}>
            <BookOpenCheck className="w-6 h-6 mr-2 group-hover:animate-pulse" />
            Mulai Kuis
          </Button>
          <Button size="lg" variant="outline" className="text-lg px-8 py-5 font-semibold shadow group transition-transform duration-200 hover:scale-105" onClick={onShowTable}>
            <ListOrdered className="w-6 h-6 mr-2 group-hover:animate-pulse" />
            Lihat Daftar Kata Baku
          </Button>
        </div>
      </div>
    </section>
  )
} 