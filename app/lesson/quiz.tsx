"use client"

import {Header} from "./header";
import {Footer} from "./footer";
import {useState, useTransition} from "react";
import {ChallengeStatus} from "./typing";
import {
  ChallengeOption,
  ChallengeProgress,
  Challenge,
} from "@prisma/client";
import {Challenge as ChallengeComp} from "./challenge";
import {QuestionBubble} from "./question-bubble";
import {useAudio} from "react-use";
import {ChallengeResult} from "./challenge-result";
import {upsertChallengeProgress} from "@/actions/challenge-progress";
import {toast} from "sonner";
import {reduceHearts} from "@/actions/user-progress";

type Props = {
  initialPercentage: number;
  initialHearts: number;
  initialChallenges: (Challenge & {
    completed: boolean,
    challengeOptions: ChallengeOption[],
    challengeProgress: ChallengeProgress[]
  })[]
}

export const Quiz = (
  {
    initialPercentage,
    initialHearts,
    initialChallenges,
  }: Props) => {
  const [percent, setPercent] = useState(() => initialPercentage === 100 ? 0 : initialPercentage)
  const [hearts, setHearts] = useState(initialHearts)

  const [status, setStatus] = useState<ChallengeStatus>("none")

  const [activeIndex, setActiveIndex] = useState(() => {
    const uncompletedIndex = initialChallenges.findIndex(challenge => !challenge.completed)
    return uncompletedIndex === -1 ? 0 : uncompletedIndex
  })
  const challenge = initialChallenges[activeIndex]
  const options = challenge?.challengeOptions || []
  const correctOption = options.find(option => option.correct)

  const [selectedOptionId, setSelectedOptionId] = useState<string>()

  const [isPending, startTransition] = useTransition()
  const [correct, _c, correctControls] = useAudio({src: "/correct.wav", autoPlay: false})
  const [incorrect, _ic, incorrectControls] = useAudio({src: "/incorrect.wav", autoPlay: false})

  const onSelect = (id: string) => {
    if (status !== 'none') {
      return
    }
    setSelectedOptionId(id)
  }

  const onContinue = () => {
    if (!selectedOptionId) return

    if (status === "correct") {
      setActiveIndex((current) => current + 1)
      setStatus("none")
      setSelectedOptionId(undefined)
      return
    }

    if (status === "wrong") {
      setStatus("none")
      setSelectedOptionId(undefined)
      return
    }

    const isCorrect = correctOption?.id === selectedOptionId
    if (isCorrect) {
      startTransition(() => {
        setStatus("correct")
        correctControls.play()
        upsertChallengeProgress(challenge.id)
          .then((response) => {
            // TODO update hearts and percentage
            console.log(response)
          })
          .catch(() => toast.error("Something went wrong. Please try again."))
      })

    } else {
      startTransition(() => {

        reduceHearts(challenge.id)
          .then((response) => {
            if (response?.error === "hearts") {
              //TODO open hearts modal
              return
            }
            setStatus("wrong")
            incorrectControls.play()
            setHearts((prev) => Math.max(prev - 1, 0))
          })
          .catch(() => toast.error("Something went wrong. Please try again."))
      })
    }
  }
  if (!challenge) {
    return (
      <ChallengeResult
        status={status}
        onContinue={onContinue}
      />
    )
  }

  return (
    <>
      <Header
        hearts={hearts}
        percentage={percent}
      />
      <div className="flex-1">
        <div className="h-full flex items-center justify-center">
          <div className="w-full lg:w-[600px] min-[350px] flex flex-col gap-y-12">
            <h1 className="text-lg lg:text-3xl text-center lg:text-start font-bold text-neutral-700">
              {
                challenge.type === "ASSIST"
                  ? "Select the correct meaning"
                  : challenge.question
              }
            </h1>
            <div>
              {challenge.type === "ASSIST" && (
                <QuestionBubble question={challenge.question}/>
              )}
              <ChallengeComp
                status={status}
                options={options}
                onSelect={onSelect}
                type={challenge.type}
                selectedOption={selectedOptionId}
              />
            </div>
          </div>
        </div>
      </div>
      <Footer
        status={status}
        onCheck={onContinue}
        disabled={isPending || !selectedOptionId}
      />
      {correct}
      {incorrect}
    </>
  );
}