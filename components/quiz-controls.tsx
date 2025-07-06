"use client"

import { Button } from "@/components/ui/button"
import { RotateCcw, Volume2, VolumeX } from "lucide-react"

interface QuizControlsProps {
  onReset: () => void
  soundEnabled: boolean
  onToggleSound: () => void
}

export default function QuizControls({ onReset, soundEnabled, onToggleSound }: QuizControlsProps) {
  return (
    <div className="flex items-center justify-between w-full">
      <Button variant="ghost" size="sm" onClick={onReset} className="h-8 px-3 text-xs">
        <RotateCcw className="h-3.5 w-3.5 mr-2" />
        Reset
      </Button>
      <Button
        variant="outline"
        size="icon"
        className="h-8 w-8 rounded-md"
        onClick={onToggleSound}
      >
        {soundEnabled ? <Volume2 className="h-3.5 w-3.5" /> : <VolumeX className="h-3.5 w-3.5" />}
      </Button>
    </div>
  )
} 