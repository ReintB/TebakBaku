"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { useQuiz } from "@/hooks/use-quiz"
import ScoreDisplay from "@/components/score-display"
import AnswerOptions from "@/components/answer-options"
import QuizControls from "@/components/quiz-controls"
import QuizLoading from "@/components/quiz-loading"

function QuizHeader() {
  return (
    <div className="text-center mb-10">
      <h2 className="text-5xl font-bold text-foreground py-6 tracking-tight">
        Quiz Kata Baku
      </h2>
      <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
        Uji kemampuan Anda dalam membedakan kata baku dan tidak baku. Pilihlah jawaban yang benar untuk setiap soal di bawah ini!
      </p>
    </div>
  );
}

function QuizQuestion({ question }: { question: string }) {
  return (
    <p className="text-2xl font-semibold mb-4">{question}</p>
  );
}

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
    <section className="w-full min-h-screen bg-gradient-to-tl from-primary/5 via-background to-muted/40 dark:from-background dark:to-muted/30 flex items-center justify-center">
      <div className="flex flex-col items-center py-14 px-2 md:px-0 w-full">
        <QuizHeader />
        <Card className="relative w-full max-w-3xl rounded-xl shadow-sm border-0 bg-white/80 dark:bg-background/80 backdrop-blur-lg ring-1 ring-primary/10">
          <Separator />
          <CardContent className="px-4 md:px-12 pb-8 pt-8 flex flex-col gap-8">
            <ScoreDisplay
              score={score}
              streak={streak}
              streakHighlight={streakHighlight}
            />
            <QuizQuestion question="Manakah kata baku yang benar?" />
            <div className="flex flex-col gap-7">
              <AnswerOptions
                options={options}
                currentQuizItem={currentQuizItem}
                selectedAnswer={selectedAnswer}
                answered={answered}
                onAnswer={handleAnswer}
              />
            </div>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mt-6">
              <QuizControls
                onReset={resetQuiz}
                soundEnabled={soundEnabled}
                onToggleSound={toggleSound}
                large
              />
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  )
}