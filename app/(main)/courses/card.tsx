import {Course} from "@prisma/client";
import {Check} from "lucide-react";
import Image from "next/image";

type Props = {
  course: Course
  active: boolean
  onClick: (id: string) => void
}
export const Card = ({course, active, onClick}: Props) => {
  return (
    <div
      className="h-full flex flex-col items-center justify-between p-3 pb-6 border-2 rounded-xl border-b-4 active:border-b-2 min-h-[200px] min-w-[216px] cursor-pointer hover:bg-neutral-100"
      key={course.id}
      onClick={() => onClick(course.id)}
    >
      <div className="min-h-[24px] w-full flex items-center justify-end">
        {active && (
          <div className="rounded bg-green-600 p-1.5">
            <Check className="h-4 w-4 stroke-[4] text-white"/>
          </div>
        )}
      </div>
      <Image
        src={course.imageSrc}
        alt={course.title}
        width={93.33}
        height={70}
        className="border rounded-lg drop-shadow-md object-cover"
      />
      <p>{course.title}</p>
    </div>
  )
}