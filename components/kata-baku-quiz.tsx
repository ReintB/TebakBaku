"use client"

import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { useQuiz } from "@/hooks/use-quiz"
import QuizHeader from "@/components/quiz-header"
import ScoreDisplay from "@/components/score-display"
import QuestionDisplay from "@/components/question-display"
import AnswerOptions from "@/components/answer-options"
import QuizControls from "@/components/quiz-controls"
import QuizFooter from "@/components/quiz-footer"
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
    <div className="w-full">
      <Card className="w-full max-w-md mx-auto">
        <QuizHeader />

        <Separator/>

        <CardContent className="px-6 pb-2 pt-2">
          <ScoreDisplay 
            score={score} 
            streak={streak} 
            streakHighlight={streakHighlight} 
          />
          
          <QuestionDisplay />

          <AnswerOptions
            options={options}
            currentQuizItem={currentQuizItem}
            selectedAnswer={selectedAnswer}
            answered={answered}
            onAnswer={handleAnswer}
          />
        </CardContent>

        <CardFooter className="px-6">
          <QuizControls
            onReset={resetQuiz}
            soundEnabled={soundEnabled}
            onToggleSound={toggleSound}
          />
        </CardFooter>

        <QuizFooter />
      </Card>
    </div>
  )
}