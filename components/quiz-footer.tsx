"use client"

import Link from "next/link"
import { Separator } from "@/components/ui/separator"

export default function QuizFooter() {
  return (
    <>
      <Separator/>
      <footer className="w-full max-w-md mx-auto flex items-center justify-center text-xs text-muted-foreground">
        <div>
          <span>© 2025 Dibuat dengan ❤️ oleh </span>
          <Link href="https://github.com/ReintB" className="hover:text-foreground transition-colors">
            ReintB
          </Link>
        </div>
      </footer>
    </>
  )
} 