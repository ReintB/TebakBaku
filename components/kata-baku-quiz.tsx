"use client"

import { Card, CardContent, CardFooter, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { useQuiz } from "@/hooks/use-quiz"
import ScoreDisplay from "@/components/score-display"
import AnswerOptions from "@/components/answer-options"
import QuizControls from "@/components/quiz-controls"
import QuizLoading from "@/components/quiz-loading"

export default function KataBakuQuiz() {
  const {
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
  } = useQuiz()

  if (!currentQuizItem) {
    return <QuizLoading />
  }

  return (
    <div className="w-full flex justify-center py-14 px-2 md:px-0 relative">
      <Card className="relative w-full max-w-3xl rounded-sm shadow-sm border-0 bg-white/80 dark:bg-background/80 backdrop-blur-lg ring-1 ring-primary/10">
        <div className="text-center p-2">
          <CardTitle className="text-3xl md:text-4xl font-extrabold tracking-tight">
            TebakBaku
          </CardTitle>
        </div>
        <Separator/>
        <CardContent className="px-16 pb-6 pt-6 flex flex-col gap-10">
          <ScoreDisplay 
            score={score} 
            streak={streak} 
            streakHighlight={streakHighlight} 
          />
          <p className="text-2xl font-semibold">Manakah kata baku yang benar?</p>
          {/* <QuestionDisplay /> */}
          <div className="flex flex-col gap-7">
            <AnswerOptions
              options={options}
              currentQuizItem={currentQuizItem}
              selectedAnswer={selectedAnswer}
              answered={answered}
              onAnswer={handleAnswer}
            />
          </div>
        </CardContent>
        <CardFooter className="px-16 py-2 flex flex-col gap-6">
          <QuizControls
            onReset={resetQuiz}
            soundEnabled={soundEnabled}
            onToggleSound={toggleSound}
            large
          />
        </CardFooter>
      </Card>
    </div>
  )
}