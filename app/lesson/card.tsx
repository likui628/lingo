import Image from "next/image";
import {ChallengeStatus} from "./typing";
import {cn} from "@/lib/utils";
import {ChallengeType} from "@prisma/client";

type Props = {
  text: string
  imageSrc: string | null
  shortcut: number
  selected: boolean
  status: ChallengeStatus
  onClick: () => void
  type: ChallengeType
}
export const Card = (
  {
    text,
    imageSrc,
    shortcut,
    selected,
    status,
    onClick,
    type,
  }: Props) => {
  return (
    <div
      className={
        cn("h-full p-4 cursor-pointer rounded-xl border-2 border-b-4",
          selected && "border-sky-300 bg-sky-100 hover:bg-sky-100",
          selected && status === "correct" && "border-green-300 bg-green-100 hover:bg-green-100",
          selected && status === "wrong" && "border-rose-300 bg-rose-100 hover:bg-rose-100",
          type === "ASSIST" && "lg:p-3 w-full"
        )}
      onClick={onClick}
    >
      {
        imageSrc && (
          <div className="relative aspect-square mb-4 max-h-[80px] lg:max-h-[150px] w-full">
            <Image src={imageSrc} fill alt="hero"/>
          </div>
        )
      }
      <div className={cn("flex items-center justify-between text-neutral-600",
        type === "ASSIST" && "flex-row-reverse"
      )}>
        {type === "ASSIST" && <div/>}
        <p className={cn(
          "text-neutral-600 text-sm lg:text-base",
          selected && "text-sky-500",
          selected && status === "correct" && "text-green-500",
          selected && status === "wrong" && "text-rose-500",
        )}>
          {text}
        </p>
        <div
          className={cn("lg:w-[30px] lg:h-[30px] w-[20px] h-[20px] border-2 flex items-center justify-center rounded-lg text-neutral-400 lg:text-[15px] text-xs font-semibold",
            selected && "border-sky-300 text-sky-500",
            selected && status === "correct" && "border-green-500 text-green-500",
            selected && status === "wrong" && "border-rose-300 text-rose-500"
          )}>
          {shortcut}
        </div>
      </div>
    </div>
  )
}