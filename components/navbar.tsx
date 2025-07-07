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
    <nav className="w-full sticky top-0 z-30 bg-background/60 backdrop-blur border-b border-border shadow-sm">
      <div className="max-w-5xl mx-auto flex items-center justify-between px-4 py-4">
        <button
          onClick={onHomeClick}
          className="text-2xl font-bold tracking-tight text-primary hover:opacity-80 transition-opacity focus:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-md"
          aria-label="Scroll ke atas"
        >
          TebakBaku
        </button>
        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-2 sm:gap-4">
          <button
            onClick={onTableClick}
            className="px-4 py-2 rounded-md text-sm font-medium text-foreground hover:text-primary hover:bg-primary/10 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
          >
            Tabel Kata Baku
          </button>
          <button
            onClick={onQuizClick}
            className="px-4 py-2 rounded-md text-sm font-medium text-foreground hover:text-primary hover:bg-primary/10 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
          >
            Kuis
          </button>
          <div className="scale-110">
            <ModeToggle />
          </div>
        </div>
        {/* Mobile Hamburger */}
        <div className="md:hidden flex items-center gap-2">
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="p-2 rounded-md text-foreground hover:bg-primary/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
            aria-label={menuOpen ? 'Tutup menu' : 'Buka menu'}
          >
            {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
          <div className="scale-110">
            <ModeToggle />
          </div>
        </div>
      </div>
      {/* Mobile Menu Dropdown */}
      {menuOpen && (
        <div className="md:hidden bg-background/95 backdrop-blur border-b border-border shadow-sm px-4 pb-4 animate-fade-in flex flex-col gap-2">
          <button
            onClick={() => { setMenuOpen(false); onTableClick(); }}
            className="w-full text-left px-4 py-3 rounded-md text-base font-medium text-foreground hover:text-primary hover:bg-primary/10 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
          >
            Tabel Kata Baku
          </button>
          <button
            onClick={() => { setMenuOpen(false); onQuizClick(); }}
            className="w-full text-left px-4 py-3 rounded-md text-base font-medium text-foreground hover:text-primary hover:bg-primary/10 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
          >
            Kuis
          </button>
        </div>
      )}
    </nav>
  )
} 