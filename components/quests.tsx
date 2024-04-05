import {Button} from "./ui/button"
import Image from "next/image";
import {Progress} from "@/components/ui/progress";
import {quests} from "@/lib/constants";

type Props = {
  points: number
}
export const Quests = ({points}: Props) => {
  return (
    <div className="border-2 rounded-lg p-4 space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="font-bold text-lg">Quests</h3>
        <Button variant="primaryOutline">view all</Button>
      </div>
      <div className="flex flex-col gap-y-8">
        {quests.map((quest, index) => {
          const progress = (points / quest.value) * 100;

          return (
            <div className="flex" key={index}>
              <Image src="/points.svg" width={40} height={40} alt="Points" className="mr-2"/>
              <div className="flex flex-col w-full gap-y-2">
                <p className="text-sm font-bold">
                  {quest.title}
                </p>
                <Progress value={progress} className="h-2"/>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}