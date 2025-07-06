"use client"

import { ModeToggle } from "@/components/theme-toggle"
import Link from "next/link"

export default function Navbar() {
  return (
    <nav className="w-full sticky top-0 z-30 bg-background/60 backdrop-blur border-b border-border shadow-sm">
      <div className="max-w-5xl mx-auto flex items-center justify-between px-4 py-4">
        <Link href="#" className="text-2xl font-bold tracking-tight text-primary hover:opacity-80 transition-opacity">
          TebakBaku
        </Link>
        <div className="flex items-center gap-2 scale-110">
          <ModeToggle />
        </div>
      </div>
    </nav>
  )
} 