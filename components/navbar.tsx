"use client"

import { ModeToggle } from "@/components/theme-toggle"
import { useState } from "react"
import { Menu, X } from "lucide-react"

interface NavbarProps {
  onQuizClick: () => void
  onTableClick: () => void
  onHomeClick: () => void
}

export default function Navbar({ onQuizClick, onTableClick, onHomeClick }: NavbarProps) {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <nav className="w-full sticky top-0 z-30 bg-background/30 backdrop-blur border-b border-border shadow-sm">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-3 sm:px-4 md:px-6 lg:px-8 py-2 sm:py-3 md:py-4">
        <button
          onClick={onHomeClick}
          className="text-lg sm:text-xl md:text-2xl font-bold tracking-tight text-primary hover:opacity-80 transition-opacity focus:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-md"
          aria-label="Scroll ke atas"
        >
          TebakBaku
        </button>
        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-1 sm:gap-2 md:gap-3 lg:gap-4">
          <button
            onClick={onTableClick}
            className="px-2 sm:px-3 md:px-4 py-1.5 sm:py-2 rounded-md text-xs sm:text-sm font-medium text-foreground hover:text-primary hover:bg-primary/10 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
          >
            Tabel Kata Baku
          </button>
          <button
            onClick={onQuizClick}
            className="px-2 sm:px-3 md:px-4 py-1.5 sm:py-2 rounded-md text-xs sm:text-sm font-medium text-foreground hover:text-primary hover:bg-primary/10 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
          >
            Kuis
          </button>
          <div className="scale-110">
            <ModeToggle />
          </div>
        </div>
        {/* Mobile Hamburger */}
        <div className="md:hidden flex items-center gap-1 sm:gap-2">
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="p-1.5 sm:p-2 rounded-md text-foreground hover:bg-primary/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
            aria-label={menuOpen ? 'Tutup menu' : 'Buka menu'}
          >
            {menuOpen ? <X className="w-5 h-5 sm:w-6 sm:h-6" /> : <Menu className="w-5 h-5 sm:w-6 sm:h-6" />}
          </button>
          <div className="scale-110">
            <ModeToggle />
          </div>
        </div>
      </div>
      {/* Mobile Menu Dropdown */}
      {menuOpen && (
        <div className="md:hidden bg-background/95 backdrop-blur border-b border-border shadow-sm px-3 sm:px-4 pb-2 sm:pb-3 md:pb-4 animate-fade-in flex flex-col gap-1 sm:gap-2">
          <button
            onClick={() => { setMenuOpen(false); onTableClick(); }}
            className="w-full text-left px-3 sm:px-4 py-2 sm:py-3 rounded-md text-sm sm:text-base font-medium text-foreground hover:text-primary hover:bg-primary/10 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
          >
            Tabel Kata Baku
          </button>
          <button
            onClick={() => { setMenuOpen(false); onQuizClick(); }}
            className="w-full text-left px-3 sm:px-4 py-2 sm:py-3 rounded-md text-sm sm:text-base font-medium text-foreground hover:text-primary hover:bg-primary/10 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
          >
            Kuis
          </button>
        </div>
      )}
    </nav>
  )
} 