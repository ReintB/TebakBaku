"use client"

import { CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { ThemeToggle } from "@/components/theme-toggle"

export default function QuizHeader() {
  return (
    <CardHeader className="px-6">
      <div className="flex items-center justify-between">
        <CardTitle className="text-xl font-semibold tracking-tight">TebakBaku</CardTitle>
        <ThemeToggle />
      </div>
      <CardDescription className="text-sm text-muted-foreground">
        Seberapa Baku Bahasa Kamu?
      </CardDescription>
    </CardHeader>
  )
} 