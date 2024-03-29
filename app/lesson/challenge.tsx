import {ChallengeOption, ChallengeType} from "@prisma/client";
import {Card} from "./card";
import {ChallengeStatus} from "./typing";
import {cn} from "@/lib/utils";

type Props = {
  selectedOption?: string
  options: ChallengeOption[]
  status: ChallengeStatus
  type: ChallengeType
  onSelect: (id: string) => void
}
export const Challenge = (
  {
    selectedOption,
    options,
    status,
    type,
    onSelect,
  }: Props) => {
  return (
    <div className={cn("px-5 lg:px-0 grid gap-2",
      type === "ASSIST" && "grid-cols-1",
      type === "SELECT" && "grid-cols-2 lg:grid-cols-[repeat(auto-fit,minmax(0,1fr))]")
    }>
      {
        options.map((option, index) => (
          <Card
            key={option.id}
            selected={selectedOption === option.id}
            status={status}
            imageSrc={option.imageSrc}
            text={option.text}
            shortcut={index + 1}
            type={type}
            onClick={() => onSelect(option.id)}
          />
        ))
      }
    </div>
  )
}