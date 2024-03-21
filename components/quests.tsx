import {Button} from "./ui/button"
import Image from "next/image";
import {Progress} from "@/components/ui/progress";

export const Quests = () => {
  return (
    <div className="border-2 rounded-lg p-4 space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="font-bold text-lg">Quests</h3>
        <Button variant="primaryOutline">view all</Button>
      </div>
      <div className="flex flex-col gap-y-8">
        <div className="flex ">
          <Image src="/points.svg" width={40} height={40} alt="Points" className="mr-2"/>
          <div className="flex flex-col w-full gap-y-2">
            <p className="text-sm font-bold">
              Earn 100 XP
            </p>
            <Progress value={100} className="h-2"/>
          </div>
        </div>
        <div className="flex ">
          <Image src="/points.svg" width={40} height={40} alt="Points" className="mr-2"/>
          <div className="flex flex-col w-full gap-y-2">
            <p className="text-sm font-bold">
              Earn 80 XP
            </p>
            <Progress value={80} className="h-2"/>
          </div>
        </div>
        <div className="flex ">
          <Image src="/points.svg" width={40} height={40} alt="Points" className="mr-2"/>
          <div className="flex flex-col w-full gap-y-2">
            <p className="text-sm font-bold">
              Earn 50 XP
            </p>
            <Progress value={50} className="h-2"/>
          </div>
        </div>
        <div className="flex ">
          <Image src="/points.svg" width={40} height={40} alt="Points" className="mr-2"/>
          <div className="flex flex-col w-full gap-y-2">
            <p className="text-sm font-bold">
              Earn 30 XP
            </p>
            <Progress value={30} className="h-2"/>
          </div>
        </div>

      </div>
    </div>
  )
}