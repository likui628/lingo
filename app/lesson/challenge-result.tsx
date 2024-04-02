import {ChallengeStatus} from "./typing";
import Image from "next/image";
import {ResultCard} from "./result-card";
import {Footer} from "./footer";
import {useAudio, useWindowSize} from "react-use";
import Confetti from "react-confetti";

type Props = {
  status: ChallengeStatus
  onContinue: () => void
}
export const ChallengeResult = (
  {
    status,
    onContinue
  }: Props) => {
  const [audio] = useAudio({src: "/finish.mp3", autoPlay: true})

  const {width, height} = useWindowSize()

  return <>
    <Confetti
      width={width}
      height={height}
      recycle={false}
      numberOfPieces={500}
      tweenDuration={10000}
    />
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
    <div>
      {audio}
    </div>
  </>
}