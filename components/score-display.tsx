"use client"

import { Flame } from "lucide-react"
import { cn } from "@/lib/utils"

interface ScoreDisplayProps {
  score: {
    correct: number
    wrong: number
  }
  streak: number
  streakHighlight: boolean
}

export default function ScoreDisplay({ score, streak, streakHighlight }: ScoreDisplayProps) {
  return (
    <div className="flex justify-between mb-4 gap-4">
      <div className="flex items-center gap-1.5">
        <div className="text-xl font-medium text-muted-foreground">Benar</div>
        <div className="text-xl font-bold text-green-600 dark:text-green-400">{score.correct}</div>
      </div>
      <div className="flex items-center gap-1.5">
        <div className="text-xl font-medium text-muted-foreground">Salah</div>
        <div className="text-xl font-bold text-red-600 dark:text-red-400">{score.wrong}</div>
      </div>
      <div className="flex items-center gap-1.5">
        <Flame className={cn("h-5 w-5 text-orange-500", streakHighlight && "animate-pulse text-orange-600")} />
        <div className={cn("text-xl font-bold text-orange-500", streakHighlight && "animate-bounce scale-110")}> 
          {streak}
        </div>
      </div>
    </div>
  )
} 