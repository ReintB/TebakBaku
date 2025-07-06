"use client"

import Link from "next/link"

export default function Footer() {
  return (
    <footer className="w-full py-6 flex items-center justify-center text-base text-muted-foreground border-t border-border bg-background/80 mt-auto">
      © 2025{' '}
      <Link
        href="https://github.com/ReintB/TebakBaku"
        target="_blank"
        rel="noopener noreferrer"
        className="hover:text-primary font-semibold transition-colors mx-1"
      >
        TebakBaku
      </Link>
      . All rights reserved.
    </footer>
  )
} 