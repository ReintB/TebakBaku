"use client"

import { Separator } from "@/components/ui/separator"

export default function QuestionDisplay() {
  return (
    <>
      <div className="rounded-md border border-border bg-muted/40 p-4">
        <p className="text-sm font-medium">Manakah kata baku yang benar?</p>
      </div>
      <Separator className="my-4"/>
    </>
  )
} 