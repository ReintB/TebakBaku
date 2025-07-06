"use client"

import { Card, CardContent } from "@/components/ui/card"

export default function QuizLoading() {
  return (
    <Card className="w-full max-w-md mx-auto border border-border bg-card">
      <CardContent className="p-6 flex items-center justify-center h-64">
        <p className="text-muted-foreground">Memuat data kuis...</p>
      </CardContent>
    </Card>
  )
} 