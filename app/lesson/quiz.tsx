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
import {useAudio, useWindowSize} from "react-use";
import Image from "next/image";
import {ResultCard} from "./result-card";

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
  const [status, setStatus] = useState<ChallengeStatus>("completed")

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

    // TODO
    if (correctOption?.id === selectedOptionId) {
      setStatus("correct")
      correctControls.play()
    } else {
      setStatus("wrong")
      incorrectControls.play()
      // TODO: update hearts
    }

    //todo update UserProgress

    //todo update ChallengeProgress

  }
  if (!challenge) {
    return <>
      <div
        className="flex flex-col gap-y-4 lg:gap-y-8 max-w-lg mx-auto text-center items-center justify-center h-full"
      >
        <Image className="hidden lg:block" src="/finish.svg" width={100} height={100} alt="finish"/>
        <Image className="lg:hidden block" src="/finish.svg" width={50} height={50} alt="finish"/>
        <h1 className="text-xl lg:text-3xl font-bold text-neutral-700">
          Great job!<br/>You&apos;ve completed the lesson.
        </h1>
        <div className="flex items-center gap-x-4 w-full">
          <ResultCard variant="points" value={30}/>
          <ResultCard variant="hearts" value={5}/>
        </div>
      </div>
      <Footer
        status={status}
        onCheck={onContinue}
      />
    </>
  }

  return (
    <>
      <Header
        hearts={initialHearts}
        percentage={initialPercentage}
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