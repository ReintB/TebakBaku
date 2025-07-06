"use client"

import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface AnswerOptionsProps {
  options: string[]
  currentQuizItem: { incorrect: string; correct: string } | null
  selectedAnswer: string | null
  answered: boolean
  onAnswer: (option: string) => void
}

export default function AnswerOptions({ 
  options, 
  currentQuizItem, 
  selectedAnswer, 
  answered, 
  onAnswer 
}: AnswerOptionsProps) {
  return (
    <div className="space-y-3">
      {options.map((option, index) => {
        const isCorrectAnswer = option === currentQuizItem?.correct
        const isSelected = selectedAnswer === option

        return (
          <Button
            key={index}
            variant="outline"
            className={cn(
              "w-full h-12 text-base justify-start px-4 font-normal transition-colors duration-200",
              isCorrectAnswer &&
                answered &&
                "bg-green-500 text-white border-green-500 hover:bg-green-600 dark:bg-green-600 dark:hover:bg-green-700 dark:border-green-600",
              isSelected &&
                !isCorrectAnswer &&
                "bg-red-500 text-white border-red-500 hover:bg-red-600 dark:bg-red-600 dark:hover:bg-red-700 dark:border-red-600",
              !isSelected && !isCorrectAnswer && "hover:bg-muted"
            )}
            onClick={() => onAnswer(option)}
            disabled={answered}
          >
            <span className="flex items-center">
              {option}
            </span>
          </Button>
        )
      })}
    </div>
  )
} 