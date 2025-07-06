"use client"

import { useRef } from "react"
import Navbar from "@/components/navbar"
import KataBakuQuiz from "@/components/kata-baku-quiz"
import HeroSection from "@/components/hero-section"
import Footer from "@/components/footer"

export default function Home() {
  const quizRef = useRef<HTMLDivElement>(null)

  const handleStartQuiz = () => {
    quizRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <main className="flex flex-col min-h-screen items-center justify-start bg-background">
      <Navbar />
      <HeroSection onStartQuiz={handleStartQuiz} />
      <div
        ref={quizRef}
        className="w-full min-h-screen flex items-center justify-center"
      >
        <KataBakuQuiz />
      </div>
      <Footer />
    </main>
  )
}