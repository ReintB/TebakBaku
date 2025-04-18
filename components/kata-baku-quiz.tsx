"use client"

import { useState, useEffect, useCallback } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card"
import { ThemeToggle } from "@/components/theme-toggle"
import { Volume2, VolumeX, RotateCcw, Flame } from "lucide-react"
import { Separator } from "@/components/ui/separator"
import { quizData } from "@/data/kata-baku"
import { cn } from "@/lib/utils"
import Link from "next/link"
import confetti from "canvas-confetti"

export default function KataBakuQuiz() {
  const [score, setScore] = useState({ correct: 0, wrong: 0 })
  const [streak, setStreak] = useState(0)
  const [options, setOptions] = useState<string[]>([])
  const [soundEnabled, setSoundEnabled] = useState(true)
  const [answered, setAnswered] = useState(false)
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null)
  const [quizItems, setQuizItems] = useState<Array<{ incorrect: string; correct: string }>>([])
  const [currentQuizItem, setCurrentQuizItem] = useState<{ incorrect: string; correct: string } | null>(null)
  const [usedItems, setUsedItems] = useState<Set<string>>(new Set())
  const [isAnimating, setIsAnimating] = useState(false)
  const [streakHighlight, setStreakHighlight] = useState(false)

  const triggerConfetti = useCallback(() => {
    const duration = 2000
    const animationEnd = Date.now() + duration
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 }

    function randomInRange(min: number, max: number) {
      return Math.random() * (max - min) + min
    }

    const interval: ReturnType<typeof setInterval> = setInterval(() => {
      const timeLeft = animationEnd - Date.now()
      if (timeLeft <= 0) {
        return clearInterval(interval)
      }

      const particleCount = 50 * (timeLeft / duration)
      confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 } })
      confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 } })
    }, 250)
  }, [])

  const getNextQuestion = useCallback((items = quizItems) => {
    if (items.length === 0) return

    setIsAnimating(true)

    setTimeout(() => {
      if (usedItems.size > items.length * 0.7) {
        setUsedItems(new Set())
      }

      let availableItems = items.filter((item) => !usedItems.has(item.incorrect))
      if (availableItems.length === 0) {
        availableItems = items
      }

      const randomIndex = Math.floor(Math.random() * availableItems.length)
      const newItem = availableItems[randomIndex]

      setUsedItems((prev) => new Set(prev).add(newItem.incorrect))
      setCurrentQuizItem(newItem)

      const shuffledOptions = [newItem.correct, newItem.incorrect].sort(() => Math.random() - 0.5)
      setOptions(shuffledOptions)
      setAnswered(false)
      setSelectedAnswer(null)
      setIsAnimating(false)
    }, 300)
  }, [quizItems, usedItems])

  const handleAnswer = useCallback(
    (selectedOption: string) => {
      if (answered || !currentQuizItem) return

      setSelectedAnswer(selectedOption)
      setAnswered(true)

      const isCorrect = selectedOption === currentQuizItem.correct

      if (isCorrect) {
        const newStreak = streak + 1
        setScore((prev) => ({ ...prev, correct: prev.correct + 1 }))
        setStreak(newStreak)

        if (newStreak > 0 && newStreak % 5 === 0) {
          triggerConfetti()
          setStreakHighlight(true)
        }

        if (soundEnabled) {
          const audio = new Audio("/correct.mp3")
          audio.play().catch((e) => console.error("Audio play failed:", e))
        }
      } else {
        setScore((prev) => ({ ...prev, wrong: prev.wrong + 1 }))
        setStreak(0)
        if (soundEnabled) {
          const audio = new Audio("/wrong.mp3")
          audio.play().catch((e) => console.error("Audio play failed:", e))
        }
      }

      setTimeout(() => {
        getNextQuestion()
      }, 1500)
    },
    [answered, currentQuizItem, streak, soundEnabled, triggerConfetti, getNextQuestion]
  )

  useEffect(() => {
    const items = Object.entries(quizData).map(([incorrect, correct]) => ({ incorrect, correct }))
    const shuffledItems = [...items].sort(() => Math.random() - 0.5)
    setQuizItems(shuffledItems)

    const firstItem = shuffledItems[0]
    setCurrentQuizItem(firstItem)
    const shuffledOptions = [firstItem.correct, firstItem.incorrect].sort(() => Math.random() - 0.5)
    setOptions(shuffledOptions)
  }, [])

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (answered || !currentQuizItem) return

      if (e.key === "1" || e.key === "ArrowLeft") {
        handleAnswer(options[0])
      } else if (e.key === "2" || e.key === "ArrowRight") {
        handleAnswer(options[1])
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [options, answered, currentQuizItem, handleAnswer])

  useEffect(() => {
    if (streakHighlight) {
      const timer = setTimeout(() => setStreakHighlight(false), 1500)
      return () => clearTimeout(timer)
    }
  }, [streakHighlight])

  const resetQuiz = () => {
    const shuffledItems = [...quizItems].sort(() => Math.random() - 0.5)
    setQuizItems(shuffledItems)
    setScore({ correct: 0, wrong: 0 })
    setStreak(0)
    setUsedItems(new Set())

    const firstItem = shuffledItems[0]
    setCurrentQuizItem(firstItem)
    const shuffledOptions = [firstItem.correct, firstItem.incorrect].sort(() => Math.random() - 0.5)
    setOptions(shuffledOptions)
    setAnswered(false)
    setSelectedAnswer(null)
  }

  const toggleSound = () => {
    setSoundEnabled(!soundEnabled)
  }

  if (!currentQuizItem) {
    return (
      <Card className="w-full max-w-md mx-auto border border-border bg-card">
        <CardContent className="p-6 flex items-center justify-center h-64">
          <p className="text-muted-foreground">Memuat data kuis...</p>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="flex flex-col items-center">
      <Card className="w-full max-w-md mx-auto border border-border bg-card">
        <CardHeader className="pb-3 pt-6 px-6">
          <div className="flex items-center justify-between">
            <CardTitle className="text-xl font-semibold tracking-tight">TebakBaku</CardTitle>
            <ThemeToggle />
          </div>
          <CardDescription className="text-sm text-muted-foreground pt-1.5">
            Seberapa Baku Bahasa Kamu?
          </CardDescription>
        </CardHeader>

        <CardContent className="px-6 pb-2 pt-0">
          <div className="flex justify-between mb-6">
            <div className="flex items-center gap-1.5">
              <div className="text-sm font-medium text-muted-foreground">Benar</div>
              <div className="text-2xl font-bold">{score.correct}</div>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="text-sm font-medium text-muted-foreground">Salah</div>
              <div className="text-2xl font-bold">{score.wrong}</div>
            </div>
            <div className="flex items-center gap-1.5">
              <Flame className={cn("h-4 w-4 text-orange-500", streakHighlight && "animate-pulse text-orange-600")} />
              <div className={cn("text-2xl font-bold text-orange-500", streakHighlight && "animate-bounce scale-110")}> 
                {streak}
              </div>
            </div>
          </div>

          <div className={`transition-opacity duration-300 ${isAnimating ? "opacity-0" : "opacity-100"}`}>
            <div className="rounded-md border border-border bg-muted/40 p-4 mb-6">
              <p className="text-sm font-medium">Manakah kata baku yang benar?</p>
            </div>

            <div className="space-y-2.5 mb-6">
              {options.map((option, index) => {
                const isCorrectAnswer = option === currentQuizItem.correct
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
                    onClick={() => handleAnswer(option)}
                    disabled={answered}
                  >
                    <span className="flex items-center">
                      <kbd className="px-1.5 py-0.5 text-xs bg-muted dark:bg-muted/50 rounded mr-2 text-muted-foreground">
                        {index + 1}
                      </kbd>
                      {option}
                    </span>
                  </Button>
                )
              })}
            </div>

            <div className="text-xs text-muted-foreground text-center mb-2">
              Tekan <kbd className="px-1 py-0.5 bg-muted rounded">1</kbd> atau {" "}
              <kbd className="px-1 py-0.5 bg-muted rounded">2</kbd> untuk menjawab
            </div>
          </div>
        </CardContent>

        <Separator className="mb-4" />

        <CardFooter className="px-6 pb-6 pt-0 flex items-center justify-between">
          <Button variant="ghost" size="sm" onClick={resetQuiz} className="h-8 px-3 text-xs">
            <RotateCcw className="h-3.5 w-3.5 mr-2" />
            Reset
          </Button>

          <div className="flex items-center gap-2">
            <span className="text-xs text-muted-foreground">Suara</span>
            <Button variant="outline" size="icon" className="h-8 w-8 rounded-md" onClick={toggleSound}>
              {soundEnabled ? <Volume2 className="h-3.5 w-3.5" /> : <VolumeX className="h-3.5 w-3.5" />}
            </Button>
          </div>
        </CardFooter>
      </Card>

      <footer className="w-full max-w-md mx-auto mt-6 flex items-center justify-center text-xs text-muted-foreground px-2">
        <div className="flex items-center">
          <span>© {new Date().getFullYear()} Dibuat dengan ❤️ oleh </span>
          <Link href="https://github.com/ReintB" className="ml-1 hover:text-foreground transition-colors">
            ReintB
          </Link>
        </div>
      </footer>
    </div>
  )
}