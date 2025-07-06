"use client"

import { useState, useEffect, useCallback } from "react"
import { quizData } from "@/data/kata-baku"
import confetti from "canvas-confetti"
import { toast } from "sonner"

export function useQuiz() {
  const [score, setScore] = useState({ correct: 0, wrong: 0 })
  const [streak, setStreak] = useState(0)
  const [options, setOptions] = useState<string[]>([])
  const [soundEnabled, setSoundEnabled] = useState(true)
  const [answered, setAnswered] = useState(false)
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null)
  const [quizItems, setQuizItems] = useState<Array<{ incorrect: string; correct: string }>>([])
  const [currentQuizItem, setCurrentQuizItem] = useState<{ incorrect: string; correct: string } | null>(null)
  const [usedItems, setUsedItems] = useState<Set<string>>(new Set())
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
        toast.success("Jawaban benar!")

        if (newStreak > 0 && newStreak % 5 === 0) {
          triggerConfetti()
          setStreakHighlight(true)
        }

        if (soundEnabled) {
          const audio = new Audio("/correct.wav")
          audio.play().catch((e) => console.error("Audio play failed:", e))
        }
      } else {
        setScore((prev) => ({ ...prev, wrong: prev.wrong + 1 }))
        setStreak(0)
        toast.error("Jawaban salah!")
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

  const resetQuiz = useCallback(() => {
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
  }, [quizItems])

  const toggleSound = useCallback(() => {
    setSoundEnabled(!soundEnabled)
  }, [soundEnabled])

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
    if (streakHighlight) {
      const timer = setTimeout(() => setStreakHighlight(false), 1500)
      return () => clearTimeout(timer)
    }
  }, [streakHighlight])

  return {
    score,
    streak,
    options,
    soundEnabled,
    answered,
    selectedAnswer,
    currentQuizItem,
    streakHighlight,
    handleAnswer,
    resetQuiz,
    toggleSound
  }
} 