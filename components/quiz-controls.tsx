"use client"

import { Button } from "@/components/ui/button"
import { RotateCcw, Volume2, VolumeX } from "lucide-react"
import { toast } from "sonner"

interface QuizControlsProps {
  onReset: () => void
  soundEnabled: boolean
  onToggleSound: () => void
  large?: boolean
}

export default function QuizControls({ onReset, soundEnabled, onToggleSound, large }: QuizControlsProps) {
  return (
    <div className={`flex items-center justify-between w-full ${large ? 'gap-6' : ''}`}>
      <Button
        variant="ghost"
        size="sm"
        onClick={() => { onReset(); toast('Quiz telah direset!') }}
        className={`font-bold ${large ? 'h-10 text-base px-4' : 'h-8 px-3 text-xs'}`}
      >
        <RotateCcw className={`${large ? 'h-4 w-4 mr-2' : 'h-3.5 w-3.5 mr-2'}`} />
        Reset
      </Button>
      <Button
        variant="outline"
        size="icon"
        className={`${large ? 'h-10 w-10 rounded-lg text-base' : 'h-8 w-8 rounded-md'} font-bold`}
        onClick={() => {
          onToggleSound();
          toast(soundEnabled ? 'Suara dimatikan' : 'Suara diaktifkan');
        }}
      >
        {soundEnabled ? <Volume2 className={large ? 'h-4 w-4' : 'h-3.5 w-3.5'} /> : <VolumeX className={large ? 'h-4 w-4' : 'h-3.5 w-3.5'} />}
      </Button>
    </div>
  )
} 