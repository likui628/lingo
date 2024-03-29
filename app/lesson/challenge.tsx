"use client"

import {ChallengeOption} from "@prisma/client";
import {Card} from "@/app/lesson/card";
import {ChallengeStatus} from "@/app/lesson/typing";

type Props = {
  selectedOption?: string
  options: ChallengeOption[]
  status: ChallengeStatus
  onClick: (id: string) => void
}
export const Challenge = (
  {
    selectedOption,
    options,
    status,
    onClick,
  }: Props) => {
  return (
    <div className="px-5 lg:px-0 grid gap-2 grid-cols-2 lg:grid-cols-[repeat(auto-fit,minmax(0,1fr))]">
      {
        options.map((option, index) => (
          <Card
            key={option.id}
            selected={selectedOption === option.id}
            status={status}
            imageSrc={option.imageSrc}
            text={option.text}
            shortcut={index + 1}
            onClick={() => onClick(option.id)}
          />
        ))
      }
    </div>
  )
}