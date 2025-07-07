"use client"

import { useRef } from "react"
import Navbar from "@/components/navbar"
import KataBakuQuiz from "@/components/kata-baku-quiz"
import KataBakuTable from "@/components/kata-baku-table"
import HeroSection from "@/components/hero-section"
import Footer from "@/components/footer"

export default function Home() {
  const quizRef = useRef<HTMLDivElement>(null)
  const tableRef = useRef<HTMLDivElement>(null)

  const handleStartQuiz = () => {
    if (quizRef.current) {
      const y = quizRef.current.getBoundingClientRect().top + window.scrollY;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  }
  const handleShowTable = () => {
    if (tableRef.current) {
      const y = tableRef.current.getBoundingClientRect().top + window.scrollY;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  }
  const handleHomeClick = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  return (
    <main className="flex flex-col min-h-screen items-center justify-start bg-background">
      <Navbar onQuizClick={handleStartQuiz} onTableClick={handleShowTable} onHomeClick={handleHomeClick} />
      <HeroSection onStartQuiz={handleStartQuiz} onShowTable={handleShowTable} />
      <div ref={tableRef} className="w-full bg-section-2">
        <KataBakuTable />
      </div>
      <div
        ref={quizRef}
        className="w-full min-h-screen flex items-center justify-center bg-section-1"
      >
        <KataBakuQuiz />
      </div>
      <Footer />
    </main>
  )
}